import React from "react";
import styled, { css } from "styled-components";
import * as Layout from "../../../styles/Layout";
import { Colors } from "../../../styles/Colors";
import { IconSize } from "../../../styles/Fonts";

import { Draggable, Droppable } from "react-beautiful-dnd";

import { TextInput } from "../Input/Input";
import { NavItem, NavItemProps } from "../../parts/Navigation/NavItem";
import {
  IconDropdownButton,
  IconDropdownButtonProps,
} from "../Button/IconButton";

// Style
import * as Effects from "../../../styles/Effects";

export interface NavFolderProps {
  id: string;
  title: string;
  items?: NavItemProps[];
  folders?: NavFolderProps[];
  _parentId: string;
  _level: number;
  _rightButtons?: IconDropdownButtonProps[];
  _isOpen: boolean;
  _isEditing?: boolean;
  _onClickOutside?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NavFolder = (props: NavFolderProps) => {
  const [_isOpen, setIsOpen] = React.useState(props._isOpen);
  const handleIsOpen = () => {
    if (!props._isEditing) setIsOpen(!_isOpen);
  };
  return (
    <Droppable
      droppableId={`${props._parentId}__${props.id}`}
      type="items"
      direction="vertical"
    >
      {(provided, snapshot) => (
        <StyledDroppableArea
          isDraggingOver={snapshot.isDraggingOver}
          ref={provided.innerRef}
        >
          <Wrapper {...props}>
            <InnerLeft onClick={handleIsOpen}>
              <span className="material-icon fs-xs">
                {_isOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}
              </span>
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
            <InnerRight>
              {props._rightButtons &&
                props._rightButtons.map((e) => (
                  <div className="right-icon fs-s" key={e.id}>
                    <IconDropdownButton {...e} key={e.id} size="xxs" />
                  </div>
                ))}
            </InnerRight>
          </Wrapper>

          {_isOpen &&
            props.folders &&
            props.folders.map((f, index) => (
              <Draggable key={`${f.id}}`} draggableId={`${f.id}`} index={index}>
                {(provided, snapshot) => (
                  <StyledDraggableArea
                    isDragging={snapshot.isDragging}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {!f.id && console.warn("No Folder in Folder ID")}
                    <NavFolder {...f} key={f.id} />
                  </StyledDraggableArea>
                )}
              </Draggable>
            ))}

          {_isOpen &&
            props.items &&
            props.items.map((i, index) => (
              <Draggable key={`${i.id}`} draggableId={`${i.id}`} index={index}>
                {(provided, snapshot) => (
                  <StyledDraggableArea
                    isDragging={snapshot.isDragging}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {!i.id && console.warn("No Item in Folder ID")}
                    <NavItem {...i} key={i.id} />
                  </StyledDraggableArea>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </StyledDroppableArea>
      )}
    </Droppable>
  );
};

const Wrapper = styled.li<{ _level: number }>`
  ${Layout.alignElements("inline-flex", "space-between", "center")};
  width: 100%;
  padding: ${Layout.spacingVH(1 / 4, 1 / 2)};
  ${(props) =>
    props._level &&
    css`
      padding-left: ${Layout.SpacingX(3 * props._level)};
    `};
  position: relative;
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
  font-size: 12px;
`;

const InnerRight = styled.div`
  ${Layout.alignElements("inline-flex", "center", "center")};
  ${Layout.spacingBetweenElements("horizontal", 0.5)};
  .right-icon {
    display: grid;
    place-items: center;
    width: 18px;
    height: 18px;
    font-size: ${IconSize.s};
    border-radius: ${Layout.SpacingX(0.5)};
    text-align: center;
    color: ${Colors.elementColorWeak};
    opacity: 1;
    &:hover {
      color: ${Colors.elementColorDefault};
      background-color: ${Colors.bgColorLv3};
    }
  }
`;

const StyledDraggableArea = styled.div<{ isDragging: boolean }>`
  user-select: "none";
  background: ${(props) =>
    props.isDragging ? Colors.bgColorLv1 : "transparent"};
  box-shadow: ${(props) => (props.isDragging ? Effects.Shadow.float : "none")};
`;

const StyledDroppableArea = styled.div<{ isDraggingOver: boolean }>`
  user-select: "none";
  background: ${(props) =>
    props.isDraggingOver ? Colors.bgColorLv2 : "transparent"};
`;
