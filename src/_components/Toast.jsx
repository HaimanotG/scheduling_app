import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearMessage } from '../_actions/uiActions';

const fadeEnter = keyframes`
    0% {
        bottom: -10%;
        opacity: 0;
    }

    100% {
        bottom: 10%;
        opacity: 1;
    }
`;

const fadeExit = keyframes`
    0% {
        bottom: 10%;
        opacity: 1;
    }

    100% {
        bottom: -10%;
        opacity: 0;
    }
`;

const ToastWrapper = styled.div`
    display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
    align-items: center;
    position: fixed;

    bottom: ${({ fadeType }) => fadeType === "IN" ? '10%' : '-10%'};
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 50px;
    box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, .1);

    padding: 1em;
    border-radius: var(--default-radi);
    background: ${({ state }) => {
        switch (state) {
            case "success":
                return "var(--success)";
            case "warning":
                return "var(--warning)";
            case "info":
                return "var(--info)"
            default:
                return "var(--accent)";
        }
    }
    };
    
    animation-name: ${({ fadeType }) => fadeType === "IN" ? fadeEnter : fadeExit};
    animation-duration: 500ms;
    animation-timing-function: right ease, opacity ease;
`;

const ToastText = styled.p`
    color: #fff;
    align-text: center;
`;

const CloseButton = styled.span`
    font-size: 1.2em;
    font-weight: bold;
    color: #fff;
    margin-left: auto;
    cursor: pointer;

    :hover {
        opacity: 0.7;
    }
`;

class Toast extends Component {
    state = {
        isOpen: false,
        fadeType: "IN"
    }

    onClose = e => {
        e && e.preventDefault();
        this.setState({ fadeType: "OUT" })
        setTimeout(() => {
            this.setState({ isOpen: false });
            this.props.close && this.props.close();
        }, 490);
    }

    componentDidMount() {
        this.setState({ isOpen: true });
        this.interval = setTimeout(() => {
            this.onClose();
        }, this.props.duration - 500);
    }

    componetWillUnMount() {
        clearInterval(this.interval)
    }

    render() {
        const { message: { text, type } } = this.props;
        return (
            <ToastWrapper fadeType={this.state.fadeType} isOpen={this.state.isOpen} state={type}>
                <ToastText>{text}</ToastText>
                <CloseButton onClick={this.onClose}>&times;</CloseButton>
            </ToastWrapper>
        );
    }
}

Toast.propTypes = {
    message: PropTypes.object.isRequired,
    duration: PropTypes.number,
    close: PropTypes.func.isRequired
}

Toast.defaultProps = {
    duration: 5000,
}

const mapStateToProps = state => ({
    message: state.ui.message,
})

const mapDispatchToProps = dispatch => ({
    close: () => dispatch(clearMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);