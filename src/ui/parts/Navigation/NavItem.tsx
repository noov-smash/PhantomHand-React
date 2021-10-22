import React from "react";
// Styles
import styled, { css } from "styled-components";
import * as Layout from "../../../styles/Layout";
import { Colors } from "../../../styles/Colors";
import { FontWeight, IconSize } from "../../../styles/Fonts";

// Hooks
import { TextInput } from "../Input/Input";
import {
  IconDropdownButton,
  IconDropdownButtonProps,
} from "../Button/IconButton";

// Interface
import { CommandProps } from "../../../interfaces";
export interface NavItemProps {
  id: string;
  title: string;
  data: CommandProps;
  _level: number;
  _state: "default" | "active" | "inactive" | string;
  _leftIcon?: string;
  _rightButtons?: IconDropdownButtonProps[];
  _isEditing?: boolean;
  _onClickOutside?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  _onClick?: () => void;
}

export const NavItem = (props: NavItemProps) => {
  const setData = React.useCallback(() => {
    if (props._isEditing) return;
    else if (props._onClick) props._onClick();
  }, [props]);

  return (
    <Wrapper {...props} key={props.title}>
      <InnerLeft onClick={setData}>
        {props._isEditing ? (
          <TextInput
            state="default"
            icon="none"
            value={props.title}
            inputType="text"
            onClickOutside={props._onClickOutside}
          />
        ) : (
          `${props.title} `
        )}
      </InnerLeft>
      <InnerRight>
        {props._rightButtons &&
          props._rightButtons.map((e) => (
            <div key={e.id} className="material-icon fs-s right-icon">
              <IconDropdownButton {...e} />
            </div>
          ))}
      </InnerRight>
    </Wrapper>
  );
};

export default NavItem;

const Wrapper = styled.li<NavItemProps>`
  ${Layout.alignElements("flex", "space-between", "center")};
  padding: ${Layout.spacingVH(1 / 4, 1 / 2)};
  ${(props) =>
    props._level &&
    css`
      padding-left: ${Layout.SpacingX(3 * props._level)};
    `};
  ${(props) =>
    props._state === "active" &&
    !props._isEditing &&
    css`
      color: ${Colors.brandColorPrimary};
      font-weight: ${FontWeight.bold};
      border-left: 4px solid ${Colors.brandColorPrimary};
      background: ${Colors.bgColorLv2};
    `};
  ${(props) =>
    props._state === "inactive" &&
    css`
      opacity: 0.4;
      &:hover {
        cursor: default;
        background: $bgColorLv1;
      }
    `};
  &:hover {
    background: ${Colors.bgColorLv2};
    cursor: pointer;
  }
  &:hover .right-icon {
    visibility: visible;
  }
  .right-icon {
    visibility: hidden;
  }
`;

const InnerLeft = styled.div`
  ${Layout.alignElements("inline-flex", "flex-start", "center")};
  ${Layout.spacingBetweenElements("horizontal", 0.5)};
  width: 100%;
  user-select: none;
  padding-left: ${Layout.SpacingX(0.5)};
  font-size: 12px;
`;

const InnerRight = styled.div`
  ${Layout.alignElements("inline-flex", "center", "center")};
  ${Layout.spacingBetweenElements("horizontal", 0.5)};
  user-select: none;
  .right-icon {
    ${Layout.alignElements("flex", "center", "center")};
    display: grid;
    place-items: center;
    width: 18px;
    height: 18px;
    font-size: ${IconSize.s};
    border-radius: ${Layout.SpacingX(0.5)};
    text-align: center;
    color: ${Colors.elementColorWeak};
    &:hover {
      color: ${Colors.elementColorDefault};
      background-color: ${Colors.bgColorLv3};
    }
  }
`;
