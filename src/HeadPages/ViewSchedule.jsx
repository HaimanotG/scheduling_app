import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Spinner, StyledLink } from '../_styled-components';
import { DataTable, SelectField } from '../_components';
import GenericServices from '../_services/GenericServices';
const getScheduleCols = isHead => [
    {
        title: "Course",
        render: rowData => isHead ? (
            <StyledLink to={`/head/editSchedule/${rowData._id}`}>
                {rowData.course}
            </StyledLink>
        ) : rowData.course
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
    },
    {
        title: "Teacher",
        render: rowData => rowData.teacher
    }
]

class ViewSchedule extends Component {
    state = {
        departments: [],
        department: "",
        batch: "",
        schedule: [],
        head: false,
        loading: false
    }

    async componentDidMount() {
        this.setState({ loading: true });
        console.log("View Schedule Loaded")
        const { data: { departments } } = await GenericServices.get("/generated/schedule/departments");
        let d;
        if (this.props.user && this.props.user._id) {
            const { data } = await GenericServices.get(`/generated/schedule/departmentfromhead/${this.props.user._id}`);
            d = data.department;
        }
        this.setState({
            departments,
            department: (d && d._id) || this.props.match.params.department || departments[0]._id,
            batch: this.props.match.params.batch || departments[0].batches[0]._id,
            head: !!d
        })

        const { department, batch } = this.state;
        try {
            const url = `/generated/schedule/${department || departments[0]._id}/${batch || departments[0].batches[0]._id}`;
            const { data } = await GenericServices.get(url);
            if (data.schedule) {
                this.setState({ schedule: data.schedule })
            }
        } catch (e) {
            this.setState({ error: e.message })
        }

        this.setState({ loading: false })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        const department = e.target.name === 'department' ? e.target.value : this.state.department;
        const batch = e.target.name === 'batch' ? e.target.value : this.state.batch;
        let url = `/schedule/${department}/${batch}`
        if (this.props.user && this.props.user._id) {
            url = `/head/schedule/${department}/${batch}`
        }
        this.props.history.push(url)
    };

    getDeaprtmentOptions = state =>
        state.map(({ name, _id }) => ({ label: name, value: _id }))

    getBatchOptions = state => {
        const selectedDepartment = state.find(_ => _._id === this.state.department);
        if (!selectedDepartment) return [];
        const batchesOfSelectedDepartment = selectedDepartment.batches;
        return batchesOfSelectedDepartment.map(({ name, _id }) => ({ label: name, value: _id }))
    }

    render() {
        if (this.state.loading) {
            return <Spinner />
        }
        const isHead = !!this.props.user._id;
        return (
            <Container>
                {!this.state.head && <SelectField
                    name="department"
                    value={this.state.department}
                    options={this.getDeaprtmentOptions(this.state.departments)}
                    onChange={this.handleChange} />}
                <SelectField
                    name="batch"
                    value={this.state.batch}
                    onChange={this.handleChange}
                    options={this.getBatchOptions(this.state.departments)} />
                {
                    this.state.schedule.length === 0 ? (
                        <h3 style={{ color: 'red' }}>Schedule is not generated for this setting yet!</h3>
                    ) : <DataTable cols={getScheduleCols(isHead)} data={this.state.schedule} />
                }
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
})

export default connect(mapStateToProps)(ViewSchedule);