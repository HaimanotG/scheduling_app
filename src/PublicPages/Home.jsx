import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../_styled-components";
import styled from 'styled-components';
const LandingPageContainer = styled.div`
    height: 80vh;
    background: var(--colorPrimary);
    margin-top: -20px;
    clip-path: polygon(0 0, 100% 0, 100% 44%, 0 60%);
`;
const LandingPageHeader = styled.h1`
    color: #FAFAFA;
    text-align: center;
`;
const ButtonLink = styled(Link)`
    display: inline-block;
    padding: 12px 36px;
    border: none;
    outline: none;
    margin: 5px;
    text-decoration: none;
    transition: opacity 0.2s ease, background 0.2s ease;

    cursor: pointer;

    border-radius: var(--default-radi);
    color: #fff;
    background: rgb(24,188,156);

    :hover {
        opacity: 0.7;
    }

    :disabled {
        cursor: not-allowed;
        opacity: 0.3;
    }
`;

const Center = styled.div`
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
`;

const Home = () => {
    return (
        <LandingPageContainer>
            <Center>
                <LandingPageHeader>Welcome To Scheduling System</LandingPageHeader>
                <div>
                    <ButtonLink to="/schedule">View Schedule</ButtonLink>
                    <ButtonLink to="/schedule/teacher">Are you a teacher?</ButtonLink>
                </div>
            </Center>
        </LandingPageContainer>
    );
};

export default Home;
