import React from 'react';
import styled, { keyframes } from "styled-components";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { changeTheme } from '../_actions/uiActions';
import { logout } from '../_actions/authActions';
import Container from "../_styled-components/Container";

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
    height: 80px;
    padding: 10px;
    background: var(--colorPrimaryDark);
    box-shadow: 2px 4px 10px rgba(0,0,0,.2);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const HeaderBody = styled.div`
    display: flex;
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

const HeaderText = styled.h3`
    text-decoration: none;
    color: #fff;
    letter-spacing: 1.12px; 
    font-size: 1.7em;
    font-weight: bold;
    align-self: center;

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

const LetterAvatar = styled.button`
    border: none; font-weight: bold; color: #fff; cursor: pointer;
    height: 40px; width: 40px; margin: 5px 0 5px 5px;
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
    width: 175px;
    top: 100%;
    right: 0%;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .3);
    border-radius: var(--default-radi);
    font-size: .9rem;
    margin-top: 6px; z-index: 100;
    animation-name: ${growIn};
    animation-duration: .25s;
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

const SubMenuListItem = styled.li`
    :not(:last-child) {
        border-bottom: 1.2px solid #eee;
    }
`;

const SubMenuLink = styled(Link)`
    display: block;
    padding: 8px 16px;
    color: #000;
    text-decoration: none;
    transition: all .25s ease-out;

    :hover {
        overflow: hidden;
        background: var(--accent);
        color: #fff;
        padding-left: 20px;
    }
`;

const Header = ({ isLoggedIn, logout, username = "", changeTheme, theme, user }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const _buildProfileSubMenu = isMenuOpen => (
        isMenuOpen && <ProfileSubMenu>
            <SubMenuList onClick={toggleMenu}>
                <SubMenuListItem>
                    <SubMenuLink onClick={changeTheme}>
                        {theme === "light" ? "Dark Mode" : "Light Mode"}
                    </SubMenuLink>
                </SubMenuListItem>
                <SubMenuListItem>
                    <SubMenuLink to='/change-password'>Change Password</SubMenuLink>
                </SubMenuListItem>
                <SubMenuListItem>
                    <SubMenuLink to='/change-profile'>Profile</SubMenuLink>
                </SubMenuListItem>
                <SubMenuListItem>
                    <SubMenuLink to="/login" onClick={logout}>Log out</SubMenuLink>
                </SubMenuListItem>
            </SubMenuList>
        </ProfileSubMenu >
    )

    const displayName = user.fullName || username;

    return (
        <StyledHeader>
            <Container>
                <HeaderBody>
                    <HeaderText>Scheduling<span>App</span></HeaderText>
                    <Actions>
                        {isLoggedIn ?
                            <Profile>
                                <strong>{displayName}</strong>
                                <LetterAvatar onClick={toggleMenu}>
                                    {displayName.substr(0, 1)}
                                </LetterAvatar>
                                {_buildProfileSubMenu(isMenuOpen)}
                            </Profile> :
                            <Action to='/login'>Login</Action>}
                    </Actions>
                </HeaderBody>
            </Container>
        </StyledHeader>
    )
};

const mapStateToProps = state => ({
    theme: state.ui.theme,
    user: state.auth.user,
})

export default connect(mapStateToProps, { changeTheme, logout })(Header);