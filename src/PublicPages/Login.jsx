import React, { useState } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';

import { Spinner, Form, Container, Wrapper } from "../_styled-components";
import { Button, TextField, Toast } from '../_components';
import { auth } from '../_actions/authActions';

const LoginFormWrapper = styled(Wrapper)`
    margin: 10px auto;
    border-left: 6px solid var(--colorPrimary);

    @media (min-width: 60em) {
        width: 40%;
        transform: translateY(30%);
    }
`;

const Login = ({ login, isLoading }) => {
    const initialState = {
        username: "",
        password: ""
    };

    const [state, setState] = useState(initialState);

    const onChange = e => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const isFormValid = state =>
        state.username.length >= 4 && state.password.length > 6;

    const handleSubmit = async e => {
        e.preventDefault();
        const { username, password } = state;
        login({ username, password });
    };

    const enabled = isFormValid(state);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Container>
            <LoginFormWrapper>
                <Form onSubmit={handleSubmit}>
                    <TextField
                        name={"username"}
                        value={state.username}
                        onChange={onChange}
                        required={true}
                    />
                    <TextField
                        name={"password"}
                        value={state.password}
                        onChange={onChange}
                        type={"password"}
                        required={true}
                    />
                    <Button label={"Login"} type="submit" disabled={!enabled} />
                </Form>

                {state.error && <Toast duration={3000} label={state.error} />}
            </LoginFormWrapper>
        </Container>
    );
};
const mapStateToProps = state => ({
    isLoading: state.auth.isLoading,
})
const mapDispatchToProps = dispatch => ({
    login: ({ username, password }) => dispatch(auth({ username, password })),
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
