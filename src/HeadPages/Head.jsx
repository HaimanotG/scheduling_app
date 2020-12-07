import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Wrapper, Container } from "../_styled-components";

const AdminHeader = styled.h4`
    background: var(--colorPrimary);
    padding: 10px;
    border-radius: var(--default-radi) var(--default-radi) 0 0;
    
    > a {
        :link,
        :visited,
        :hover,
        :active{
            color: #fff;
        }
        border: none;
    }
`;

const Anchor = styled(Link)`
    text-decoration: none;
    transition: text-decoration .2s;
    
    :link,
    :visited,
    :hover,
    :active {
        color: var(--text-color);
    }
    
    :hover {
        color: var(--colorPrimary);
    }
`;

const ActionBar = styled.div`
    display: flex;
    flex-direction: column;
    
    > a {
        font-size: .95em;
        padding: 8px 10px;
    }
`;

const ActionGroup = styled.div`
    padding: 10px;
    display: flex;
    
    :not(:last-child) {
        border-bottom: 1px solid #ddd;
    }
`;

const Actions = styled.div`
    margin-left: auto;
    display: flex;
    color: var(--text-color);
    > a {
        :not(:last-child) {
            margin-right: 10px;
        }
    }
`;

const Head = () => {
    return (
        <Container>
            <Wrapper>
                <AdminHeader>
                    <Anchor to={'/head'}>Head</Anchor>
                </AdminHeader>
                <ActionBar>
                    <ActionGroup>
                        <Anchor to={'/head/teacher'}>Teacher</Anchor>
                        <Actions>
                            <Anchor to={'/head/teacher/add'}>Add</Anchor>
                        </Actions>
                    </ActionGroup>
                    <ActionGroup>
                        <Anchor to={'/head/room'}>Room</Anchor>
                        <Actions>
                            <Anchor to={'/head/room/add'}>Add</Anchor>
                        </Actions>
                    </ActionGroup>
                    <ActionGroup>
                        <Anchor to={'/head/batch'}>Batch</Anchor>
                        <Actions>
                            <Anchor to={'/head/batch/add'}>Add</Anchor>
                        </Actions>
                    </ActionGroup>
                </ActionBar>
            </Wrapper>
        </Container>
    )
};

export default Head
