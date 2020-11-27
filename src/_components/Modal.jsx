import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components';
import Button from './Button.jsx';

const fadeEnter = keyframes`
    0% {
        top: 0;
        opacity: 0;
    }

    100% {
        top: 20px;
        opacity: 1;
    }
`;

const fadeExit = keyframes`
    0% {
        top: 20px;
        opacity: 1;
    }

    100% {
        top: 0;
        opacity: 0;
    }
`;

const fadeIn = keyframes`
    0% {
        opacity: 0; 
    }

    100% {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    0% {
        opacity: 1; 
    }

    100% {
        opacity: 0;
    }
`;

const Overlay = styled.div`
    position: fixed;
    left: 0; top: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, .3);
    z-index: 100;
    
    opacity: ${({ fadeType }) => fadeType === "IN" ? '1' : '0'};
    animation-name: ${({ fadeType }) => fadeType === "IN" ? fadeIn : fadeOut};
    animation-duration: 500ms;
    animation-timing-function: opacity ease;
`;

const ModalContent = styled.div`
    position: fixed; z-index: 102 !important;
    top: ${({ fadeType }) => fadeType === "IN" ? '20px' : '0'};
    left: 50%;
    transform: translateX(-50%);
    width: 80%; height: auto;

    @media (min-width: 40em) {
        width: auto;
    }

    box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, .1);
    border-radius: var(--default-radi);
    background: ${({ color }) => color ? color : 'var(--component-background)'};
    
    animation-name: ${({ fadeType }) => fadeType === "IN" ? fadeEnter : fadeExit};
    animation-duration: 500ms;
    animation-timing-function: top ease, opacity ease;
`;

const ModalHeader = styled.div`
    border-bottom: 1.2px solid #ccc;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const HeaderText = styled.h4`
    padding: .5rem 1rem;
`;

const ModalBody = styled.div`
    padding: .5rem 1rem;
`;
const ModalFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1.2px solid #ccc;
    padding: .5rem 1rem;
    button {
        flex: 1;
    }
`;

const CloseButton = styled.button`
    font-size: 1.2em;
    font-weight: bold;
    padding: .7rem;
    cursor: pointer;
    background: none;
    border: none;
    color: var(--text-color);

    :hover {
        opacity: 0.7;
    }
`;

const Invisible = styled.div`
    position: fixed;
    left: 0; top: 0;
    width: 100%; height: 100%;
    background: transparent;
    z-index: 101;
`;

class Modal extends Component {
    state = {
        fadeType: "IN"
    }

    onClose = e => {
        e && e.preventDefault();
        this.setState({ fadeType: "OUT" })
        setTimeout(() => {
            this.props.onClose && this.props.onClose();
        }, 470);
    }

    render() {
        const hideFooter = this.props.hideFooter ? true : false;
        const fadeType = this.state.fadeType;
        return (
            <Overlay fadeType={fadeType}>
                <ModalContent fadeType={fadeType}>
                    <ModalHeader>
                        <HeaderText>{this.props.headerText}</HeaderText>
                        <CloseButton onClick={this.onClose}>&times;</CloseButton>
                    </ModalHeader>
                    <ModalBody>
                        {this.props.children}
                    </ModalBody>
                    {!hideFooter &&
                        <ModalFooter>
                            <Button
                                label={"Cancel"} info
                                onClick={this.onClose} />
                        </ModalFooter>}
                </ModalContent>
                <Invisible onClick={this.onClose} />
            </Overlay>
        )
    }
}

export default Modal;