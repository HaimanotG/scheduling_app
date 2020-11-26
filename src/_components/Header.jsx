import React from 'react';
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Container from "../_styled-components/Container";
import Breadcrumbs from "./BreadCrumbs";

const growIn = keyframes`
    0% {
        transform: scale(0.9);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
`
const StyledHeader = styled.header`
    height: 100px;
    padding: 10px;
    background: var(--colorPrimaryDark);
    box-shadow: 2px 4px 10px rgba(0,0,0,.2);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const HeaderBody = styled.div`
    display: flex;
    flex-direction: column;
`;

const Actions = styled.div`
    color: #fff;
    display: flex;
    align-items: center;
    margin-left: auto;
    @media (min-width: 40em) {
        align-self: flex-end;
    }
`;

const HeaderText = styled.h2`
    color: #fff;
    letter-spacing: 1.12px; 
    font-size: 1.5em; align-self: center;
    span {
        color: #eee;
    }
`;

const Action = styled(Link)`
    color: #fff;
    :hover {
        text-decoration: none;
    }
`;

const Top = styled.div`
    display: flex;
`;

const LetterAvatar = styled.button`
    border: none; font-weight: bold; color: #fff; cursor: pointer;
    height: 40px; width: 40px; margin: 5px;
    border-radius: 50%; background: var(--accent);

    display: flex;
    align-items: center;
    justify-content: center;
`;
const Profile = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    strong {
        text-align: right;

        @media(min-width: 40em) {
            text-align: center;
        }
    }
`;

const ProfileSubMenu = styled.div`
    position: absolute;
    width: 125px;
    top: 100%;
    right: 0%;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .3);
    border-radius: var(--default-radi);
    font-size: .9rem;
    margin-top: 6px; z-index: 100;
    animation-name: ${growIn};
    animation-duration: 200ms;
    animation-timing-function: transform ease-in, opacity ease-in;

    ::before {
        content: "";
        position: absolute;
        display: inline-block;
        border-bottom: 11px solid #fff;
        border-left: 11px solid transparent;
        border-right: 11px solid transparent;
        top: -11px; right: 11px;
        z-index: 100;
    }
`;

const SubMenuList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
`;

const SubMenuListItem = styled.li``;

const SubMenuLink = styled(Link)`
    display: block;
    padding: 8px 16px;
    color: #000;
    text-decoration: none;
    transition: all .25s ease-out;

    :not(:last-child) {
        border-bottom: 1.2px solid #ddd;
    }

    :hover {
        overflow: hidden;
        background: var(--accent);
        color: #fff;
        padding-left: 20px;
    }
`;

const Header = ({ isLoggedIn, onLogout, username = "", path, toggleTheme, theme }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleToggleTheme = e => {
        e.preventDefault();
        toggleMenu();
        toggleTheme()
    };

    const _buildProfileSubMenu = isMenuOpen => (
        isMenuOpen && <ProfileSubMenu>
            <SubMenuList>
                <SubMenuListItem>
                    <SubMenuLink to='' onClick={handleToggleTheme}>
                        {theme === "light" ? "Dark" : "Light"} Mode
                    </SubMenuLink>
                    <SubMenuLink to='' onClick={e => e.preventDefault()}>
                        Password</SubMenuLink>
                    <SubMenuLink to='/logout' onClick={e => {
                        e.preventDefault();
                        toggleMenu();
                        onLogout(e);
                    }}>
                        Log out</SubMenuLink>
                </SubMenuListItem>
            </SubMenuList>
        </ProfileSubMenu>
    )

    return (
        <StyledHeader>
            <Container>
                <HeaderBody>
                    <Top>
                        <HeaderText>Scheduling<span>App</span></HeaderText>
                        <Actions>
                            {isLoggedIn ?
                                <Profile>
                                    <strong>{username}</strong>
                                    <LetterAvatar onClick={toggleMenu}>
                                        {username.substr(0, 1)}
                                    </LetterAvatar>
                                    {_buildProfileSubMenu(isMenuOpen)}
                                </Profile> :
                                <Action to='/login'>Login</Action>}
                        </Actions>
                    </Top>
                    <Breadcrumbs path={path} />
                </HeaderBody>
            </Container>
        </StyledHeader>
    )
};
export default Header;