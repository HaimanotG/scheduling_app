import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

const Checkmark = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;

    ::after {
        content: "";
        position: absolute;
        display: none;
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
    }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`;

const ContainerLabel = styled.label`
    display: block;
    position: relative;
    padding-left: 25px;
    margin-bottom: 12px;
    margin-left: 3px;
    cursor: pointer;
    font-size: 1em;
    user-select: none;
    vertical-align: middle;
    text-transform: capitalize;

    :hover ${HiddenCheckbox} ~ ${Checkmark} {
        background-color: #ccc;
    }

    ${HiddenCheckbox}:checked ~ ${Checkmark} {
        background-color: var(--accent);
    }

    ${HiddenCheckbox}:checked ~ ${Checkmark}::after {
        display: block;
    }
`;


const CheckBox = ({ name, onChange, checked }) => {
    return (
        <ContainerLabel>
            {name}
            <HiddenCheckbox type="checkbox"
                name={name}
                id={name}
                onChange={onChange}
                checked={checked} />
            <Checkmark />
        </ContainerLabel>
    )
};

CheckBox.propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

export default CheckBox;