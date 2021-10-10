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

export const GamePad: React.FC = () => {
  const [context] = React.useContext(Context);
  const {
    connectHandler,
    disconnectHandler,
    buttonChangeHandler,
    axisChangeHandler,
    onPush,
    onRelease,
    onTilt,
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
            <Container length={calcBarWidth()} />
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
        <NintendoSwitchProCon
          onPush={onPush}
          onRelease={onRelease}
          onTilt={onTilt}
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
      </Wrapper>
    );
  }, [
    axisChangeHandler,
    buttonChangeHandler,
    calcBarWidth,
    connectHandler,
    context.emulator.command,
    context.gamePad.buttonStates,
    disconnectHandler,
    onRelease,
    onPush,
    onTilt,
  ]);
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`;

const Buttons = styled.ul`
  ${Layout.alignElements("inline-flex", "center", "center")};
  ${Layout.spacingBetweenElements("horizontal", 1)};
  height: 32px;
  user-select: none;
  > li {
    ${Layout.centralizeInnerElement};
    height: 100%;
    padding: ${Layout.spacingVH(0, 2)};
    border: 1px solid ${Colors.borderColorLv1};
    ${Layout.roundX(1)};
    /* color: ${Colors.elementColorWeak}; */
  }
`;

const Container = styled.div.attrs<{ length: number }>((props) => ({
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
