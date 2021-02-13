import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, SelectField, Button, DeleteDialog } from '../_components';
import { Container, Wrapper, Form, Spinner } from '../_styled-components';

import {
    addCourse,
    deleteCourse,
    updateCourse,
    fetchSemesters
} from '../_actions/courseActions';
import { setMessage } from '../_actions/uiActions';

import { fetchTeachers } from '../_actions/teacherActions';

import GenericServices from '../_services/GenericServices';
import { validate } from '../_helpers';

const initialState = {
    name: "",
    code: "",
    semester: "",
    teacher: "",
    totalCreditHours: 1,
    labCreditHours: 0,
    showDeleteConfirmation: false,
    semesters: []
};

class CourseForm extends Component {
    state = initialState;

    async componentDidMount() {
        const batchId = this.props.match.params.batchId;
        this.props.fetchTeachers();
        this.props.fetchSemesters(batchId);
        if (this.props.isEditing) {
            let semesters = await GenericServices.get(`/department/batches/${batchId}/semesters`);
            let { data } = await GenericServices.get(`/department/courses/${this.props.match.params.courseId}`);
            if (data) {
                let defaultState = {};
                Object.keys(initialState).forEach(key => {
                    defaultState[key] = data[key] || this.state[key];
                });
                this.setState({ ...defaultState, semesters: semesters.data });
            }
        }
    }

    getOptions = rowData => {
        const optioned = rowData.map(_ => ({
            label: _.name,
            value: _._id
        }))
        return [{ label: "--- Select ---", value: "" }, ...optioned];
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { name, code, semester, teacher, labCreditHours, totalCreditHours } = this.state;
        const { courseId, batchId } = this.props.match.params;
        const schema = {
            name: {
                string: true,
                required: true,
                min_length: 3
            },
            code: {
                string: true,
                required: true,
                min_length: 3
            },
            semester: {
                string: true,
                required: true,
                min_length: 3
            },
            teacher: {
                string: true,
                required: true,
                min_length: 3
            },
            labCreditHours: {
                required: true,
            },
            totalCreditHours: {
                required: true,
            }
        }
        const errors = validate(schema, { name , code, semester, teacher, labCreditHours, totalCreditHours})
        console.log(errors);
        if (errors.length > 0) {
            return this.props.setMessage({ text: errors[0], type: "warning" });
        }
        if (this.props.isEditing) {
            this.props.updateCourse({
                name, code, semester, teacher,
                labCreditHours, totalCreditHours, id: courseId
            }, batchId)
        } else {
            this.props.addCourse({ name, code, semester, teacher, labCreditHours, totalCreditHours }, batchId);
        }
    };

    handleSubmitAndContinue = async e => {
        e.preventDefault();
        const { name, code, semester, teacher, totalCreditHours, labCreditHours } = this.state;
        const { batchId } = this.props.match.params;
        const more = true;
        const schema = {
            name: {
                string: true,
                required: true,
                min_length: 3
            },
            code: {
                string: true,
                required: true,
                min_length: 3
            },
            semester: {
                string: true,
                required: true,
                min_length: 3
            },
            teacher: {
                string: true,
                required: true,
                min_length: 3
            },
            labCreditHours: {
                required: true,
            },
            totalCreditHours: {
                required: true,
            }
        }
        const errors = validate(schema, { name, code, semester, teacher, totalCreditHours, labCreditHours })
        if (errors.length > 0) {
            return this.props.setMessage({ text: errors[0], type: "warning" });
        }
        this.props.addCourse({ name, code, semester, teacher, totalCreditHours, labCreditHours  },
            batchId, more);
    }

    toggleShowConfirmation = e => {
        this.setState({
            showDeleteConfirmation: !this.state.showDeleteConfirmation
        });
    };

    handleDelete = e => {
        e.preventDefault();
        this.toggleShowConfirmation();
        const { courseId, batchId } = this.props.match.params;
        this.props.deleteCourse(courseId, batchId, this.state.semester)
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
                        <TextField
                            name={"code"}
                            value={this.state.code}
                            onChange={this.handleChange}
                        />
                        <SelectField
                            value={this.state.semester}
                            options={this.getOptions(this.props.semesters)}
                            onChange={this.handleChange}
                            name={"semester"}
                        />
                        <SelectField
                            value={this.state.teacher}
                            options={this.getOptions(this.props.teachers)}
                            onChange={this.handleChange}
                            name={"teacher"}
                        />
                        <TextField
                            name={"totalCreditHours"}
                            type={"number"}
                            value={this.state.totalCreditHours}
                            onChange={this.handleChange}
                        />
                        <TextField
                            name={"labCreditHours"}
                            type={"number"}
                            value={this.state.labCreditHours}
                            onChange={this.handleChange}
                        />
                        <Button
                            label={this.props.isEditing ? "Update" : "Save"}
                            type="submit" accent
                            disabled={!enabled} />

                        {!this.props.isEditing && <Button
                            label={"Save and Continue Adding"}
                            accent onClick={this.handleSubmitAndContinue}
                            disabled={!enabled} />
                        }

                        {this.props.isEditing &&
                            <Button
                                label={"Delete"}
                                warning
                                onClick={this.toggleShowConfirmation}
                            />
                        }
                    </Form>
                </Wrapper>
                {this.state.showDeleteConfirmation && (
                    <DeleteDialog
                        onYes={this.handleDelete}
                        onClose={this.toggleShowConfirmation}
                        label={`Are you sure you want to delete 
                        ${this.state.name ? this.state.name : "this Batch"} `}
                        headerText="Confirm Delete"
                    />
                )}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.course.loading,
    semesters: state.course.semesters,
    teachers: state.teacher.teachers,
})

export default connect(mapStateToProps, {
    addCourse,
    updateCourse,
    fetchSemesters,
    deleteCourse,
    fetchTeachers,
    setMessage
})(CourseForm);