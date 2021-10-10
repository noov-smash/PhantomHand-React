import React from "react";
import styled, { css } from "styled-components";

import * as Layout from "../../../styles/Layout";
import { Colors, setHoverStyle } from "../../../styles/Colors";
import { IconSize } from "../../../styles/Fonts";

export interface SelectorProps {
  options?: React.HTMLProps<HTMLOptionElement>[];
  leftIcon?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Selector: React.FC<SelectorProps> = (props) => (
  <Label
    {...props}
    onChange={(e: any) => props.onChange && props.onChange(e)}
    placeholder="項目を選択"
    htmlFor="select"
  >
    {props.leftIcon && (
      <span className="material-icon icon">{props.leftIcon}</span>
    )}
    <select name="select" id="select" className="input">
      <option key="hidden" className="hidden-option option" hidden>
        No GamePad
      </option>
      {props.options}
    </select>
  </Label>
);

export default Selector;

const Label = styled.label<SelectorProps>`
  ${Layout.alignElements("inline-flex", "flex-start", "center")};
  ${Layout.roundX(1 / 2)};
  ${setHoverStyle()};
  padding: ${Layout.spacingVH(1 / 4, 1)};
  height: 32px;
  width: 100%;
  min-width: 180px;
  position: relative;
  background: ${Colors.brandColorTertiary};
  &::before {
    position: absolute;
    right: 8px;
    content: "keyboard_arrow_down";
    font-family: "Material Icons";
    font-size: ${IconSize.s};
    color: ${Colors.elementColorWeak};
  }
  .icon {
    position: relative;
    display: inline-block;
  }
  .input {
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100%;
    width: 100%;
    display: block;
    padding-right: 32px;
    text-overflow: ellipsis;
    ${(props) =>
      props.leftIcon &&
      css`
        padding-left: ${Layout.SpacingX(4)};
      `}
    &:hover {
      cursor: pointer;
    }
  }
  .option {
    color: ${Colors.brandColorPrimary};
  }
`;
