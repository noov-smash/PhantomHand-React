import React from "react";
// Components
import { LogoNav } from "../../../ui/systems/SideMenu/LogoNav";
import { Menu } from "../../../ui/systems/SideMenu/Menu";
// Hooks
import { Context } from "../../../hooks/Provider";
// Styles
import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import { Colors } from "../../../styles/Colors";
import { ProjectDataProps } from "../../../interfaces";

export interface SideMenuProps {
  index: {
    id: string;
    title: string;
    imageUrl?: string;
  };
  publicData: ProjectDataProps[];
  privateData: ProjectDataProps[];
}

export const SideMenu = (props: SideMenuProps) => {
  const [context, setContext] = React.useContext(Context);
  const [width, setWidth] = React.useState<number>(256);
  const [isResizing, setIsResizing] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<"public" | "private">(
    "public"
  );

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

  React.useEffect(() => {
    console.log(activeTab);
    setContext((c) => ({
      ...c,
      emulator: {
        ...c.emulator,
        command: {
          id: "",
          title: "",
          path: "",
          signals: [],
        },
        saveTo: activeTab === "public" ? "db" : "storage",
      },
    }));
  }, [setContext, activeTab]);

  return React.useMemo(() => {
    return (
      <StyledWrapper width={width}>
        {(context.emulator.state === "playing" ||
          context.emulator.state === "recording") && <StyledOverlay />}
        <StyledBorder
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          isResizing={isResizing}
        />
        <LogoNav
          id={props.index.id}
          title={props.index.title}
          imageUrl={props.index.imageUrl}
        />
        <StyledTabs>
          <StyledTab
            onClick={() => setActiveTab("public")}
            className={activeTab === "public" ? "active" : "inactive"}
          >
            <span className="material-icon fs-s">public</span>
            <span>Public</span>
          </StyledTab>
          <StyledTab
            onClick={() => setActiveTab("private")}
            className={activeTab === "private" ? "active" : "inactive"}
          >
            <span className="material-icon fs-s">laptop</span>
            <span>Local</span>
          </StyledTab>
        </StyledTabs>
        <StyledContent>
          {activeTab === "public" ? (
            <Menu
              index={props.index}
              data={props.publicData}
              isEditable={context.user.isAdmin || false}
              saveTo="db"
              width={width}
            />
          ) : (
            <Menu
              index={props.index}
              data={props.privateData}
              isEditable={true}
              saveTo="storage"
              width={width}
            />
          )}
        </StyledContent>
      </StyledWrapper>
    );
  }, [
    activeTab,
    context.emulator.state,
    context.user.isAdmin,
    isResizing,
    onMouseDown,
    onMouseUp,
    props.index,
    props.privateData,
    props.publicData,
    width,
  ]);
};

const StyledWrapper = styled.nav.attrs<{ width: number }>((props) => ({
  style: {
    width: `${props.width}px`,
  },
}))<{ width: number }>`
  ${Layout.alignElements("flex", "space-between", "center")};
  /* ${Layout.spacingBetweenElements("vertical", 2)}; */
  flex-direction: column;
  transition: 0.5s ease;
  overflow-x: visible;
  background-color: ${Colors.bgColorLv1};
  position: relative;
  > * {
    width: 100%;
  }
`;

const StyledTabs = styled.ul`
  ${Layout.alignElements("flex", "space-between", "center")};
  height: 32px;
  border-bottom: 1px solid ${Colors.borderColorLv1};
`;

const StyledTab = styled.li`
  ${Layout.alignElements("flex", "center", "center")};
  ${Layout.spacingBetweenElements("horizontal", 1 / 2)};
  width: 100%;
  height: 100%;
  &.inactive {
    color: ${Colors.elementColorWeak};
  }
  &:hover {
    cursor: pointer;
    background-color: ${Colors.bgColorLv2};
    color: ${Colors.elementColorDefault};
  }
  &.active {
    background-color: ${Colors.bgColorLv2};
    color: ${Colors.brandColorPrimary};
    font-weight: bold;
  }
`;

const StyledContent = styled.div`
  height: calc(100vh - 48px - 32px);
  flex-grow: 1;
  overflow-y: scroll;
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

const StyledOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 48px);
  bottom: 0;
  background-color: white;
  opacity: 0.4;
  z-index: 1000;
`;
