import React from "react";
import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import * as Colors from "../../../styles/Colors";

export interface DropdownProps {
  state: "default" | "active" | "inactive" | string;
  leftText: string;
  leftIcon?: string;
  rightText?: string;
  rightIcon?: string;
  options?: string[];
  onClick?: () => void;
}

export const Dropdown = (props: DropdownProps) => {
  return (
    <StyledList
      state={props.state}
      onClick={props.onClick}
      className={`
        dropdown-list--${props.state}
        ${
          props.options && props.options.indexOf("showBorder") !== -1
            ? "dropdown-list--border"
            : ""
        }
    `}
    >
      <div className="left">
        {props.leftIcon && (
          <span
            className={`
              left__icon
              material-icon
          `}
          >
            {props.leftIcon}
          </span>
        )}
        {props.leftText && (
          <span className={`left__text`}>{props.leftText}</span>
        )}
      </div>
      <div className="right">
        {props.rightText && (
          <span
            className={`
            right__text
            fs-s
          `}
          >
            {props.rightText}
          </span>
        )}
        {props.rightIcon && (
          <span
            className={`
              right__icon
              material-icon
              fs-s
          `}
          >
            {props.rightIcon}
          </span>
        )}
      </div>
    </StyledList>
  );
};

export default Dropdown;

const StyledList = styled.li<{state:DropdownProps["state"] }>`
  ${Layout.alignElements("inline-flex", "space-between", "center")};
  ${Layout.spacingBetweenElements("horizontal", 0.5)};
  padding: ${Layout.spacingVH(0.5, 1)};
  ${props => props.state === "active"
  ? `color: ${Colors.Colors.brandColorPrimary}; * {
      color: ${Colors.Colors.brandColorPrimary};
    }`
  :  props.state === "inactive"
    ? `color: ${Colors.Colors.elementColorWeak}; * {
      color: ${Colors.Colors.elementColorWeak};
    }`
    : ``
  };
  &:hover {
    background: ${Colors.Colors.bgColorLv1};
    cursor: pointer;
  }
  &--border {
    border-top: 1px solid ${Colors.Colors.borderColorLv1};
    /* &:first-child {
      border-top: 0;
    } */
  }
  .left {
    ${Layout.alignElements("inline-flex", "center", "center")};
    margin-right: ${Layout.SpacingX(2)};
    &__icon {
      margin-right: ${Layout.SpacingX(1)};
      /* color: ${Colors.Colors.elementColorWeak}; */
    }
    &__text {
      white-space: nowrap;
      /* color: ${Colors.Colors.elementColorWeak}; */
      font-size: 14px;
    }
  }
  .right {
    ${Layout.alignElements("inline-flex", "center", "center")};
    color: ${Colors.Colors.elementColorWeak};
    &__icon {
      margin-left: ${Layout.SpacingX(1)};
    }
  }
`;
