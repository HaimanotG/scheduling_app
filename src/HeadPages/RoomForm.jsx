import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, DeleteDialog, CheckBox } from '../_components';
import { Container, Wrapper, Form, Spinner } from '../_styled-components';

import {
    addRoom,
    deleteRoom,
    updateRoom
} from '../_actions/roomActions';

import GenericServices from '../_services/GenericServices';

const initialState = {
    name: "",
    isLab: false,
    showDeleteConfirmation: false,
};

class RoomForm extends Component {
    state = initialState;

    async componentDidMount() {
        if (this.props.isEditing) {
            const roomId = this.props.match.params.roomId;
            let { data } = await GenericServices.get(`/department/rooms/${roomId}`);
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
        const { type, name, value, checked } = e.target;
        if (type === 'checkbox') {
            this.setState({ [name]: checked });
        } else {
            this.setState({ [name]: value });
        }
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { name, isLab } = this.state;
        if (this.props.isEditing) {
            this.props.updateRoom({ name, isLab, id: this.props.match.params.roomId })
        } else {
            this.props.addRoom({ name, isLab });
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
        this.props.deleteRoom(this.props.match.params.roomId)
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
                            onChange={this.handleChange} />

                        <CheckBox
                            name={"isLab"}
                            checked={this.state.isLab}
                            onChange={this.handleChange} />

                        <Button
                            label={this.props.isEditing ? "Update" : "Save"}
                            type="submit" accent
                            disabled={!enabled} />

                        {!this.props.isEditing && <Button
                            label={"Save and Continue Adding"}
                            accent
                            disabled={!enabled} />
                        }

                        {this.props.isEditing && (
                            <Button
                                label={"Delete"}
                                warning
                                onClick={this.toggleShowConfirmation} />)
                        }
                    </Form>
                </Wrapper>
                {this.state.showDeleteConfirmation && (
                    <DeleteDialog
                        onYes={this.handleDelete}
                        onClose={this.toggleShowConfirmation}
                        label={`Are you sure you want to delete 
                        ${this.state.name ? this.state.name : "this Room"} `}
                        headerText="Confirm Delete" />)
                }
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.teacher.loading,
})

export default connect(mapStateToProps, {
    addRoom,
    updateRoom,
    deleteRoom
})(RoomForm);