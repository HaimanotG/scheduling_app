import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { fetchCourses } from '../_actions/courseActions';
import { Button, DataTable } from '../_components';
import { StyledLink, Container, Spinner } from '../_styled-components'

const cols = [
    {
        title: "Name",
        render: rowData => (
            <StyledLink to={`/head/course/${rowData._id}/edit`}>
                {rowData.name}
            </StyledLink>
        )
    },
    {
        title: "Semester",
        render: rowData => (rowData.semester && rowData.semester.name) || "UNASSIGNED"
    },
    {
        title: "CreditHours",
        render: rowData => (rowData.totalCreditHours && rowData.totalCreditHours) || "UNASSIGNED"
    },
    {
        title: "LabCreditHours",
        render: rowData => (rowData.labCreditHours && rowData.labCreditHours) || "Null"
    },
];

class CourseList extends Component {

    componentDidMount() {
        this.props.fetchCourses();
    }

    handleAdd = e => {
        e.preventDefault();
        this.props.history.push("/head/batch/course");
    };

    render() {
        if (this.props.loading) {
            return <Spinner />
        }

        return (
            <Container>
                <Button label={"Add Course +"} onClick={this.handleAdd} round />
                <DataTable data={this.props.courses} cols={cols} />
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
    fetchCourses
})(CourseList);
