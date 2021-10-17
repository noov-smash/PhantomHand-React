import React from "react";
import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import * as Colors from "../../../styles/Colors";
import * as Fonts from "../../../styles/Fonts";
import { IconSize } from "../../../styles/Fonts";
import { DropdownList, DropdownListProps } from "../../systems/Combo/Dropdown";

export interface IconButtonProps {
  color:
    | "primary"
    | "secondary"
    | "tertiary"
    | "destructive"
    | "ghost"
    | "red"
    | "blue"
    | "green"
    | "orange"
    | string;
  shape: "circle" | "square" | string;
  size: "xxs" | "xs" | "s" | "m" | "l" | string;
  icon: string;
  isInactive?: boolean;
  onClick?: () => void;
}

export const IconButton = (props: IconButtonProps) => {
  const onClickFunc = props.onClick;
  return (
    <>
      {!props.isInactive ? (
        <StyledButton
          className={`${props.color} ${props.size} ${props.shape} material-icon`}
          onClick={onClickFunc}
        >
          {props.icon}
        </StyledButton>
      ) : (
        <StyledButton
          className={`${props.color} ${props.size} ${props.shape} inactive material-icon`}
        >
          {props.icon}
        </StyledButton>
      )}
    </>
  );
};

IconButton.defaultProps = {
  icon: "close",
  color: "secondary",
  size: "s",
  shape: "circle",
};

const StyledButton = styled.button`
  ${Layout.alignElements("inline-flex", "center", "center")};
  ${Layout.roundX(1 / 2)};
  ${Colors.setBgColors()};
  ${Colors.setHoverStyle()};
  justify-content: center;
  white-space: nowrap;
  color: ${Colors.Colors.elementColorInverse};
  &.circle {
    border-radius: 50%;
  }
  &.square {
    border-radius: spacing(0.5);
  }
  &.xxs {
    height: 16px;
    width: 16px;
    font-size: ${IconSize.xs} !important;
  }
  &.xs {
    height: 24px;
    width: 24px;
    font-size: ${IconSize.s} !important;
  }
  &.s {
    height: 32px;
    width: 32px;
  }
  &.m {
    height: 40px;
    width: 40px;
    font-size: ${IconSize.l} !important;
  }
  &.l {
    height: 48px;
    width: 48px;
    font-size: ${IconSize.xl} !important;
  }
  &.inactive {
    color: ${Colors.Colors.elementColorInverse};
    background: ${Colors.Colors.brandColorSecondary};
    opacity: 0.4;
    &:hover {
      cursor: default;
      opacity: 0.4;
    }
  }
`;

/* */

export interface IconDropdownButtonProps {
  id: string;
  color:
    | "primary"
    | "secondary"
    | "tertiary"
    | "destructive"
    | "ghost"
    | "red"
    | "blue"
    | "green"
    | "orange"
    | "outline"
    | "outlinePrimary"
    | string;
  shape: "circle" | "square" | string;
  size: "xxs" | "xs" | "s" | "m" | "l" | string;
  icon: string;
  dropdown: DropdownListProps;
  positionY?: "top" | "bottom";
}

export const IconDropdownButton = (props: IconDropdownButtonProps) => {
  const [isActive, setIsActive] = React.useState(false);
  const [rect, setRect] = React.useState<{
    x: number;
    y: number;
    reverseY?: boolean;
  }>({
    x: 0,
    y: 0,
  });
  const dropDownRef = React.useRef<HTMLDivElement | null>(null);

  const handleClick = React.useCallback(
    (e: any) => {
      if (
        dropDownRef &&
        dropDownRef.current &&
        dropDownRef.current.contains(e.target)
      ) {
        // Inside
        const { left, top, bottom } = e.target.getBoundingClientRect();
        setRect({
          x: left,
          y: props.positionY === "bottom" ? bottom : top,
        });
        setIsActive((state) => {
          if (!state === true) document.addEventListener("click", handleClick);
          return true;
        });
      } else {
        // Outside
        setIsActive(false);
        document.removeEventListener("click", handleClick);
      }
    },
    [props.positionY]
  );

  const onClickOutside = React.useCallback(() => {
    setIsActive(false);
    document.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <StyledWrapper ref={dropDownRef} isActive={isActive}>
      <StyledDropdownButton
        onClick={handleClick}
        className={`${props.color} ${props.size} ${props.shape} material-icon ${
          isActive ? "active" : "inactive"
        }`}
      >
        {props.icon}
      </StyledDropdownButton>
      {isActive && (
        <StyledDropdownWrapper {...rect} onClick={onClickOutside}>
          <DropdownList {...props.dropdown} />
        </StyledDropdownWrapper>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ isActive: boolean }>`
  position: relative;
  display: grid;
  place-items: center;
  ${(props) =>
    props.isActive &&
    `
  visibility: visible !important;
`};
`;

const StyledDropdownButton = styled.button`
  ${Layout.alignElements("inline-flex", "center", "center")};
  ${Layout.roundX(1 / 2)};
  ${Colors.setBgColors()};
  ${Colors.setHoverStyle()};
  justify-content: center;
  white-space: nowrap;
  color: ${Colors.Colors.elementColorInverse};
  &.circle {
    border-radius: 50%;
  }
  &.square {
    border-radius: spacing(0.5);
  }
  &.xxs {
    height: 16px;
    width: 16px;
    font-size: ${IconSize.xs} !important;
  }
  &.xs {
    height: 24px;
    width: 24px;
    font-size: ${IconSize.s} !important;
  }
  &.s {
    height: 32px;
    width: 32px;
  }
  &.m {
    height: 40px;
    width: 40px;
    font-size: ${IconSize.l} !important;
  }
  &.l {
    height: 48px;
    width: 48px;
    font-size: ${IconSize.xl} !important;
  }
  &.active {
    background-color: ${Colors.Colors.bgColorLv2};
  }
`;

const StyledDropdownWrapper = styled.div<{ x: number; y: number }>`
  position: fixed;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  z-index: 100;
  font-family: ${Fonts.FontFamily};
  display: inline-block;
`;
