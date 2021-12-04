import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// Hooks
import { useSideMenu } from "../../../screens/Project/hooks/useSideMenu";
// Components
import {
  MenuGroup,
  MenuGroupProps,
} from "../../../ui/systems/Navigation/MenuGroup";
import { Button } from "../../../ui/parts/Button/Button";
// Styles
import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import { Colors } from "../../../styles/Colors";
import * as Effects from "../../../styles/Effects";
import { ProjectDataProps } from "../../../interfaces";

export interface MenuProps {
  data: ProjectDataProps[];
  isEditable: boolean;
  index: {
    id: string;
    title: string;
    imageUrl?: string;
  };
  saveTo: "db" | "storage";
  width: number;
}

export const Menu = (props: MenuProps) => {
  const { menu } = useSideMenu(props);
  const { onDragEnd, addNewGroup } = useSideMenu(props);

  return React.useMemo(() => {
    if (!menu) return <></>;
    return (
      <StyledWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId={props.index.id}
            type="root"
            direction="vertical"
          >
            {(provided, snapshot) => (
              <StyledDroppableArea
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {menu.map((m: MenuGroupProps, i: number) => (
                  <Draggable key={m.id} draggableId={m.id} index={i}>
                    {(provided, snapshot) => (
                      <StyledDraggableArea
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                      >
                        {!m.id && console.warn("No Group ID", m)}
                        <MenuGroup {...m} key={m.id} width={props.width} />
                      </StyledDraggableArea>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </StyledDroppableArea>
            )}
          </Droppable>
        </DragDropContext>
        <div className="footer">
          {props.isEditable && (
            <Button
              {...{
                ...Button.defaultProps,
                icon: "left",
                leftIcon: "add",
                color: "ghost",
                size: "l",
                text: "New Group",
              }}
              onClick={addNewGroup}
            />
          )}
        </div>
      </StyledWrapper>
    );
  }, [
    addNewGroup,
    menu,
    onDragEnd,
    props.index.id,
    props.isEditable,
    props.width,
  ]);
};

const StyledWrapper = styled.div`
  .footer {
    ${Layout.alignElements("flex", "center", "center")};
    ${Layout.spacingBetweenElements("horizontal", 1 / 2)};
    position: sticky;
    bottom: 0;
    width: 100%;
    place-items: center;
    background-color: ${Colors.bgColorLv1};
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
  ${Layout.spacingBetweenElements("vertical", 1)};
  user-select: "none";
`;
