import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// Hooks
import { useSideMenu } from "../hooks/useSideMenu";
// Components
import { MenuGroup } from "../../../ui/systems/Navigation/MenuGroup";
import { LogoNav } from "./LogoNav";
import { Button } from "../../../ui/parts/Button/Button";
// Styles
import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import { Colors } from "../../../styles/Colors";
import * as Effects from "../../../styles/Effects";

export interface SideMenuProps {
  index: {
    id: string;
    title: string;
    imageUrl?: string;
  };
  data?: any;
  isEditable: boolean;
}

export const SideMenu = (props: SideMenuProps) => {
  const { menu, onDragEnd, addNewGroup } = useSideMenu(props);
  const [width, setWidth] = React.useState<number>(256);
  const [isResizing, setIsResizing] = React.useState<boolean>(false);

  const onMouseMove = React.useCallback((e: MouseEvent) => {
    setWidth(e.clientX);
  }, []);

  const onMouseUp = React.useCallback(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    setIsResizing(false);
  }, [onMouseMove]);

  const onMouseDown = React.useCallback(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    setIsResizing(true);
  }, [onMouseMove, onMouseUp]);

  return React.useMemo(() => {
    if (!menu) return <></>;
    return (
      <Wrapper width={width}>
        <StyledBorder
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          isResizing={isResizing}
        />
        <div>
          <LogoNav
            id={props.index.id}
            title={props.index.title}
            imageUrl={props.index.imageUrl}
          />
          <div className="scroll">
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
                    {menu.map((m, i) => (
                      <Draggable key={m.id} draggableId={m.id} index={i}>
                        {(provided, snapshot) => (
                          <StyledDraggableArea
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                          >
                            {!m.id && console.warn("No Group ID", m)}
                            <MenuGroup {...m} key={m.id} />
                          </StyledDraggableArea>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </StyledDroppableArea>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
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
      </Wrapper>
    );
  }, [
    addNewGroup,
    isResizing,
    menu,
    onDragEnd,
    onMouseDown,
    onMouseUp,
    props.index.id,
    props.index.imageUrl,
    props.index.title,
    props.isEditable,
    width,
  ]);
};

export default SideMenu;

const Wrapper = styled.nav.attrs<{ width: number }>((props) => ({
  style: {
    width: `${props.width}px`,
  },
}))<{ width: number }>`
  ${Layout.alignElements("flex", "space-between", "center")};
  ${Layout.spacingBetweenElements("vertical", 2)};
  flex-direction: column;
  height: 100%;
  transition: 0.5s ease;
  overflow: hidden;
  background-color: ${Colors.bgColorLv1};
  position: relative;
  > * {
    width: 100%;
  }
  .scroll {
    height: calc(100vh - 48px - 48px);
    overflow-y: scroll;
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: grid;
    place-items: center;
  }
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

const StyledBorder = styled.div.attrs<{ isResizing: boolean }>((props) => ({
  style: {
    backgroundColor: `${
      props.isResizing ? Colors.borderColorLv2 : "transparent"
    }`,
  },
}))<{ isResizing: boolean }>`
  position: absolute;
  right: 0;
  width: 4px;
  height: 100%;
  user-select: none;
  z-index: 10;
  &:hover {
    background-color: ${Colors.borderColorLv2} !important;
    cursor: col-resize;
  }
`;
