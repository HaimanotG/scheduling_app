import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import { FormGroup, Label } from '../_styled-components';

const Input = styled.input`
    padding: 1em;
    outline: none;
    margin: 8px 0;
    transition: border .24s;
    border: .8px solid #bbb;
    border-radius: var(--default-radi);
    color: var(--text-color);
    background: var(--component-background);
    
    :focus {
        border: .8px solid var(--accent);
    }

    :disabled {
        opacity: .5;
    }
`;

const TextField = ({ name, type = "text", onChange, required = true, value = "", label, disabled=false }) => {
    return (
        <FormGroup>
            <Input type={type} name={name} id={name} value={value}
                onChange={onChange} required={required} disabled={disabled}/>
            <Label htmlFor={name} data-label={label || name} />
        </FormGroup>
    )
};

TextField.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default TextField;