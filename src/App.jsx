import React, { Component } from "react";
import { connect } from 'react-redux';
import styled, { ThemeProvider } from "styled-components";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import { darkTheme, lightTheme } from "./themes";

import { Home, NotFound, Login } from "./PublicPages";
import { Header, Footer, Breadcrumbs, ToastPortal } from './_components';
import { Admin, HeadList, DepartmentForm, DepartmentList, HeadForm } from "./AdminPages";
import { Head, TeacherList, TeacherForm, RoomList, RoomForm, BatchList, BatchForm } from "./HeadPages";

import { UserRole } from './_helpers';
import { loadTheme, clearMessage } from './_actions/uiActions';
import { checkSession } from "./_actions/authActions";

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

    privateRoutes = [
        { path: "/admin", component: Admin, role: UserRole.ADMIN },
        { path: "/admin/head", component: HeadList, role: UserRole.ADMIN },
        { path: "/admin/head/add", component: HeadForm, role: UserRole.ADMIN },
        { path: "/admin/department", component: DepartmentList, role: UserRole.ADMIN },
        { path: "/admin/department/add", component: DepartmentForm, role: UserRole.ADMIN },
        { path: "/admin/head/:userId/edit", component: HeadForm, isEditing: true, role: UserRole.ADMIN },
        { path: "/admin/department/:departmentId/edit", component: DepartmentForm, isEditing: true, role: UserRole.ADMIN },
        { path: "/head", component: Head, role: UserRole.HEAD },
        { path: "/head/teacher", component: TeacherList, role: UserRole.HEAD },
        { path: "/head/teacher/add", component: TeacherForm, role: UserRole.HEAD },
        { path: "/head/teacher/:teacherId/edit", component: TeacherForm, isEditing: true, role: UserRole.HEAD },
        { path: "/head/room", component: RoomList, role: UserRole.HEAD },
        { path: "/head/room/add", component: RoomForm, role: UserRole.HEAD },
        { path: "/head/room/:roomId/edit", component: RoomForm, isEditing: true, role: UserRole.HEAD },
        { path: "/head/batch", component: BatchList, role: UserRole.HEAD },
        { path: "/head/batch/add", component: BatchForm, role: UserRole.HEAD },
        { path: "/head/batch/:batchId/edit", component: BatchForm, isEditing: true, role: UserRole.HEAD },
        
    ];

    render() {
        const themeMode = this.props.theme === "light" ? lightTheme : darkTheme;
        const isLoggedIn = this.props.user && !!this.props.user.sessionToken;
        const username = isLoggedIn ? this.props.user.username : "";
        const userRole = this.props.user && this.props.user.role;

        return (
            <ThemeProvider theme={themeMode}>
                <GlobalStyles />
                <Page>
                    <Header isLoggedIn={isLoggedIn} username={username} />
                    <MainContent>
                        <Breadcrumbs path={this.props.location.pathname} />
                        <Switch>
                            <Route exact path="/" component={() => <Home />} />
                            {this.privateRoutes.map(({ path, role, isEditing, component: Component }) => (
                                <Route
                                    key={path} exact
                                    path={path}
                                    component={props =>
                                        isLoggedIn && userRole === role ? (
                                            <Component {...props} isEditing={isEditing} />
                                        ) : <Redirect to="/login" />
                                    }
                                />
                            ))}
                            <Route
                                path="/login"
                                component={() =>
                                    isLoggedIn ? <Redirect to={`/${userRole}/batch/`} /> : <Login />
                                }
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
    isLoading: state.auth.isLoading
})

const mapDispatchToProps = dispatch => ({
    loadTheme: () => dispatch(loadTheme()),
    checkSession: () => dispatch(checkSession()),
    clearMessage: () => dispatch(clearMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(AppWithRouter);