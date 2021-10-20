// import { on } from "events";
import React from "react";
import { Context } from "../../../hooks/Provider";
import styled from "styled-components";
import { Axis } from "react-gamepad";

export interface NintendoSwitchProConProps {
  activeColor?: string;
  inactiveColor?: string;
  onPush: (b: number, s: boolean) => void;
  onRelease: (b: number) => void;
  onTilt: (s: Axis, v: number) => void;
}

export const NintendoSwitchProCon = ({
  activeColor = "#6AD2FF",
  inactiveColor = "#7C8388",
  ...props
}: NintendoSwitchProConProps) => {
  const [context] = React.useContext(Context);
  const [coordinates, setCoordinates] = React.useState<{
    x: number;
    y: number;
  }>({
    x: 128,
    y: 128,
  });
  const stickRef = React.useRef(coordinates);

  React.useEffect(() => {
    stickRef.current = coordinates;
  }, [coordinates]);

  const createTransform = React.useCallback(
    (direction: "up" | "down" | "left" | "right" | "neutral") => {
      switch (direction) {
        case "up":
          return "translateY(-15px)";
        case "down":
          return "translateY(15px)";
        case "left":
          return "translateX(-15px)";
        case "right":
          return "translateX(15px)";
        case "neutral":
          return "translateX(0) translateY(0)";
        default:
          return "";
      }
    },
    []
  );

  const calcDirectionVertical = React.useCallback((axe: number) => {
    if (axe <= 95) return "up"; // Up
    if (axe >= 159) return "down"; // Down
    return "neutral";
  }, []);

  const calcDirectionHorizontal = React.useCallback((axe: number) => {
    if (axe <= 95) return "left"; // Left
    if (axe >= 159) return "right"; // Right
    return "neutral";
  }, []);


  const calc = React.useCallback(
    (val: number) => {
      const threshold = 40; //px
      if (val >= threshold) return 1;
      if (val <= -threshold) return -1;
      return 0;
    },
    []
  );

  const onLeftStickMove = React.useCallback(
    (e: MouseEvent) => {
      if (!stickRef.current) return;
      const x = calc(e.clientX - stickRef.current.x);
      const y = calc(e.clientY - stickRef.current.y) * -1;
      const absX = Math.abs(x);
      const absY = Math.abs(y);
      if (absX > absY)
        props.onTilt("LeftStickX", x);
      if (absX < absY)
        props.onTilt("LeftStickY", y);
    },
    [calc, props]
  );

  const onRightStickMove = React.useCallback(
    (e: MouseEvent) => {
      if (!stickRef.current) return;
      const x = calc(e.clientX - stickRef.current.x);
      const y = calc(e.clientY - stickRef.current.y) * -1;
      const absX = Math.abs(x);
      const absY = Math.abs(y);
      if (absX > absY)
        props.onTilt("RightStickX", x);
      if (absX < absY)
        props.onTilt("RightStickY", y);
    },
    [calc, props]
  );

  const onStickUp = React.useCallback(
    (event: MouseEvent) => {
      document.removeEventListener("mousemove", onLeftStickMove);
      document.removeEventListener("mousemove", onRightStickMove);
      document.removeEventListener("mouseup", onStickUp);
      const neutral = 0;
      props.onTilt("LeftStickX", neutral);
      props.onTilt("LeftStickY", neutral);
      props.onTilt("RightStickX", neutral);
      props.onTilt("RightStickY", neutral);
    },
    [onLeftStickMove, onRightStickMove, props]
  );

  const onStickDown = React.useCallback(
    (event: React.MouseEvent<SVGElement>, stick: "left" | "right") => {
      const element = event.currentTarget;
      const {
        left: x,
        top: y,
        width: w,
        height: h,
      } = element.getBoundingClientRect();
      document.addEventListener("mouseup", onStickUp);
      if (stick === "right")
        document.addEventListener("mousemove", onRightStickMove);
      if (stick === "left")
        document.addEventListener("mousemove", onLeftStickMove);
      setCoordinates({
        x: x + w / 2,
        y: y + h / 2,
      });
    },
    [onLeftStickMove, onRightStickMove, onStickUp]
  );

  return (
    <Svg
      width="524"
      height="450"
      viewBox="0 0 1000 858"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="1000" height="858" fill="white" />
      {/* Left Grip */}
      <path
        d="M4.50003 710C7.00003 742 4 783.5 57.5 818.5C111 853.5 163.5 800 178.5 761.5C193.5 723 239.5 640 257 629.5C208.167 572.269 99.9 437.125 57.5 354.403C22.265 494.962 2.74123 687.487 4.50003 710Z"
        fill="#3F4245"
      />
      {/* Right Grip */}
      <path
        d="M942.5 818.5C996 783.5 993 742 995.5 710C997.259 687.487 977.735 494.962 942.5 354.403C900.1 437.125 791.833 572.269 743 629.5C760.5 640 806.5 723 821.5 761.5C836.5 800 889 853.5 942.5 818.5Z"
        fill="#3F4245"
      />
      {/* Outlines */}
      <path
        d="M4.50003 710C7.00003 742 4 783.5 57.5 818.5C111 853.5 163.5 800 178.5 761.5C193.5 723 239.5 640 257 629.5C208.167 572.269 99.9 437.125 57.5 354.403C22.265 494.962 2.74123 687.487 4.50003 710Z"
        stroke="black"
        strokeWidth="4"
      />
      <path
        d="M942.5 818.5C996 783.5 993 742 995.5 710C997.259 687.487 977.735 494.962 942.5 354.403C900.1 437.125 791.833 572.269 743 629.5C760.5 640 806.5 723 821.5 761.5C836.5 800 889 853.5 942.5 818.5Z"
        stroke="black"
        strokeWidth="4"
      />
      <path
        d="M257 629.5C271 621.1 424.833 620.333 500 621C575.167 620.333 729 621.1 743 629.5C791.833 572.268 900.1 437.125 942.5 354.403C927.651 295.168 910.0162 245.163 890 221C857.466 181.718 761.592 162.969 667 155.109C610 151 548 151 500 151C452 151 390 151 333 155.109C238.408 162.969 142.534 181.718 110 221C89.9878 245.163 72.3488 295.168 57.5 354.403C99.9 437.125 208.167 572.268 257 629.5Z"
        fill="#23282B"
        stroke="black"
        strokeWidth="4"
      />
      {/* Stick Backgrounds */}
      <circle cx="224" cy="347" r="87" fill="#030407" />
      <circle cx="632" cy="483" r="87" fill="#030407" />

      {/* Left Stick */}
      <circle
        cx="224"
        cy="347"
        r="59"
        fill={
          context.gamePad.stickStates[18] >= 159 ||
          context.gamePad.stickStates[18] <= 95 ||
          context.gamePad.stickStates[19] >= 159 ||
          context.gamePad.stickStates[19] <= 95
            ? activeColor
            : inactiveColor
        }
        style={{
          transition: "transform 50ms ease-out",
          transform: `${createTransform(
            calcDirectionHorizontal(context.gamePad.stickStates[18])
          )} ${createTransform(
            calcDirectionVertical(context.gamePad.stickStates[19])
          )}`,
        }}
        onMouseDown={(e) => onStickDown(e, "left")}
      />

      {/* Right Stick */}
      <circle
        cx="632"
        cy="483"
        r="59"
        fill={
          context.gamePad.stickStates[20] >= 159 ||
          context.gamePad.stickStates[20] <= 95 ||
          context.gamePad.stickStates[21] >= 159 ||
          context.gamePad.stickStates[21] <= 95
            ? activeColor
            : inactiveColor
        }
        style={{
          transition: "transform 50ms ease-out",
          transform: `${createTransform(
            calcDirectionHorizontal(context.gamePad.stickStates[20])
          )} ${createTransform(
            calcDirectionVertical(context.gamePad.stickStates[21])
          )}`,
        }}
        onMouseDown={(e) => onStickDown(e, "right")}
      />

      {/* Direction Up */}
      <path
        onMouseDown={() => {
          props.onPush(12, true);
        }}
        onMouseUp={() => {
          props.onPush(12, false);
        }}
        onMouseOut={() => {
          props.onRelease(12);
        }}
        d="M325 411.5H346.5H368V462.5L346.5 484L325 462.5V411.5Z"
        fill={context.gamePad.buttonStates[12] ? activeColor : inactiveColor}
        stroke="#030407"
        strokeWidth="4"
      />

      {/* Direction Right */}
      <path
        onMouseDown={() => {
          props.onPush(15, true);
        }}
        onMouseUp={() => {
          props.onPush(15, false);
        }}
        onMouseOut={() => {
          props.onRelease(15);
        }}
        d="M419 462.5L419 484L419 505.5L368 505.5L346.5 484L368 462.5L419 462.5Z"
        fill={context.gamePad.buttonStates[15] ? activeColor : inactiveColor}
        stroke="#030407"
        strokeWidth="4"
      />

      {/* Direction Down */}
      <path
        onMouseDown={() => {
          props.onPush(13, true);
        }}
        onMouseUp={() => {
          props.onPush(13, false);
        }}
        onMouseOut={() => {
          props.onRelease(13);
        }}
        d="M325 556.5H346.5H368V505.5L346.5 484L325 505.5V556.5Z"
        fill={context.gamePad.buttonStates[13] ? activeColor : inactiveColor}
        stroke="#030407"
        strokeWidth="4"
      />

      {/* Direction Left */}
      <path
        onMouseDown={() => {
          props.onPush(14, true);
        }}
        onMouseUp={() => {
          props.onPush(14, false);
        }}
        onMouseOut={() => {
          props.onRelease(14);
        }}
        d="M274 462.5L274 484L274 505.5L325 505.5L346.5 484L325 462.5L274 462.5Z"
        fill={context.gamePad.buttonStates[14] ? activeColor : inactiveColor}
        stroke="#030407"
        strokeWidth="4"
      />

      {/* Button X */}
      <circle
        onMouseDown={() => {
          props.onPush(3, true);
        }}
        onMouseUp={() => {
          props.onPush(3, false);
        }}
        onMouseOut={() => {
          props.onRelease(3);
        }}
        cx="764"
        cy="277"
        r="37"
        fill={context.gamePad.buttonStates[3] ? activeColor : inactiveColor}
        stroke="#030407"
        strokeWidth="4"
      />

      {/* Button Y */}
      <circle
        onMouseDown={() => {
          props.onPush(2, true);
        }}
        onMouseUp={() => {
          props.onPush(2, false);
        }}
        onMouseOut={() => {
          props.onRelease(2);
        }}
        cx="686"
        cy="345"
        r="37"
        fill={context.gamePad.buttonStates[2] ? activeColor : inactiveColor}
        stroke="#030407"
        strokeWidth="4"
      />

      {/* Button A */}
      <circle
        onMouseDown={() => {
          props.onPush(1, true);
        }}
        onMouseUp={() => {
          props.onPush(1, false);
        }}
        onMouseOut={() => {
          props.onRelease(1);
        }}
        cx="842"
        cy="345"
        r="37"
        fill={context.gamePad.buttonStates[1] ? activeColor : inactiveColor}
        stroke="#030407"
        strokeWidth="4"
      />

      {/* Button B */}
      <circle
        onMouseDown={() => {
          props.onPush(0, true);
        }}
        onMouseUp={() => {
          props.onPush(0, false);
        }}
        onMouseOut={() => {
          props.onRelease(0);
        }}
        cx="764"
        cy="415"
        r="37"
        fill={context.gamePad.buttonStates[0] ? activeColor : inactiveColor}
        stroke="#030407"
        strokeWidth="4"
      />

      {/* Plus */}
      <circle
        onMouseDown={() => {
          props.onPush(9, true);
        }}
        onMouseUp={() => {
          props.onPush(9, false);
        }}
        onMouseOut={() => {
          props.onRelease(9);
        }}
        cx="625"
        cy="269"
        r="22"
        fill={context.gamePad.buttonStates[9] ? activeColor : inactiveColor}
        stroke="#030407"
        strokeWidth="4"
      />

      {/* Minus */}
      <circle
        onMouseDown={() => {
          props.onPush(8, true);
        }}
        onMouseUp={() => {
          props.onPush(8, false);
        }}
        onMouseOut={() => {
          props.onRelease(8);
        }}
        cx="375"
        cy="269"
        r="22"
        fill={context.gamePad.buttonStates[8] ? activeColor : inactiveColor}
        stroke="#030407"
        strokeWidth="4"
      />

      {/* Home */}
      <circle
        onMouseDown={() => {
          props.onPush(16, true);
        }}
        onMouseUp={() => {
          props.onPush(16, false);
        }}
        onMouseOut={() => {
          props.onRelease(16);
        }}
        cx="570"
        cy="347"
        r="22"
        fill={context.gamePad.buttonStates[16] ? activeColor : inactiveColor}
        stroke="#030407"
        strokeWidth="4"
      />

      {/* ScreenShot */}
      <rect
        onMouseDown={() => {
          props.onPush(17, true);
        }}
        onMouseUp={() => {
          props.onPush(17, false);
        }}
        onMouseOut={() => {
          props.onRelease(17);
        }}
        x="408"
        y="326"
        width="42"
        height="42"
        rx="6"
        fill={context.gamePad.buttonStates[17] ? activeColor : inactiveColor}
        stroke="#030407"
        strokeWidth="4"
      />

      {/* R */}
      <path
        onMouseDown={() => {
          props.onPush(5, true);
        }}
        onMouseUp={() => {
          props.onPush(5, false);
        }}
        onMouseOut={() => {
          props.onRelease(5);
        }}
        d="M890 221C857.466 181.718 761.592 162.969 667 155.109C673.167 151.239 687.4 142.9 695 140.5C704.5 137.5 755.5 142.5 806.5 152.5C847.3 160.5 879.167 201.5 890 221Z"
        fill={context.gamePad.buttonStates[5] ? activeColor : inactiveColor}
        stroke="black"
        strokeWidth="4"
      />

      {/* L */}
      <path
        onMouseDown={() => {
          props.onPush(4, true);
        }}
        onMouseUp={() => {
          props.onPush(4, false);
        }}
        onMouseOut={() => {
          props.onRelease(4);
        }}
        d="M110 221C142.534 181.718 238.408 162.969 333 155.109C326.833 151.239 312.6 142.9 305 140.5C295.5 137.5 244.5 142.5 193.5 152.5C152.7 160.5 120.833 201.5 110 221Z"
        fill={context.gamePad.buttonStates[4] ? activeColor : inactiveColor}
        stroke="black"
        strokeWidth="4"
      />

      {/* ZR */}
      <path
        onMouseDown={() => {
          props.onPush(7, true);
        }}
        onMouseUp={() => {
          props.onPush(7, false);
        }}
        onMouseOut={() => {
          props.onRelease(7);
        }}
        d="M722.379 30.8329C712.477 34.4403 704.001 82.3138 701 105.8C706.626 110.873 750.508 112 777.513 112C804.517 112 847.275 105.8 852.338 100.727C857.401 95.6539 832.084 42.6697 821.958 34.7785C811.831 26.8872 734.756 26.3236 722.379 30.8329Z"
        fill={context.gamePad.buttonStates[7] ? activeColor : inactiveColor}
        stroke="black"
        strokeWidth="4"
      />

      {/* ZL */}
      <path
        onMouseDown={() => {
          props.onPush(6, true);
        }}
        onMouseUp={() => {
          props.onPush(6, false);
        }}
        onMouseOut={() => {
          props.onRelease(6);
        }}
        d="M276.621 30.8329C286.523 34.4403 294.999 82.3138 298 105.8C292.374 110.873 248.492 112 221.487 112C194.483 112 151.725 105.8 146.662 100.727C141.599 95.6539 166.916 42.6697 177.042 34.7785C187.169 26.8872 264.244 26.3236 276.621 30.8329Z"
        fill={context.gamePad.buttonStates[6] ? activeColor : inactiveColor}
        stroke="black"
        strokeWidth="4"
      />
    </Svg>
  );
};

export default NintendoSwitchProCon;

const Svg = styled.svg`
  * {
    user-select: none;
  }
`;
