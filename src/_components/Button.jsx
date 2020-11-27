import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const BaseButton = styled.button`
  display: ${props => (props.block ? "block" : "inline-block")};
  padding: ${props => (props.sm ? "8px" : "12px 36px")};
  border: none;
  outline: none;
  margin: 3px;
  text-transform: uppercase;

  transition: opacity 0.2s ease, background 0.2s ease;

  cursor: pointer;

  border-radius: ${({ round }) => (round ? "4rem" : "var(--default-radi)")};
  color: ${({ subtle, color }) => (subtle ? color : "#fff")};
  background: ${({ accent, warning, info, subtle }) => {
        if (subtle) {
            return "transparent";
        } else if (accent) {
            return "var(--accent)";
        } else if (warning) {
            return "var(--warning)";
        } else if (info) {
            return "var(--info)";
        } else {
            return "var(--accent)";
        }
    }
    };

  :hover {
    opacity: 0.7;
    background: ${({ subtle }) => (subtle ? "#ccc" : null)};
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;
/**
 *
 * @returns {?Function}
 * @constructor
 * @param props
 */

const Button = props => (
    <BaseButton {...props}>
        {props.children ? props.children : props.label}
    </BaseButton>
);

Button.defaultProps = {
    type: "button"
};

Button.propTypes = {
    props: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            disabled: PropTypes.bool,
            info: PropTypes.bool,
            warning: PropTypes.bool,
            primary: PropTypes.bool,
            accent: PropTypes.bool,
            sm: PropTypes.bool,
            subtle: PropTypes.bool,
            color: PropTypes.string,
            round: PropTypes.bool,
            block: PropTypes.bool
        })
    )
};

export default Button;
