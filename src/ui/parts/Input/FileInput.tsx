import React from "react";
import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import * as Colors from "../../../styles/Colors";

export interface FileInputProps {
  accept: string;
  required?: boolean;
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
  onChangeInputFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput = (props: FileInputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const fileUpload = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  return React.useMemo(
    () => (
      <>
        <input
          type="file"
          name={"Import"}
          accept={props.accept}
          ref={inputRef}
          hidden
          onChange={props.onChangeInputFile}
        />
        <StyledFileInput
          onClick={fileUpload}
          className={`${props.color} ${props.size} ${
            props.isInactive ? "inactive" : ""
          }`}
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
        </StyledFileInput>
      </>
    ),
    [
      props.accept,
      props.color,
      props.icon,
      props.isInactive,
      props.leftIcon,
      props.onChangeInputFile,
      props.rightIcon,
      props.size,
      props.text,
    ]
  );
};

export default FileInput;

const StyledFileInput = styled.button`
  ${Layout.alignElements("inline-flex", "center", "center")};
  ${Layout.spacingBetweenElements("horizontal", 1 / 2)};
  ${Layout.roundX(1 / 2)};
  ${Colors.setBgColors()};
  ${Colors.setHoverStyle()};
  padding: ${Layout.spacingVH(0, 1)};
  justify-content: center;
  color: ${Colors.Colors.elementColorInverse};
  white-space: nowrap;
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
