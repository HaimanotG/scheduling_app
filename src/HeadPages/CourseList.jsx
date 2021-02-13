import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { fetchCourses, fetchSemesters } from '../_actions/courseActions';
import { Button, DataTable, SelectField } from '../_components';
import { StyledLink, Container, Spinner } from '../_styled-components';
import { GenericServices } from '../_services';

const getCols = batchId => [
    {
        title: "Name",
        render: rowData => (
            <StyledLink to={`/head/batch/${batchId}/course/edit/${rowData._id}`}>
                {rowData.name}
            </StyledLink>
        )
    },
    {
        title: "Teacher",
        render: rowData => (rowData.teacher && rowData.teacher.name) || "UNASSIGNED"
    },
    {
        title: "Code",
        render: rowData => (rowData.code && rowData.code) || "UNKNOWN"
    },
    {
        title: "CreditHours",
        render: rowData => (rowData.totalCreditHours && rowData.totalCreditHours) || "UNASSIGNED"
    },
    {
        title: "LabCreditHours",
        render: rowData => (rowData.labCreditHours && rowData.labCreditHours) || "Null"
    },
]

class CourseList extends Component {
    state = {
        semester: "",
        semesters: [],
        courses: []
    }

    async componentDidMount() {
        this.setState({ loading: true })
        const batchId = this.props.match.params.batchId;
        this.props.fetchSemesters(batchId)
        const searchedSemester = this.props.location.search && this.props.location.search.split("=")[1]
        const semesters = await GenericServices.get(`/department/batches/${batchId}/semesters`);
        const courses = await GenericServices.get(`/department/semesters/${searchedSemester || semesters.data[0]._id}/courses`)
        this.setState({
            semesters: semesters.data,
            courses: courses.data,
            semester: searchedSemester || semesters.data[0]._id,
            loading: false
        })
    }

    handleAdd = e => {
        e.preventDefault();
        this.props.history.push(`/head/batch/${this.props.match.params.batchId}/course/add`);
    };

    getSemesterOptions = semesters => {
        return semesters.map(semester => ({
            label: semester.name,
            value: semester._id
        }))
    }

    handleSemesterChange = async e => {
        this.setState({ loading: true })
        const semester = e.target.value;
        const { data } = await GenericServices.get(`/department/semesters/${semester}/courses`)
        this.setState({ courses: data, semester, loading: false })
    }

    render() {
        if (this.state.loading) {
            return <Spinner />
        }
        
        return (
            <Container>
                
                <Button label={"Add Course +"} onClick={this.handleAdd} round />
                <SelectField
                    value={this.state.semester}
                    options={this.getSemesterOptions(this.state.semesters)}
                    onChange={this.handleSemesterChange}
                    name={"semester"}
                />
                {
                    this.state.courses.length === 0 ? (
                        <h3 style={{ color: 'red' }}>You Haven't Added Any Course Yet!</h3>
                    ) : <DataTable data={this.state.courses} cols={getCols(this.props.match.params.batchId)} />
                }
            </Container>
        );
    }
}

CourseList.propTypes = {
    courses: PropTypes.array,
    loading: PropTypes.bool,
}

const mapStateToProps = state => ({
    courses: state.course.courses,
    loading: state.course.loading,
})

export default connect(mapStateToProps, {
    fetchCourses,
    fetchSemesters
})(CourseList);