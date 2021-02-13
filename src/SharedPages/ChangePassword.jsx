import React from "react";
import { connect } from 'react-redux';

import { TextField, Button } from '../_components';
import { Form, Container, Wrapper, Spinner } from '../_styled-components';

import { changePassword } from '../_actions/authActions';

import { validate } from '../_helpers';
import { setMessage } from '../_actions/uiActions';

const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
};

class ChangePassword extends React.Component {
    state = initialState;

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmNewPassword } = this.state;
        const schema = {
            oldPassword: {
                string: true,
                required: true,
                min_length: 6,
                password: true
            },
            newPassword: {
                string: true,
                required: true,
                min_length: 6,
                password: true
            },
            confirmNewPassword: {
                string: true,
                required: true,
                min_length: 6,
                password: true,
                confirmPassword: true
            }
        }
        const errors = validate(schema, { oldPassword, newPassword, confirmNewPassword })
        if (confirmNewPassword !== newPassword) {
            errors.push('Two Passwords must match');
        }
        if (errors.length > 0) {
            return this.props.setMessage({ text: errors[0], type: "warning" });
        }
        this.props.changePassword({ oldPassword, newPassword })
    };

    isFormValid = state => {
        return (
            state.oldPassword.length > 6 &&
            state.newPassword.length > 6 &&
            state.confirmNewPassword.length > 6 &&
            state.newPassword === state.confirmNewPassword
        );
    }

    render() {
        // const enabled = this.isFormValid(this.state);
        const enabled = true;

        if (this.props.loading) {
            return <Spinner />;
        }
        const { oldPassword, newPassword, confirmNewPassword } = this.state;
        return (
            <Container>
                <Wrapper>
                    <Form onSubmit={this.handleSubmit}>
                        <TextField
                            name={"oldPassword"}
                            value={oldPassword}
                            type={"password"}
                            onChange={this.onChange}
                            label={"Old Password"}
                        />
                        <TextField
                            name={"newPassword"}
                            value={newPassword}
                            type={"password"}
                            onChange={this.onChange}
                            label={"New Password"}
                        />

                        <TextField
                            name={"confirmNewPassword"}
                            value={confirmNewPassword}
                            type={"password"}
                            onChange={this.onChange}
                            label={"Confirmnewpassword"}
                        />
                        <Button
                            label={"Change Password"}
                            disabled={!enabled} type="submit"
                        />
                    </Form>
                </Wrapper>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
})

export default connect(mapStateToProps, {
    changePassword,
    setMessage
})(ChangePassword);