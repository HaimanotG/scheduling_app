import React from "react";
import { connect } from "react-redux";
import UserRole from "../_helpers/UserRole";

import { AdminServices, UserServices } from "../_services";
import { TextField, Button, SelectField, DeleteDialog, Toast } from '../_components'
import { Form, Container, Wrapper, Spinner } from "../_styled-components";
import { setAlert } from '../_actions/uiActions';

const initialState = {
    name: "",
    dean: "",
    deans: [],
    error: "",
    loading: false,
    showDeleteConfirmation: false,
    showErrorToast: false,
};

class CollegeCreationForm extends React.Component {
    state = initialState;

    async _populateDefault() {
        let { success, data: { users }, error } = await UserServices.getUsers({
            role: UserRole.DEAN
        })();
        if (success) {
            let options = users.map(user => ({
                label: user.username,
                value: user._id
            }));
            this.setState({
                deans: [{ label: "--- Select ---", value: "" }, ...options],
                loading: false
            });
        } else {
            this.setState({ loading: false, error, showErrorToast: true });
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        this.setState({ loading: true });
        await this._populateDefault();

        if (this.props.isEditing) {
            let {
                success,
                data: { college },
                error
            } = await AdminServices.getCollege(this.props.match.params.collegeId);

            if (success && college !== null) {
                let defaultState = {};
                Object.keys(initialState).forEach(key => {
                    defaultState[key] = college[key] || this.state[key];
                });
                this.setState(defaultState);
            } else {
                this.setState({ error, showErrorToast: true });
            }
        }
    }

    toggleShowConfirmation = e => {
        this.setState({
            showDeleteConfirmation: !this.state.showDeleteConfirmation
        });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { dean, name } = this.state;
        this.setState({
            error: "",
            showErrorToast: false,
        })

        if (this.props.isEditing) {
            const { success, error } = await AdminServices.updateCollege(
                name,
                dean,
                this.props.match.params.collegeId
            );
            if (success) {
                this.props.onSetAlert({ message: "1 college updated!", type: "info" });
                this.props.history.push("/admin/college");
            } else {
                this.setState({ error, showErrorToast: true });
            }
        } else {
            const { success, error } = await AdminServices.addCollege(name, dean);
            if (success) {
                this.props.onSetAlert({ message: "1 college added!", type: "success" });
                this.props.history.push("/admin/college");
            } else {
                this.setState({ error, showErrorToast: true });
            }
        }
    };

    handleDelete = async () => {
        const { success, error } = await AdminServices.deleteCollege(
            this.props.match.params.collegeId
        );
        if (success) {
            this.props.history.push("/admin/college");
            this.props.onSetAlert({ message: "1 college deleted!", type: "warning" });
        } else {
            this.setState({ error });
        }
    };

    isFormValid = state => state.dean !== "" && state.name.length >= 3;

    closeToast = () => this.setState({
        showErrorToast: false
    });

    render() {
        const enabled = this.isFormValid(this.state);
        if (this.state.loading) {
            return <Spinner />;
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
                            value={this.state.dean}
                            options={this.state.deans}
                            onChange={this.handleChange}
                            name={"dean"}
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

                {this.state.showErrorToast &&
                    <Toast duration={3000} label={this.state.error} onClose={this.closeToast} />}

                {this.state.showDeleteConfirmation && (
                    <DeleteDialog
                        onYes={this.handleDelete}
                        onClose={this.toggleShowConfirmation}
                        label="Are you sure you want to delete this college?"
                        headerText="Confirm Delete"
                    />
                )}
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onSetAlert: ({ message, type }) => dispatch(setAlert({ message, type }))
})
export default connect(null, mapDispatchToProps)(CollegeCreationForm);
