import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { fetchTeachers } from '../_actions/teacherActions';
import { Button, DataTable } from '../_components';
import { StyledLink, Container, Spinner } from '../_styled-components'

const cols = [
    {
        title: "Name",
        render: rowData => (
            <StyledLink to={`/head/teacher/${rowData._id}/edit`}>
                {rowData.name}
            </StyledLink>
        )
    }
];

class TeacherList extends Component {

    componentDidMount() {
        this.props.fetchTeachers();
    }

    handleAdd = e => {
        e.preventDefault();
        this.props.history.push("/head/teacher/add");
    };

    render() {
        if (this.props.loading) {
            return <Spinner />
        }

        return (
            <Container>
                <Button label={"Add Teacher +"} onClick={this.handleAdd} round />
                {
                    this.props.teachers.length === 0 ? (
                        <h3 style={{ color: 'red' }}>You Haven't Added Any Teacher Yet!</h3>
                    ) : <DataTable data={this.props.teachers} cols={cols} />
                }
            </Container>
        );
    }
}

TeacherList.propTypes = {
    teachers: PropTypes.array,
    loading: PropTypes.bool,
}

const mapStateToProps = state => ({
    teachers: state.teacher.teachers,
    loading: state.teacher.loading,
})

export default connect(mapStateToProps, {
    fetchTeachers,
})(TeacherList);
