import React from "react";
import { connect } from 'react-redux';
import { UserServices } from "../_services";

import { TextField, Button, DeleteDialog } from '../_components';
import { Form, Container, Wrapper, Spinner } from '../_styled-components';

import { registerHead, updateHead, deleteHead } from '../_actions/adminActions';

const initialState = {
    username: "",
    password: "",
    confirmPassword: "",
    showDeleteConfirmation: false,
    showErrorToast: false,
};

class HeadForm extends React.Component {
    state = initialState;

    async componentDidMount() {
        if (this.props.isEditing) {
            let {
                success,
                data
            } = await UserServices.getUser(this.props.match.params.userId);
            if (success && data !== null) {
                let defaultState = {};
                Object.keys(initialState).forEach(key => {
                    defaultState[key] = data[key] || this.state[key];
                });
                this.setState(defaultState);
            }
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { username, password } = this.state;
        if (this.props.isEditing) {
            this.props.updateHead({ username, id: this.props.match.params.userId })
        } else {
            this.props.registerHead({ username, password })
        }
    };

    handleDelete = e => {
        e.preventDefault();
        this.toggleShowConfirmation();
        this.props.deleteHead(this.props.match.params.userId)
    }

    toggleShowConfirmation = e => {
        this.setState({
            showDeleteConfirmation: !this.state.showDeleteConfirmation
        });
    };

    isFormValid = state => {
        if (this.props.isEditing) {
            return state.username.length > 3;
        } else {
            return (
                state.username.length > 3 &&
                state.password.length > 6 &&
                state.confirmPassword.length > 6 &&
                state.password === state.confirmPassword
            );
        }
    }
    handleDelete = async () => {
        this.toggleShowConfirmation();
        this.props.deleteHead(this.props.match.params.userId);
    }

    render() {
        const enabled = this.isFormValid(this.state);
        if (this.props.loading) {
            return <Spinner />;
        }
        const { username, confirmPassword, password } = this.state;
        return (
            <Container>
                <Wrapper>
                    <Form onSubmit={this.handleSubmit}>
                        <TextField
                            name={"username"}
                            value={username}
                            onChange={this.onChange}
                        />

                        {!this.props.isEditing && (
                            <>
                                <TextField
                                    name={"password"}
                                    value={password}
                                    type={"password"}
                                    onChange={this.onChange}
                                />
                                <TextField
                                    name={"confirmPassword"}
                                    value={confirmPassword}
                                    type={"password"}
                                    onChange={this.onChange}
                                />
                            </>
                        )}

                        <Button
                            label={this.props.isEditing ? "Update" : "Register"}
                            disabled={!enabled} type="submit"
                        />
                        {this.props.isEditing &&
                            <Button
                                label={"Delete"} warning
                                onClick={this.toggleShowConfirmation} />}
                    </Form>
                </Wrapper>

                {this.state.showDeleteConfirmation && (
                    <DeleteDialog
                        onYes={this.handleDelete}
                        onClose={this.toggleShowConfirmation}
                        headerText="Confirm Delete"
                        label={`Are you sure you want to delete 
                            ${this.state.username ? this.state.username : "this user"}?`}
                    />
                )}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.admin.loading,
})

export default connect(mapStateToProps, {
    registerHead,
    updateHead,
    deleteHead
})(HeadForm);