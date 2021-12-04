import React from "react";
import Gamepad from "react-gamepad";
// Hooks
import { Context } from "../../../hooks/Provider";
import { useGamePad } from "../../../hooks/useGamePad";
// Styles
import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import { Colors } from "../../../styles/Colors";
// Components
import { NintendoSwitchProCon } from "./NintendoSwitchProCon";
// import { NoConnection } from "../ui/parts/GamePad/NoConnection";
// Configs
import { ProControllerButtonNames } from "../../../configs/controller";

export const GamePad: React.FC<{ showSmall: boolean }> = (props) => {
  const [context] = React.useContext(Context);
  const {
    connectHandler,
    disconnectHandler,
    buttonChangeHandler,
    axisChangeHandler,
    onPush,
    onRelease,
  } = useGamePad();

  return React.useMemo(() => {
    return (
      <GamePadPreview>
        <NintendoSwitchProCon
          onPush={onPush}
          onRelease={onRelease}
          onTilt={axisChangeHandler}
          showSmall={props.showSmall}
        />
        <Buttons>
          {Object.keys(context.gamePad.buttonStates).map(
            (button: any) =>
              button < 18 &&
              context.gamePad.buttonStates[button] && (
                <li className="fs-xl fw-bold" key={button}>
                  {ProControllerButtonNames[button]}
                </li>
              )
          )}
        </Buttons>
        <Sticks>
          <div>
            <span>X: {context.gamePad.stickStates[18]}</span>
            <span>Y: {context.gamePad.stickStates[19]}</span>
          </div>
          <div>
            <span>X: {context.gamePad.stickStates[20]}</span>
            <span>Y: {context.gamePad.stickStates[21]}</span>
          </div>
        </Sticks>
        <StyledID>
          {context.user.isAdmin && "★ "}
          {context.user.isSignedIn && context.user.uid}
        </StyledID>
        <Gamepad
          gamepadIndex={0}
          onConnect={(gamepadIndex) => connectHandler(gamepadIndex)}
          onDisconnect={(gamepadIndex) => disconnectHandler(gamepadIndex)}
          onButtonChange={buttonChangeHandler}
          onAxisChange={axisChangeHandler}
        >
          <React.Fragment />
        </Gamepad>
      </GamePadPreview>
    );
  }, [
    context.gamePad.buttonStates,
    context.gamePad.stickStates,
    context.user.isAdmin,
    context.user.isSignedIn,
    context.user.uid,
    onPush,
    onRelease,
    axisChangeHandler,
    props.showSmall,
    buttonChangeHandler,
    connectHandler,
    disconnectHandler,
  ]);
};

const GamePadPreview = styled.div`
  display: grid;
  place-items: center;
  position: relative;
  min-width: 40%;
  height: 100%;
  padding: 8px 8px;
  margin: 0 auto;
`;

const Buttons = styled.ul`
  ${Layout.alignElements("inline-flex", "center", "center")};
  ${Layout.spacingBetweenElements("horizontal", 1)};
  height: 32px;
  user-select: none;
  position: absolute;
  bottom: 20px;
  > li {
    ${Layout.centralizeInnerElement};
    ${Layout.roundX(1)};
    height: 100%;
    padding: ${Layout.spacingVH(0, 2)};
    border: 1px solid ${Colors.borderColorLv1};
    font-size: 12px;
    background-color: ${Colors.bgColorLv0};
    /* color: ${Colors.elementColorWeak}; */
  }
`;

const Sticks = styled.div`
  ${Layout.spacingBetweenElements("horizontal", 2)};
  color: ${Colors.elementColorWeak};
  top: 16px;
  position: absolute;
  user-select: none;
  > div {
    ${Layout.spacingBetweenElements("vertical", 1 / 2)};
    ${Layout.alignElements("inline-flex", "flex-start", "center")};
    flex-direction: column;
    > span {
      width: 38px;
      display: inline-block;
      font-size: 12px;
    }
  }
`;

const StyledID = styled.span`
  position: absolute;
  bottom: 4px;
  color: ${Colors.elementColorMute};
  font-size: 9px;
  &.admin {
    color: ${Colors.brandColorPrimary};
  }
`;
