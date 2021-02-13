import React from "react";
import { connect } from 'react-redux';
import { UserServices } from "../_services";

import { TextField, Button, DeleteDialog } from '../_components';
import { Form, Container, Wrapper, Spinner } from '../_styled-components';

import { registerHead, updateHead, deleteHead } from '../_actions/adminActions';

import { validate } from '../_helpers';
import { setMessage } from '../_actions/uiActions';

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
        
        if (this.props.isEditing) {
            const { username} = this.state;
                const schema = {
                    username: {
                        string: true,
                        required: true,
                        min_length: 2
                    }
                }
            const errors = validate(schema, { username })
            if (errors.length > 0) {
                return this.props.setMessage({ text: errors[0], type: "warning" });
            }
            this.props.updateHead({ username, id: this.props.match.params.userId })
        } else {
            const { username, password, confirmPassword} = this.state;
                const schema = {
                    username: {
                        string: true,
                        required: true,
                        min_length: 2
                    },
                    password: {
                        string: true,
                        required: true,
                        min_length: 6,
                        password: true
                    },
                    confirmPassword: {
                        string: true,
                        required: true,
                        min_length: 6,
                        password: true
                    }
                }
            const errors = validate(schema, { username, password, confirmPassword })
            if (password !== confirmPassword) {
                errors.push('Two Passwords must match');
            }
            if (errors.length > 0) {
                return this.props.setMessage({ text: errors[0], type: "warning" });
            }
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
        // const enabled = this.isFormValid(this.state);
        const enabled = true;
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
    deleteHead,
    setMessage
})(HeadForm);