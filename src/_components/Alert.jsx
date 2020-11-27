import React from 'react';
import styled from 'styled-components';
import { Container } from '../_styled-components';
import { connect } from 'react-redux';
import { closeAlert } from '../_actions/uiActions';
const StyledAlert = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    padding: .7em;
    border-radius: var(--default-radi);
    box-shadow: var(--componet-box-shadow);
    background: ${({ type }) => {
        switch (type) {
            case "success":
                return "var(--success)";
            case "warning":
                return "var(--warning)";
            case "info":
                return "var(--info)"
            default:
                return "var(--accent)";
        }}
    };
`;

const CloseButton = styled.button`
    font-size: 1.2em;
    font-weight: bold;
    cursor: pointer;
    background: none;
    border: none;
    color: #fff;

    :hover {
        opacity: 0.7;
    }
`;

const Alert = ({ alert: { message, type }, onClose }) => {
    return (
        <Container>
            <StyledAlert type={type}>
                <p>{message}</p>
                <CloseButton onClick={onClose}>&times;</CloseButton>
            </StyledAlert>
        </Container>
    )
}

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(closeAlert()),
});

export default connect(null, mapDispatchToProps)(Alert);