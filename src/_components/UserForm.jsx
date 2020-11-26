import React from "react";
import TextField from "./TextField";
import Button from "./Button";
import Toast from "./Toast";
import UserServices from "../_services/UserServices";

import { Form, Container, Wrapper, Spinner } from '../_styled-components';
import DeleteDialog from "./DeleteDialog";

const initialState = {
    username: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    showDeleteConfirmation: false,
    showErrorToast: false,
};

class UserForm extends React.Component {
    state = initialState;

    async componentDidMount() {
        if (this.props.isEditing) {
            const { success, data: { user }, error } = await UserServices.getUser(
                this.props.match.params.userId
            );
            if (success && user !== null) {
                let defaultState = {};
                Object.keys(initialState).forEach(key => {
                    defaultState[key] = user[key] || initialState[key];
                });
                this.setState(defaultState);
            } else {
                this.setState({ error, showErrorToast: true });
            }
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { username, email, password } = this.state;
        if (this.props.isEditing) {
            const { success, error } = await UserServices.updateUser(
                username,
                email,
                this.props.match.params.userId
            );
            if (success) {
                this.props.history.push("/admin/dean");
            } else {
                this.setState({ error, showErrorToast: true });
            }
        } else {
            const { success, error } = await UserServices.register(
                username,
                email,
                password
            );
            if (success) {
                this.props.history.push("/admin/dean");
            } else {
                this.setState({ error, showErrorToast: true });
            }
        }
    };

    isFormValid = state =>
        state.username.length > 3 &&
        state.email.length > 10 &&
        state.password.length > 6;

    handleDelete = async () => {
        const { success, error } = await UserServices.deleteUser(this.props.match.params.userId);
        if (success) {
            this.props.history.push("/admin/dean");
        } else {
            this.setState({ error, showErrorToast: true });
        }
    }

    closeToast = () => this.setState({ showErrorToast: false })
    closeDialog = () => this.setState({ showDeleteConfirmation: false });
    openDialog = () => this.setState({ showDeleteConfirmation: true });

    render() {
        const enabled = this.isFormValid(this.state);

        if (this.state.loading) {
            return <Spinner />;
        }

        const { username, email, password } = this.state;
        return (
            <Container>
                <Wrapper>
                    <Form onSubmit={this.handleSubmit}>
                        <TextField
                            name={"username"}
                            value={username}
                            onChange={this.onChange}
                        />
                        <TextField
                            name={"email"}
                            value={email}
                            onChange={this.onChange}
                        />

                        {!this.props.isEditing && (
                            <TextField
                                name={"password"}
                                value={password}
                                type={"password"}
                                onChange={this.onChange}
                            />
                        )}

                        <Button
                            label={this.props.isEditing ? "Update" : "Register"}
                            disabled={!enabled} type="submit"
                        />
                        {this.props.isEditing &&
                            <Button label={"Delete"} warning
                                onClick={this.openDialog} />}

                    </Form>
                </Wrapper>
                {this.state.showErrorToast &&
                    <Toast duration={3000} label={this.state.error} onClose={this.closeToast} />}

                {this.state.showDeleteConfirmation && (
                    <DeleteDialog
                        onYes={this.handleDelete}
                        onClose={this.closeDialog}
                        label="Are you sure you want to delete this user?"
                        headerText="Confirm Delete"
                    />
                )}
            </Container>
        );
    }
}

export default UserForm;