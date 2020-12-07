import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { fetchBatches } from '../_actions/batchActions';
import { Button, DataTable } from '../_components';
import { StyledLink, Container, Spinner } from '../_styled-components'

const cols = [
    {
        title: "Name",
        render: rowData => (
            <StyledLink to={`/head/batch/${rowData._id}/edit`}>
                {rowData.name}
            </StyledLink>
        )
    },
    {
        title: "Class Room",
        render: rowData => (rowData.classRoom && rowData.classRoom.name) || "UNASSIGNED"
    },
    {
        title: "Lab Room",
        render: rowData => (rowData.labRoom && rowData.labRoom.name) || "UNASSIGNED"
    },
];

class BatchList extends Component {

    componentDidMount() {
        this.props.loadBatches();
    }

    handleAdd = e => {
        e.preventDefault();
        this.props.history.push("/head/batch/add");
    };

    render() {
        if (this.props.loading) {
            return <Spinner />
        }

        return (
            <Container>
                <Button label={"Add Batch +"} onClick={this.handleAdd} round />
                <DataTable data={this.props.batches} cols={cols} />
            </Container>
        );
    }
}

BatchList.propTypes = {
    batches: PropTypes.array,
    loading: PropTypes.bool,
}

const mapStateToProps = state => ({
    batches: state.batch.batches,
    loading: state.batch.loading,
})

const mapDispatchToProps = dispatch => ({
    loadBatches: () => dispatch(fetchBatches()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BatchList);
