import React from "react";
import { connect } from 'react-redux';

import { TextField, Button } from '../_components';
import { Form, Container, Wrapper, Spinner } from '../_styled-components';
import { changeProfile } from '../_actions/authActions';

const initialState = {
    email: "",
    fullName: "",
};

class Profile extends React.Component {
    state = initialState;
    async componentDidMount() {
        if (this.props.user) {
            let defaultState = {};
            Object.keys(initialState).forEach(key => {
                defaultState[key] = this.props.user[key] || this.state[key];
            });
            this.setState(defaultState);
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { email, fullName } = this.state;
        this.props.changeProfile({ email, fullName, id: this.props.user && this.props.user._id })
    };

    isFormValid = state => {
        return (
            state.email.length > 6 &&
            state.fullName.length > 6
        );
    }

    render() {
        const enabled = this.isFormValid(this.state);
        if (this.props.loading) {
            return <Spinner />;
        }
        const { email, fullName } = this.state;
        return (
            <Container>
                <Wrapper>
                    <Form onSubmit={this.handleSubmit}>
                        <TextField
                            name={"email"}
                            value={email}
                            onChange={this.onChange}
                        />
                        <TextField
                            name={"fullName"}
                            value={fullName}
                            onChange={this.onChange}
                        />
                        <Button
                            label={"Save"}
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
    user: state.auth.user,
})

export default connect(mapStateToProps, { changeProfile })(Profile);