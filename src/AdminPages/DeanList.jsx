import React from "react";

import withDataFetching from "../withDataFetching";
import UserServices from "../_services/UserServices";
import UserRole from "../_helpers/UserRole";

import { Button, DataTable, ErrorBox } from '../_components';

import { StyledLink, Container, Spinner } from '../_styled-components';
const cols = [
    {
        title: "Username",
        render: rowData => (
            <StyledLink to={`/admin/dean/${rowData._id}/edit`}>
                {rowData.username}
            </StyledLink>
        )
    },
    {
        title: "Email",
        render: rowData => <>{rowData.email}</>
    }
];

const DeanList = ({ data: { users }, error, loading, ...props }) => {
    const handleAdd = e => {
        e.preventDefault();
        props.history.push("/admin/dean/add");
    };

    if (loading || users === undefined) {
        return <Spinner />;
    }

    if (error) {
        return <ErrorBox label={error} />;
    }

    return (
        <Container>
            <Button label={"Add Dean +"} onClick={handleAdd} round />
            <DataTable data={users} cols={cols} />
        </Container>
    );
};

export default withDataFetching(
    DeanList,
    UserServices.getUsers({ role: UserRole.DEAN })
);
