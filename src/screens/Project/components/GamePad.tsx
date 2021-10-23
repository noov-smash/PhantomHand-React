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
import { CommandTable } from "./CommandTable";
// import { NoConnection } from "../ui/parts/GamePad/NoConnection";
// Configs
import { ProControllerButtonNames } from "../../../configs/controller";

export const GamePad: React.FC = () => {
  const [context] = React.useContext(Context);
  const {
    connectHandler,
    disconnectHandler,
    buttonChangeHandler,
    axisChangeHandler,
    onPush,
    onRelease,
  } = useGamePad();

  const calcBarWidth = React.useCallback(() => {
    const max = context.emulator.command.signals.slice(-1)[0];
    return 100 - (context.emulator.time / max.t) * 100;
  }, [context.emulator.command.signals, context.emulator.time]);

  return React.useMemo(() => {
    return (
      <Wrapper>
        {context.emulator.command &&
          context.emulator.command.signals.length > 0 && (
            <Bar length={calcBarWidth()} />
          )}

        <Gamepad
          gamepadIndex={0}
          onConnect={(gamepadIndex) => connectHandler(gamepadIndex)}
          onDisconnect={(gamepadIndex) => disconnectHandler(gamepadIndex)}
          onButtonChange={buttonChangeHandler}
          onAxisChange={axisChangeHandler}
        >
          <React.Fragment />
        </Gamepad>

        <StyledPreview>
          <NintendoSwitchProCon
            onPush={onPush}
            onRelease={onRelease}
            onTilt={axisChangeHandler}
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
          <StyledID>{context.user.isSignedIn && context.user.uid}</StyledID>
        </StyledPreview>

        <CommandTable signals={context.emulator.command.signals} />
      </Wrapper>
    );
  }, [
    context.emulator.command,
    context.gamePad.stickStates,
    context.gamePad.buttonStates,
    context.user.isSignedIn,
    context.user.uid,
    calcBarWidth,
    buttonChangeHandler,
    axisChangeHandler,
    onPush,
    onRelease,
    connectHandler,
    disconnectHandler,
  ]);
};

const Wrapper = styled.div`
  ${Layout.alignElements("inline-flex", "space-between", "space-between")};
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledPreview = styled.div`
  display: grid;
  place-items: center;
  position: relative;
  height: 100%;
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
    font-size: 14px;
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
      width: 48px;
      display: inline-block;
    }
  }
`;

const Bar = styled.div.attrs<{ length: number }>((props) => ({
  style: {
    width: `${props.length}%`,
  },
}))<{ length: number }>`
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  background-color: ${Colors.brandColorPrimary};
`;

const StyledID = styled.span`
  position: absolute;
  bottom: 4px;
  right: 8px;
  color: ${Colors.elementColorMute};
  font-size: 9px;
`;
