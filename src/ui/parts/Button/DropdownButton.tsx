import React from "react";
import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import * as Colors from "../../../styles/Colors";
import * as Fonts from "../../../styles/Fonts";
import { DropdownList, DropdownListProps } from "../../systems/Combo/Dropdown";

export interface DropdownButtonProps {
  id: string;
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
  size: "xs" | "s" | "m" | "l";
  icon: "none" | "left" | "right" | "both";
  dropdown: DropdownListProps;
  positionY?: "top" | "bottom";
  tooltip?: string;
  text: string;
  width?: number;
  leftIcon?: string;
  rightIcon?: string;
  options?: string[];
  isInactive?: boolean;
  onClick?: () => void;
}

export const DropdownButton = (props: DropdownButtonProps) => {
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
      if (props.isInactive) return;
      if (
        dropDownRef &&
        dropDownRef.current &&
        dropDownRef.current.contains(e.target)
      ) {
        // Inside
        const { left, top, bottom } =
          dropDownRef.current.getBoundingClientRect();
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
    [props.isInactive, props.positionY]
  );

  const onClickOutside = React.useCallback(() => {
    setIsActive(false);
    document.removeEventListener("click", handleClick);
  }, [handleClick]);

  return React.useMemo(
    () => (
      <StyledWrapper ref={dropDownRef} isActive={isActive}>
        <StyledDropdownButton
          width={props.width}
          data-tip={props.tooltip}
          onClick={handleClick}
          className={`${props.color} ${props.size} ${
            props.isInactive ? "inactive" : isActive ? "active" : ""
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
        </StyledDropdownButton>
        {isActive && (
          <StyledDropdownWrapper {...rect} onClick={onClickOutside}>
            <DropdownList {...props.dropdown} />
          </StyledDropdownWrapper>
        )}
      </StyledWrapper>
    ),
    [
      handleClick,
      isActive,
      onClickOutside,
      props.color,
      props.dropdown,
      props.icon,
      props.isInactive,
      props.leftIcon,
      props.rightIcon,
      props.size,
      props.text,
      props.tooltip,
      props.width,
      rect,
    ]
  );
};

const StyledWrapper = styled.div.attrs<{ isActive: boolean }>((props) => ({
  style: {
    visibility: `${props.isActive ? "visible !important" : ""}`,
  },
}))<{ isActive: boolean }>`
  position: relative;
  display: grid;
  place-items: center;
`;

const StyledDropdownWrapper = styled.div.attrs<{ x: number; y: number }>(
  (props) => ({
    style: {
      left: `${props.x}px`,
      top: `${props.y}px`,
    },
  })
)<{ x: number; y: number }>`
  position: fixed;
  z-index: 1010;
  font-family: ${Fonts.FontFamily};
  display: inline-block;
`;

interface StyledButtonProps {
  width: number | undefined;
}
const StyledDropdownButton = styled.button<StyledButtonProps>`
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
