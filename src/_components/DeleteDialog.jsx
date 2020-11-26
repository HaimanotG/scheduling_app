import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from './Button.jsx';
import Modal from './Modal.jsx';

const DialogText = styled.p`
    text-align: center;
    font-size: 1rem;
    padding: .7rem;
    color: var(--text-color);
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: 50%;
    margin: 0 auto;
    button {
        flex: 1;
    }
`;

const DeleteDialog = ({ headerText, label, onClose, onYes }) => (
    <Modal onClose={onClose} headerText={headerText} hideFooter>
        <DialogText>
            {label}
        </DialogText>

        <ButtonWrapper>
            <Button
                label={"Yes"} warning
                onClick={onYes} />
        </ButtonWrapper>
    </Modal>
);

DeleteDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    onYes: PropTypes.func.isRequired,
    headerText: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}
export default DeleteDialog
