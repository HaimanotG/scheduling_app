import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDepartments } from '../_actions/adminActions';
import { Button, DataTable } from "../_components"
import { Container, Spinner, StyledLink } from "../_styled-components";

const colList = [
    {
        title: "Name",
        render: item => (
            <StyledLink to={`/admin/department/${item._id}/edit`}>
                {item.name}
            </StyledLink>
        )
    },
    {
        title: "Head",
        render: item => <>{item.head}</>
    }
];
const makeDepartments = departments =>
    departments.map(department => ({
        _id: department._id,
        name: department.name,
        head: department.head ? department.head.username : "UNASSIGNED",
    }));

class DepartmentList extends Component {
    componentDidMount() {
        this.props.fetchDepartments();
    }
    render() {
        if (this.props.loading) {
            return <Spinner />
        }
        return (
            <Container>
                <Button label={"Add Department +"} onClick={e => {
                    e.preventDefault();
                    this.props.history.push('/admin/department/add');
                }} round />
                <DataTable
                    data={makeDepartments(this.props.departments)}
                    cols={colList} />
            </Container>
        )
    }
}
const mapStateToProps = state => ({
    departments: state.admin.departments,
    loading: state.admin.loading,
})

export default connect(mapStateToProps, {
    fetchDepartments,
})(DepartmentList);