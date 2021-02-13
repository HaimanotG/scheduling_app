import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import { FormGroup, Label } from '../_styled-components';

const StyledToggleSwitch = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
      
    > input { 
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      >.slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
      }
      
      >.slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }
      
      input:checked + .slider {
        background-color: #2196F3;
      }
      
      input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
      }
      
      input:checked + .slider:before {
        transform: translateX(26px);
      }

      .slider.round {
        border-radius: 34px;
      }
      
      .slider.round:before {
        border-radius: 50%;
      }
`;

const ToggleSwitch = ({ onChange, value }) => (
    <StyledToggleSwitch>
        <input type="checkbox" onChange={onChange} checked={value === 'First'}/>
        <span className="slider round"/>
    </StyledToggleSwitch>
)

export default ToggleSwitch;