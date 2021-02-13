import React, { Component } from 'react';
import { connect } from 'react-redux';
import GenericServices from '../_services/GenericServices';
import { TextField, SelectField, Button } from '../_components';
import { Container, Wrapper, Form } from '../_styled-components';
import { validate } from '../_helpers';
import { setMessage } from '../_actions/uiActions';
const initialState = {
    course: '',
    code: '',
    teacher: ''
}

class EditSchedule extends Component {
    state = initialState

    async componentDidMount() {
        const scheduleId = this.props.match.params.scheduleId;
        const { data: { schedule } } = await GenericServices.get(`/generated/schedule/${scheduleId}`);

        if (schedule) {
            let defaultState = {};
            Object.keys(initialState).forEach(key => {
                defaultState[key] = schedule[key] || this.state[key];
            });
            this.setState(defaultState);
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { teacher } = this.state;
        const schema = {
            teacher: {
                string: true,
                required: true,
                min_length: 2
            }
        }
        const errors = validate(schema, { teacher })
        if (errors.length > 0) {
            return this.props.setMessage({ text: errors[0], type: "warning" });
        }

        try {
            const scheduleId = this.props.match.params.scheduleId;
            const { data } = await GenericServices.patch(`/generated/schedule/${scheduleId}`, { teacher })
            if (data && data.success) {
                this.props.history.push('/head/schedule');
                return this.props.setMessage({ text: "Updated Successfully", type: "success" });
            } else {
                return this.props.setMessage({ text: "Unable to update", type: 'warning' })
            }
        } catch (e) {
            return this.props.setMessage({ text: e.message, type: 'warning' })
        }
    };

    render() {
        return (
            <Container>
                <Wrapper>
                    <Form onSubmit={this.handleSubmit}>
                        <TextField
                            name={"course"}
                            value={this.state.course}
                            onChange={this.handleChange}
                            disabled={true}
                        />
                        <TextField
                            name={"code"}
                            value={this.state.code}
                            onChange={this.handleChange}
                            disabled={true}
                        />
                        <TextField
                            name={"teacher"}
                            value={this.state.teacher}
                            onChange={this.handleChange}
                        />
                        <Button
                            label={"Update"}
                            type="submit" accent
                            disabled={false} />
                    </Form>
                </Wrapper>
            </Container>
        )
    }

}

export default connect(null, { setMessage })(EditSchedule);