import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, SelectField, Button, DeleteDialog } from '../_components';
import { Container, Wrapper, Form, Spinner } from '../_styled-components';

import {
    addBatch,
    deleteBatch,
    updateBatch
} from '../_actions/batchActions';

import { fetchRooms } from '../_actions/roomActions';

import GenericServices from '../_services/GenericServices';

const initialState = {
    name: "",
    labRoom: "",
    classRoom: "",
    showDeleteConfirmation: false,
};

class CourseForm extends Component {
    state = initialState;

    async componentDidMount() {
        this.props.fetchRooms();
        if (this.props.isEditing) {
            const batchId = this.props.match.params.batchId;
            let { data } = await GenericServices.get(`/department/batches/${batchId}`);

            if (data) {
                let defaultState = {};
                Object.keys(initialState).forEach(key => {
                    defaultState[key] = data[key] || this.state[key];
                });
                this.setState(defaultState);
            }
        }
    }

    getRoomsOptions = (rooms, isLab = false) => {
        const filterd = rooms.filter(r => r.isLab === isLab);
        const optioned = filterd.map(room => ({
            label: room.name,
            value: room._id
        }))
        return [{ label: "--- Select ---", value: "" }, ...optioned];
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { name, classRoom, labRoom } = this.state;
        if (this.props.isEditing) {
            this.props.updateBatch({ name, classRoom, labRoom, id: this.props.match.params.batchId })
        } else {
            this.props.addBatch({ name, classRoom, labRoom });
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
        this.props.deleteBatch(this.props.match.params.batchId)
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
                            value={this.state.classRoom}
                            options={this.getRoomsOptions(this.props.rooms, false)}
                            onChange={this.handleChange}
                            name={"classRoom"}
                        />
                        <SelectField
                            value={this.state.labRoom}
                            options={this.getRoomsOptions(this.props.rooms, true)}
                            onChange={this.handleChange}
                            name={"labRoom"} />

                        <Button
                            label={this.props.isEditing ? "Update" : "Save"}
                            type="submit" accent
                            disabled={!enabled} />

                        {!this.props.isEditing && <Button
                            label={"Save and Continue Adding"}
                            accent
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
    loading: state.batch.loading,
    rooms: state.room.rooms,
})

export default connect(mapStateToProps, {
    fetchRooms,
    addBatch,
    updateBatch,
    deleteBatch,
})(CourseForm);