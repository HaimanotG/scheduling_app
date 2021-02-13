import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Spinner } from '../_styled-components';
import { DataTable, SelectField } from '../_components';
import GenericServices from '../_services/GenericServices';

const cols = [
    {
        title: "Batch",
        render: rowData => rowData.batch && rowData.batch.name
    },
    {
        title: "Course",
        render: rowData => rowData.course
    },
    {
        title: "Code",
        render: rowData => rowData.code
    },
    {
        title: "Hours",
        render: rowData => rowData.creditHours
    },
    {
        title: "Time",
        render: rowData => rowData.time
    },
    {
        title: "Room",
        render: rowData => rowData.room
    }
];

class ViewScheduleForTeachers extends Component {
    state = {
        departments: [],
        department: "",
        teacher: "",
        schedule: [],
        loading: false
    }

    async componentDidMount() {
        this.setState({ loading: true });

        const { data: { departments } } = await GenericServices.get("/generated/schedule/teachers");

        this.setState({
            departments,
            department: this.props.match.params.department || departments[0]._id,
            teacher: this.props.match.params.teacher || departments[0].teachers[0]._id
        })

        const { department, teacher } = this.state;
        const url = `/generated/schedule/teacher/${department || departments[0]._id}/${teacher || departments[0].teachers[0]._id}`;

        const { data: { schedule } } = await GenericServices.get(url);
        if (schedule) {
            this.setState({ schedule })
        }

        this.setState({ loading: false })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        const department = e.target.name === 'department' ? e.target.value : this.state.department;
        const teacher = e.target.name === 'teacher' ? e.target.value : this.state.teacher;
        this.props.history.push(`/schedule/teacher/${department}/${teacher}`)
    };

    getDeaprtmentOptions = state =>
        state.map(({ name, _id }) => ({ label: name, value: _id }))

    getTeachersOptions = state => {
        const selectedDepartment = state.find(_ => _._id === this.state.department);
        if (!selectedDepartment) return [];
        const teacheresOfSelectedDepartment = selectedDepartment.teachers;
        return teacheresOfSelectedDepartment.map(({ name, _id }) => ({ label: name, value: _id }))
    }

    render() {
        if (this.state.loading) {
            return <Spinner />
        }
        return (
            <Container>
                <SelectField
                    name="department"
                    value={this.state.department}
                    options={this.getDeaprtmentOptions(this.state.departments)}
                    onChange={this.handleChange} />
                <SelectField
                    name="teacher"
                    value={this.state.teacher}
                    onChange={this.handleChange}
                    options={this.getTeachersOptions(this.state.departments)} />
                {
                    this.state.schedule.length === 0 ? (
                        <h3 style={{ color: 'red' }}>Schedule is not generated for you yet!</h3>
                    ) : <DataTable cols={cols} data={this.state.schedule} />
                }
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
})

export default connect(mapStateToProps)(ViewScheduleForTeachers);