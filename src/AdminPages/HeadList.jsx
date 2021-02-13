import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, DataTable } from '../_components';
import { StyledLink, Container, Spinner } from '../_styled-components';

import {
    fetchHeads,
} from '../_actions/adminActions';

const cols = [
    {
        title: "Username",
        render: rowData => (
            <StyledLink to={`/admin/head/${rowData._id}/edit`}>
                {rowData.username}
            </StyledLink>
        )
    },
    {
        title: "Email",
        render: rowData => <>{rowData.email ? rowData.email : "UNASSIGNED"}</>
    }
];

class HeadList extends Component {
    
    componentDidMount() {
        this.props.fetchHeads();
    }

    handleAdd = e => {
        e.preventDefault();
        this.props.history.push("/admin/head/add");
    };

    render() {
        if (this.props.loading) {
            return <Spinner />
        }
        return (
            <Container>
                <Button label={"Add Head +"} onClick={this.handleAdd} round />
                {
                    this.props.heads.length === 0 ? (
                        <h3 style={{ color: 'red' }}>You Haven't Added Any Head Yet!</h3>
                    ) : <DataTable data={this.props.heads} cols={cols} />
                }
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    heads: state.admin.heads,
    loading: state.admin.loading,
})

export default connect(mapStateToProps, {
    fetchHeads
})(HeadList);