import React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const StyledBreadCrumb = styled.div`
    margin-top: 12px;
    span {
        padding: 5px;
        color: #bbb;
    }
`;

const StyledCrumb = styled(Link)`
    padding: 5px;
    position: relative;
    text-decoration: none;

    :link,
    :visited,
    :active {
        color: #fff;
    }
    
    :hover {
        text-decoration: underline;
    }
    
    :first-child {
        padding-left: 0;
    }
`;

const RightChevron = styled.svg`
    width: 10px;
    height: 10px;
    fill: #aaa;
`;

const Breadcrumbs = ({ path }) => {
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const clean = str => {
        let clean = str;
        if (clean.charAt(0) === '/') {
            clean = clean.slice(1);
        }
        if (clean.charAt(clean.length - 1) === '/') {
            clean = clean.substr(0, clean.length - 1);
        }
        return clean;
    };

    const cleanPath = clean(path);
    let crumbs = cleanPath.split('/').filter(p => p.charAt(0) !== '5').map(p =>
        ({ name: capitalize(p), path: path.substr(0, path.indexOf(p) + p.length) }));

    for (let i = 0; i < crumbs.length; i++) {
        if (crumbs[i].name === 'Edit' || crumbs[i].name === 'Add') {
            crumbs[i].name = crumbs[i].name + " " + crumbs[i - 1].name;
        }
    }

    if (crumbs.length <= 1) {
        return null;
    }
    return (
        <StyledBreadCrumb>
            {crumbs.map(({ name, path }, key) =>
                key + 1 === crumbs.length ? (
                    <span key={key}>{name}</span>
                ) : (
                        <React.Fragment key={key}>
                            <StyledCrumb key={key} to={path}>
                                {name}
                            </StyledCrumb>
                            <RightChevron xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512">
                                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                            </RightChevron>
                        </React.Fragment>
                    )
            )}
        </StyledBreadCrumb>
    );
};
export default Breadcrumbs;
