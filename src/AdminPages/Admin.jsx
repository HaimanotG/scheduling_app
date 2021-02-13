import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GenericServices } from '../_services';

import { Wrapper, Container } from "../_styled-components";
import { ToggleSwitch } from "../_components";

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

    > p {
        vertical-align: middle;
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

class Admin extends React.Component {
    state = {
        semester: ''
    }

    async componentDidMount() {
        let { data } = await GenericServices.get('/admin/currentSemester');
        if (data) {
            this.setState({
                semester: data.currentSemester
            })
        }
    }

    handleChange = async e => {
        const currentSemester = this.state.semester === 'First' ? 'Second' : 'First';
        let { data } = await GenericServices.post('/admin/currentSemester', { currentSemester });
        if (data) {
            this.setState({
                semester: currentSemester
            })
        }
    }

    render() {
        return (
            <Container>
                <Wrapper>
                    <AdminHeader>
                        <Anchor to={'/admin'}>Admin</Anchor>
                    </AdminHeader>
                    <ActionBar>
                        <ActionGroup>
                            <Anchor to={'/admin/head'}>Head</Anchor>
                            <Actions>
                                <Anchor to={'/admin/head/add'}>Add</Anchor>
                            </Actions>
                        </ActionGroup>
                        <ActionGroup>
                            <Anchor to={'/admin/department'}>Department</Anchor>
                            <Actions>
                                <Anchor to={'/admin/department/add'}>Add</Anchor>
                            </Actions>
                        </ActionGroup>
                        <ActionGroup>
                            <ToggleSwitch onChange={this.handleChange} value={this.state.semester} />
                            <p>{this.state.semester} semester</p>
                        </ActionGroup>
                    </ActionBar>
                </Wrapper>
            </Container>
        )
    }
}
export default Admin;