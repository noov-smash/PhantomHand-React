import React from "react";
// Styles
import styled, { css } from "styled-components";
import * as Layout from "../../../styles/Layout";
import { Colors } from "../../../styles/Colors";
import { Shadow } from "../../../styles/Effects";
import { FontWeight, IconSize } from "../../../styles/Fonts";

// Hooks
import { TextInput } from "../Input/TextInput";
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
  _width?: number;
}

interface WrapperProps extends NavItemProps {
  rect?: DOMRect;
  width?: number;
}

export const NavItem = (props: NavItemProps) => {
  const liRef = React.useRef<HTMLLIElement>(null);
  const [rect, setRect] = React.useState<DOMRect>();
  const setData = React.useCallback(() => {
    if (props._isEditing) return;
    else if (props._onClick) props._onClick();
  }, [props]);

  React.useEffect(() => {
    setRect(liRef.current?.getBoundingClientRect());
  }, []);

  return (
    <Wrapper
      {...props}
      key={props.title}
      ref={liRef}
      rect={rect}
      width={props._width}
    >
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
          <>
            <span className="title">{props.title} </span>
            {props.data.videoUrl && props.data.videoUrl !== "" && (
              <span className="material-icon fs-xs">
                slideshow
                {/* smart_display */}
              </span>
            )}
          </>
        )}
      </InnerLeft>
      <InnerRight>
        {props._rightButtons &&
          props._rightButtons.map((e) => (
            <div key={e.id} className="material-icon fs-xs right-icon">
              <IconDropdownButton {...e} />
            </div>
          ))}
      </InnerRight>
      {props.data.videoUrl && (
        <video loop playsInline autoPlay muted className="video">
          <source src={props.data.videoUrl} type="video/webm" />
        </video>
      )}
    </Wrapper>
  );
};

export default NavItem;

const Wrapper = styled.li.attrs<WrapperProps>((props) => ({
  style: {
    paddingLeft: `${Layout.SpacingX(3 * props._level || 1)}`,
  },
}))<WrapperProps>`
  ${Layout.alignElements("flex", "space-between", "center")};
  padding: ${Layout.spacingVH(1 / 4, 1 / 2)};
  position: relative;
  overflow-x: visible;
  width: 100%;
  ${(props) =>
    props._state === "active" &&
    !props._isEditing &&
    css`
      color: ${Colors.brandColorPrimary};
      font-weight: ${FontWeight.bold};
      border-left: 4px solid ${Colors.brandColorPrimary};
      background: ${Colors.bgColorLv2};
    `};
  &:hover {
    background: ${Colors.bgColorLv2};
    cursor: pointer;
    .right-icon {
      visibility: visible;
    }
    .video {
      display: block;
    }
  }
  .right-icon {
    visibility: hidden;
  }
  .video {
    display: none;
    position: fixed;
    z-index: 1000;
    width: 300px;
    box-shadow: ${Shadow.float};
    left: ${(props) =>
      props.width
        ? `${props.width}px`
        : props.rect
        ? `${props.rect.width}px`
        : "256px"};
    ${(props) =>
      props.rect
        ? props.rect.y + (300 * 9) / 16 > window.innerHeight
          ? css`
              bottom: ${`${
                window.innerHeight - props.rect.y - props.rect.height
              }px`};
            `
          : css`
              top: ${props.rect.y}px;
            `
        : css`
            bottom: 0;
          `}
  }
`;

const InnerLeft = styled.div`
  ${Layout.alignElements("inline-flex", "flex-start", "center")};
  ${Layout.spacingBetweenElements("horizontal", 0.5)};
  max-width: calc(100% - 24px);
  width: 100%;
  user-select: none;
  padding-left: ${Layout.SpacingX(0.5)};
  font-size: 12px;
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
  padding-right: 4px;
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
