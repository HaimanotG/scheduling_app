import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, DeleteDialog } from '../_components';
import { Container, Wrapper, Form, Spinner } from '../_styled-components';

import {
    addTeacher,
    deleteTeacher,
    updateTeacher
} from '../_actions/teacherActions';

import GenericServices from '../_services/GenericServices';

const initialState = {
    name: "",
    showDeleteConfirmation: false,
};

class TeacherForm extends Component {
    state = initialState;

    async componentDidMount() {
        if (this.props.isEditing) {
            const teacherId = this.props.match.params.teacherId;
            let { data } = await GenericServices.get(`/department/teachers/${teacherId}`);
            if (data) {
                let defaultState = {};
                Object.keys(initialState).forEach(key => {
                    defaultState[key] = data[key] || this.state[key];
                });
                this.setState(defaultState);
            }
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { name } = this.state;
        if (this.props.isEditing) {
            this.props.updateTeacher({ name, id: this.props.match.params.teacherId })
        } else {
            this.props.addTeacher({ name });
        }
    };

    toggleShowConfirmation = e => {
        this.setState({
            showDeleteConfirmation: !this.state.showDeleteConfirmation
        });
    };

    handleDelete = e => {
        e.preventDefault();
        this.toggleShowConfirmation();
        this.props.deleteTeacher(this.props.match.params.teacherId)
    }

    render() {
        const enabled = true;
        if (this.props.loading) {
            return <Spinner />
        }
        return (
            <Container>
                <Wrapper>
                    <Form onSubmit={this.handleSubmit}>
                        <TextField
                            name={"name"}
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <Button
                            label={this.props.isEditing ? "Update" : "Save"}
                            type="submit" accent
                            disabled={!enabled}
                        />
                        {
                            !this.props.isEditing && <Button
                                label={"Save and Continue Adding"}
                                accent
                                disabled={!enabled}
                            />
                        }

                        {this.props.isEditing && (
                            <Button
                                label={"Delete"}
                                warning
                                onClick={this.toggleShowConfirmation}
                            />
                        )}
                    </Form>
                </Wrapper>
                {this.state.showDeleteConfirmation && (
                    <DeleteDialog
                        onYes={this.handleDelete}
                        onClose={this.toggleShowConfirmation}
                        label={`Are you sure you want to delete 
                        ${this.state.name ? this.state.name : "this Teacher"} `}
                        headerText="Confirm Delete"
                    />
                )}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.teacher.loading,
})

const mapDispatchToProps = dispatch => ({
    addTeacher: ({ name }) => dispatch(addTeacher({ name })),
    updateTeacher: ({ name, id }) => dispatch(updateTeacher({ name, id })),
    deleteTeacher: id => dispatch(deleteTeacher(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherForm);