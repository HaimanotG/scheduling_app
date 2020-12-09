import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { fetchRooms } from '../_actions/roomActions';
import { Button, DataTable } from '../_components';
import { StyledLink, Container, Spinner } from '../_styled-components'

const cols = [
    {
        title: "Name",
        render: rowData => (
            <StyledLink to={`/head/room/${rowData._id}/edit`}>
                {rowData.name}
            </StyledLink>
        )
    },
    {
        title: "Is It Lab?",
        render: rowData => rowData.isLab ? "Yes" : "No"
    },
];

class RoomList extends Component {

    componentDidMount() {
        this.props.fetchRooms();
    }

    handleAdd = e => {
        e.preventDefault();
        this.props.history.push("/head/room/add");
    };

    render() {
        if (this.props.loading) {
            return <Spinner />
        }

        return (
            <Container>
                <Button label={"Add Room +"} onClick={this.handleAdd} round />
                <DataTable data={this.props.rooms} cols={cols} />
            </Container>
        );
    }
}

RoomList.propTypes = {
    rooms: PropTypes.array,
    loading: PropTypes.bool,
}

const mapStateToProps = state => ({
    rooms: state.room.rooms,
    loading: state.room.loading,
})

export default connect(mapStateToProps, {
    fetchRooms,
})(RoomList);
