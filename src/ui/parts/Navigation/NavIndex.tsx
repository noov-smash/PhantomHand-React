import React from "react";
// Components
import { TextInput } from "../Input/TextInput";
import {
  IconDropdownButton,
  IconDropdownButtonProps,
} from "../Button/IconButton";
// Styles
import styled from "styled-components";
import { Colors } from "../../../styles/Colors";
import * as Layout from "../../../styles/Layout";

export interface NavIndexProps {
  title: string;
  imageUrl?: string;
  _leftIcon?: string;
  _rightButtons?: IconDropdownButtonProps[];
  _options?: string[];
  _isEditing?: boolean;
  _onClickOutside?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NavIndex = (props: NavIndexProps) => {
  return (
    <Wrapper>
      <InnerLeft>
        {props._options && props._options.indexOf("showLeftIcon") !== -1 && (
          <span className={`material-icon fs-s`}>{props._leftIcon}</span>
        )}
        {props._options &&
          props._options.indexOf("showLeftIcon") === -1 &&
          props.imageUrl && <Thumbnail src={props.imageUrl} />}
        {props._isEditing ? (
          <TextInput
            state="default"
            icon="none"
            value={props.title}
            inputType="text"
            onClickOutside={props._onClickOutside}
          />
        ) : (
          <span className={`fs-s title`}>{props.title}</span>
        )}
      </InnerLeft>
      <InnerRight className="right-icon">
        {props._rightButtons &&
          props._rightButtons.map((e, i) => (
            <IconDropdownButton {...e} key={e.id} size="xxs" />
          ))}
      </InnerRight>
    </Wrapper>
  );
};

export default NavIndex;

const Wrapper = styled.li`
  ${Layout.alignElements("inline-flex", "space-between", "center")};
  ${Layout.spacingBetweenElements("horizontal", 0.5)};
  width: 100%;
  padding: ${Layout.spacingVH(1 / 2, 1)};
  color: ${Colors.elementColorWeak};
  user-select: none;
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
  max-width: calc(100% - 36px);
  .title {
    max-width: calc(100%);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const InnerRight = styled.div`
  ${Layout.alignElements("inline-flex", "center", "center")};
  ${Layout.spacingBetweenElements("horizontal", 0.5)};
  > button {
    ${Layout.alignElements("inline-flex", "center", "center")};
    width: 24px;
    border-radius: ${Layout.radiusX(1 / 4)};
    &:hover {
      background-color: ${Colors.bgColorLv2};
    }
  }
  .right-icon {
    width: 18px;
    height: 18px;
  }
`;

const Thumbnail = styled.img`
  width: 20px;
  height: 20px;
  object-fit: cover;
  object-position: center;
  border-radius: 2px;
`;
