import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import { darkTheme, lightTheme } from "./themes";

import localStore from "./_helpers/localStore";
import UserRole from "./_helpers/UserRole";
import AuthServices from "./_services/AuthServices";

import { Header, Footer, UserForm } from './_components';
import {
    Admin, DeanList, CollegeCreationForm, CollegeList
} from "./AdminPages";

import { Home, NotFound, Login } from "./PublicPages";

const Page = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  gap: 1em;
`;

const MainContent = styled.main`
  height: auto;
`;

class App extends Component {
    state = {
        user: undefined,
        theme: "light"
    };

    redirectTo = userRole => {
        if (userRole === UserRole.ADMIN) {
            return "/admin/college";
        } else if (userRole === UserRole.DEAN) {
            return "/college";
        } else {
            return "/department";
        }
    };

    async componentDidMount() {
        const user = await localStore.get("user");
        if (user && user.sessionToken) {
            const { success } = await AuthServices.checkSessionTokenMocked();
            if (success) {
                this.setState({ user });
                this.props.history.push(this.redirectTo(user.role));
            } else {
                await localStore.remove("user");
            }
        }
        const localMode = window.localStorage.getItem("theme");
        localMode ? this.setTheme(localMode) : this.setTheme("light");
    }

    setTheme = theme => {
        window.localStorage.setItem("theme", theme);
        this.setState({ theme });
    };

    toggleTheme = () =>
        this.state.theme === "light"
            ? this.setTheme("dark")
            : this.setTheme("light");

    handleLogin = user => {
        localStore.set("user", user);
        this.setState({ user });
        this.props.history.push(this.redirectTo(user.role));
    };

    handleLogout = e => {
        e.preventDefault();
        localStore.remove("user");
        this.setState({ user: undefined });
        this.props.history.push("/");
    };

    privateRoutes = [
        { path: "/admin", component: Admin, role: UserRole.ADMIN },
        { path: "/admin/dean", component: DeanList, role: UserRole.ADMIN },
        { path: "/admin/dean/add", component: UserForm, role: UserRole.ADMIN },
        {
            path: "/admin/dean/:userId/edit",
            component: UserForm,
            isEditing: true,
            role: UserRole.ADMIN
        },
        { path: "/admin/college", component: CollegeList, role: UserRole.ADMIN },
        {
            path: "/admin/college/add",
            component: CollegeCreationForm,
            role: UserRole.ADMIN
        },
        {
            path: "/admin/college/:collegeId/edit",
            component: CollegeCreationForm,
            isEditing: true,
            role: UserRole.ADMIN
        }
    ];

    render() {
        const themeMode = this.state.theme === "light" ? lightTheme : darkTheme;
        const isLoggedIn = this.state.user && this.state.user.sessionToken;
        const username = isLoggedIn ? this.state.user.username : "";
        const userRole = this.state.user && this.state.user.role;

        return (
            <ThemeProvider theme={themeMode}>
                <GlobalStyles />
                <Page>
                    <Header
                        isLoggedIn={isLoggedIn}
                        username={username}
                        onLogout={this.handleLogout}
                        toggleTheme={this.toggleTheme}
                        theme={this.state.theme}
                        path={this.props.location.pathname}
                    />
                    <MainContent>
                        <Switch>
                            <Route exact path="/" component={() => <Home />} />
                            {this.privateRoutes.map(({ path, role, isEditing, component: Component }) => (
                                <Route
                                    key={path} exact
                                    path={path}
                                    component={props =>
                                        isLoggedIn && userRole === role ? (
                                            <Component {...props} isEditing={isEditing} />
                                        ) : <Redirect to="/" />
                                    }
                                />
                            ))}
                            <Route
                                path="/login"
                                component={() =>
                                    isLoggedIn ? <Redirect to="/" />
                                        : <Login onLogin={this.handleLogin} />
                                }
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </MainContent>
                    <Footer />
                </Page>
            </ThemeProvider>
        );
    }
}

export default withRouter(App);
