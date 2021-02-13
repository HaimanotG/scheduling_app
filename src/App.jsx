import React, { Component } from "react";
import { connect } from 'react-redux';
import styled, { ThemeProvider } from "styled-components";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import { darkTheme, lightTheme } from "./themes";

import { Home, NotFound, Login } from "./PublicPages";
import { Header, Footer, Breadcrumbs, ToastPortal } from './_components';

import { loadTheme, clearMessage, clearRedirect } from './_actions/uiActions';
import { checkSession } from "./_actions/authActions";
import privateRoutes from './privateRoutes';
import ViewSchedule from "./HeadPages/ViewSchedule";
import ViewScheduleForTeachers from "./PublicPages/ViewScheduleForTeachers";

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

    componentDidMount() {
        this.props.loadTheme();
        this.props.checkSession();
        // this.props.history.listen((location)=>{
        //     this.props.clearMessage();
        // })
    }

    render() {
        const themeMode = this.props.theme === "light" ? lightTheme : darkTheme;
        const isLoggedIn = this.props.user && !!this.props.user.sessionToken;
        const username = isLoggedIn ? this.props.user.username : "";
        const userRole = this.props.user && this.props.user.role;

        if (this.props.redirectTo) {
            this.props.clearRedirect();
            if (this.props.redirectTo === "$toRole") {
                return <Redirect to={userRole} />
            }
            return <Redirect to={this.props.redirectTo} />
        }

        return (
            <ThemeProvider theme={themeMode}>
                <GlobalStyles />
                <Page>
                    <Header isLoggedIn={isLoggedIn} username={username} />
                    <MainContent>
                        <Breadcrumbs path={this.props.location.pathname} />
                        <Switch>
                            <Route exact path="/" component={() => <Home />} />
                            <Route exact path="/schedule/:department/:batch"
                                component={props => <ViewSchedule {...props} />} />
                            <Route exact path="/schedule"
                                component={props => <ViewSchedule {...props} />} />
                            <Route exact
                                path="/schedule/teacher/:department/:teacher"
                                component={props => <ViewScheduleForTeachers {...props} />} />
                            <Route exact path="/schedule/teacher"
                                component={() => <ViewScheduleForTeachers {...this.props} />} />
                            {privateRoutes.map(({ path, role, isEditing, component: Component }) => (
                                <Route
                                    key={path} exact
                                    path={path}
                                    component={props =>
                                        isLoggedIn && (role === 'ALL' || role === userRole) ? (
                                            <Component {...props} isEditing={isEditing} />
                                        ) : <Redirect to="/" />
                                    }
                                />
                            ))}
                            <Route
                                path="/login"
                                component={() => !isLoggedIn && <Login />}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </MainContent>
                    <Footer />
                </Page>
                <ToastPortal />
            </ThemeProvider>
        );
    }
}
const AppWithRouter = withRouter(App);

const mapStateToProps = state => ({
    theme: state.ui.theme,
    user: state.auth.user,
    redirectTo: state.ui.redirectTo,
    loading: state.auth.loading
})

export default connect(mapStateToProps, {
    loadTheme,
    checkSession,
    clearMessage,
    clearRedirect
})(AppWithRouter);