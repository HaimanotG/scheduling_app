import React from "react";

import AdminServices from "../_services/AdminServices";
import withDataFetching from "../withDataFetching";
import { Button, DataTable, ErrorBox } from '../_components';
import { Container, Spinner, StyledLink } from '../_styled-components';

const colList = [
    {
        title: "Name",
        render: item => (
            <StyledLink to={`/admin/college/${item._id}/edit`}>
                {item.name}
            </StyledLink>
        )
    },
    {
        title: "Dean",
        render: item => <>{item.dean}</>
    },
    {
        title: "Departments",
        render: item => <>{item.departments}</>
    }
];

const makeColleges = colleges =>
    colleges.map(college => ({
        _id: college._id,
        name: college.name,
        dean: college.dean ? college.dean.username : "UNASSIGNED",
        departments: college.departments.length
    }));

const CollegeList = ({ data: { colleges }, error, loading, ...props }) => {
    const handleAdd = e => {
        e.preventDefault();
        props.history.push("/admin/college/add");
    };

    if (loading || colleges === undefined) {
        return <Spinner />;
    }

    if (error) {
        return <ErrorBox label={error} />;
    }

    return (
        <Container>
            <Button label={"Add College +"} onClick={handleAdd} round />
            <DataTable data={makeColleges(colleges)} cols={colList} />
        </Container>
    );
};

export default withDataFetching(CollegeList, AdminServices.getColleges);
