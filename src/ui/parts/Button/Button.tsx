import React from "react";
import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import * as Colors from "../../../styles/Colors";
export interface ButtonProps {
  text: string;
  color:
    | "primary"
    | "secondary"
    | "tertiary"
    | "destructive"
    | "ghost"
    | "outline"
    | "outlinePrimary"
    | "transparent"
    | "arduino";
  icon: "none" | "left" | "right" | "both";
  size: "xs" | "s" | "m" | "l";
  width?: number;
  leftIcon?: string;
  rightIcon?: string;
  options?: string[];
  isInactive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <StyledButton
      width={props.width}
      className={`${props.color} ${props.size} ${
        props.isInactive ? "inactive" : ""
      }`}
      onClick={async (e: any) => {
        if (!props.onClick || props.isInactive) return;
        await props.onClick(e);
      }}
    >
      {((props.icon === "left" && props.leftIcon) ||
        (props.icon === "both" && props.leftIcon)) && (
        <i className="material-icon icon">{props.leftIcon}</i>
      )}
      <span>{props.text}</span>
      {((props.icon === "right" && props.rightIcon) ||
        (props.icon === "both" && props.rightIcon)) && (
        <i className="material-icon icon xs">{props.rightIcon}</i>
      )}
    </StyledButton>
  );
};

Button.defaultProps = {
  text: "テキスト",
  color: "primary",
  icon: "none",
  leftIcon: "person",
  rightIcon: "keyboard_arrow_right",
  size: "m",
  options: [],
};

interface StyledButtonProps {
  width: number | undefined;
}
const StyledButton = styled.button<StyledButtonProps>`
  ${Layout.alignElements("inline-flex", "center", "center")};
  ${Layout.spacingBetweenElements("horizontal", 1 / 2)};
  ${Layout.roundX(1 / 2)};
  ${Colors.setBgColors()};
  ${Colors.setHoverStyle()};
  padding: ${Layout.spacingVH(0, 1)};
  justify-content: center;
  color: ${Colors.Colors.elementColorInverse};
  white-space: nowrap;
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  &.xs {
    height: 28px;
  }
  &.s {
    height: 32px;
  }
  &.m {
    height: 40px;
  }
  &.l {
    height: 48px;
  }
  &.inactive {
    color: ${Colors.Colors.elementColorInverse};
    background: ${Colors.Colors.brandColorSecondary};
    opacity: 0.4;
    border: none;
    &:hover {
      cursor: default;
      opacity: 0.4;
    }
  }
  .material-icon {
    &.xs {
      font-size: 16px;
    }
  }
`;
