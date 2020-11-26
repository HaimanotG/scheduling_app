import React, { useState } from "react";
import styled from "styled-components";
import AuthServices from "../_services/AuthServices";

import { Spinner, Form, Container, Wrapper } from "../_styled-components";

import { Button, TextField, Toast } from '../_components';

const LoginFormWrapper = styled(Wrapper)`
  margin: 10px auto;
  border-left: 6px solid var(--colorPrimary);

  @media (min-width: 60em) {
    width: 40%;
    transform: translateY(30%);
  }
`;

const Login = ({ onLogin }) => {
    const initialState = {
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        loading: false,
        error: ""
    };

    const [state, setState] = useState(initialState);

    const onChange = e => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const isFormValid = state =>
        state.email.length > 10 && state.password.length > 6;

    const handleSubmit = async e => {
        e.preventDefault();
        setState({ ...state, error: "", loading: true });
        const { email, password } = state;
        const { success, data, error } = await AuthServices.login(email, password);

        if (success) {
            setState({ ...state, loading: false });
            onLogin(data);
        } else {
            setState({ ...state, loading: false, error });
        }
    };

    const enabled = isFormValid(state);

    if (state.loading) {
        return <Spinner />;
    }

    return (
        <Container>
            <LoginFormWrapper>
                <Form onSubmit={handleSubmit}>
                    <TextField
                        name={"email"}
                        value={state.email}
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

export default Login;
