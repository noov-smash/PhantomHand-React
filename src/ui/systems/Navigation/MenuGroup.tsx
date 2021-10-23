import React from "react";
import styled from "styled-components";
import { NavIndex, NavIndexProps } from "../../parts/Navigation/NavIndex";
import { NavFolder, NavFolderProps } from "../../parts/Navigation/NavFolder";
import { NavItem, NavItemProps } from "../../parts/Navigation/NavItem";

import { Draggable, Droppable } from "react-beautiful-dnd";

// Style
import { Colors } from "../../../styles/Colors";
import * as Effects from "../../../styles/Effects";

export interface MenuGroupProps {
  id: string;
  index: NavIndexProps;
  folders?: NavFolderProps[];
  items?: NavItemProps[];
}

export const MenuGroup = (props: MenuGroupProps) => {
  return (
    <StyledDiv>
      {props.index && <NavIndex {...props.index} />}
      <Droppable
        droppableId={`${props.id}__folders`}
        type="folders"
        direction="vertical"
      >
        {(provided, snapshot) => (
          <StyledDroppableArea
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
          >
            {props.folders &&
              props.folders.map((f, index) => (
                <Draggable
                  key={`${f.id}`}
                  draggableId={`${f.id}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <StyledDraggableArea
                      isDragging={snapshot.isDragging}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {!f.id && console.warn("No Folder ID")}
                      <NavFolder
                        {...f}
                        key={f.id}
                        _parentId={`${props.id}__folders`}
                      />
                    </StyledDraggableArea>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </StyledDroppableArea>
        )}
      </Droppable>

      <Droppable
        droppableId={`${props.id}__items`}
        type="items"
        direction="vertical"
      >
        {(provided, snapshot) => (
          <StyledDroppableArea
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
          >
            {props.items &&
              props.items.map((i, index) => (
                <Draggable
                  key={`${i.id}`}
                  draggableId={`${i.id}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <StyledDraggableArea
                      isDragging={snapshot.isDragging}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {!i.id && console.warn("No Item ID")}
                      <NavItem {...i} key={i.id} />
                    </StyledDraggableArea>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </StyledDroppableArea>
        )}
      </Droppable>
    </StyledDiv>
  );
};

export default MenuGroup;

const StyledDiv = styled.div`
  width: 100%;
  * {
    user-select: none;
  }
`;

const StyledDraggableArea = styled.div.attrs<{ isDragging: boolean }>(
  (props) => ({
    style: {
      background: `${props.isDragging ? Colors.bgColorLv1 : "transparent"}`,
      boxShadow: `${props.isDragging ? Effects.Shadow.float : "none"}`,
    },
  })
)<{ isDragging: boolean }>`
  user-select: "none";
`;

const StyledDroppableArea = styled.div.attrs<{ isDraggingOver: boolean }>(
  (props) => ({
    style: {
      background: `${props.isDraggingOver ? Colors.bgColorLv2 : "transparent"}`,
    },
  })
)<{ isDraggingOver: boolean }>`
  user-select: "none";
  min-height: 4px;
`;
