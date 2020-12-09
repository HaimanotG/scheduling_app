import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SelectField, TextField, Button, DeleteDialog } from '../_components';
import { Container, Wrapper, Form, Spinner } from '../_styled-components';
import { AdminServices } from "../_services";

import {
    fetchHeads,
    addDepartment,
    deleteDepartment,
    updateDepartment
} from '../_actions/adminActions';

const initialState = {
    name: "",
    head: "",
    showDeleteConfirmation: false,
};

class DepartmentForm extends Component {
    state = initialState;

    async componentDidMount() {
        this.props.fetchHeads();
        if (this.props.isEditing) {
            let {
                success,
                data
            } = await AdminServices.getDepartment(this.props.match.params.departmentId);
            if (success && data !== null) {
                let defaultState = {};
                Object.keys(initialState).forEach(key => {
                    defaultState[key] = data[key] || this.state[key];
                });
                this.setState(defaultState);
            }
        }
    }

    getHeadsOptions = heads => [{ label: "--- Select ---", value: "" },
    ...heads.map(head => ({
        label: head.username,
        value: head._id
    }))]

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { head, name } = this.state;
        if (this.props.isEditing) {
            this.props.updateDepartment({ name, head, id: this.props.match.params.departmentId })
        } else {
            this.props.addDepartment({ name, head });
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
        this.props.deleteDepartment(this.props.match.params.departmentId)
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
                        <SelectField
                            value={this.state.head}
                            options={this.getHeadsOptions(this.props.heads)}
                            onChange={this.handleChange}
                            name={"head"}
                        />
                        <Button
                            label={this.props.isEditing ? "Update" : "Save"}
                            type="submit" accent
                            disabled={!enabled}
                        />
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
                        ${this.state.name ? this.state.name : "this"} department?`}
                        headerText="Confirm Delete"
                    />
                )}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    heads: state.admin.heads,
    loading: state.admin.loading,
})

export default connect(mapStateToProps, {
    fetchHeads,
    addDepartment,
    updateDepartment,
    deleteDepartment,
})(DepartmentForm);