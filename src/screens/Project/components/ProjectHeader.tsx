/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import uid from "uniqid";
// Hooks
import { Context } from "../../../hooks/Provider";
import { useEmulator } from "../../../hooks/useEmulator";
import { useUsb } from "../../../hooks/useUsb";
import { useBluetooth } from "../../../hooks/useBluetooth";
// ui
import { Button } from "../../../ui/parts/Button/Button";
import {
  IconButton,
  IconDropdownButton,
} from "../../../ui/parts/Button/IconButton";
// import { Selector } from "../../../ui/parts/Input/Selector";
// Styles
import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import { Colors } from "../../../styles/Colors";

export interface ProjectHeaderProps {}

export const ProjectHeader: React.FC<ProjectHeaderProps> = (props) => {
  const [context] = React.useContext(Context);
  const { connectToUsbDevice, disconnectUsbDevice, findUsbDevices } = useUsb();
  const { rec, stopRec, play, stopPlay, save, share } = useEmulator();
  const { connectToBluetoothDevice, disconnectBluetooth } = useBluetooth();

  React.useEffect(() => {
    findUsbDevices();
  }, [findUsbDevices]);

  return (
    <Wrapper>
      {/*----- Left -----*/}
      <InnerLeft>
        {/* Controller*/}
        <Device>
          {context.gamePad.isConnected ? (
            <>
              <span className="material-icon fs-xs on">wifi</span>
              <span className="material-icon fs-xl">sports_esports</span>
            </>
          ) : (
            <span className="material-icon fs-xl off">sports_esports</span>
          )}
        </Device>

        {/* USB */}
        <IconDropdownButton
          id={uid()}
          color={context.usb.isConnected ? "outlinePrimary" : "outline"}
          shape="square"
          size="s"
          icon="usb"
          positionY="bottom"
          dropdown={
            context.usb.isConnected
              ? [
                  {
                    state: "active",
                    leftText: context.usb.device.productName || "usb",
                    leftIcon: "usb",
                    rightIcon: "close",
                    onClick: disconnectUsbDevice,
                  },
                ]
              : [
                  {
                    state: "default",
                    leftText: "Search Device",
                    leftIcon: "wifi_tethering",
                    onClick: connectToUsbDevice,
                  },
                ]
          }
        />

        {/* Bluetooth */}
        <IconDropdownButton
          id={uid()}
          color={context.bluetooth.isConnected ? "outlinePrimary" : "outline"}
          shape="square"
          size="s"
          icon={
            context.bluetooth.isConnected ? "bluetooth_connected" : "bluetooth"
          }
          positionY="bottom"
          dropdown={
            context.bluetooth.isConnected
              ? [
                  {
                    state: "active",
                    leftText: context.bluetooth.device.name || "bluetooth",
                    leftIcon: "bluetooth_disabled",
                    rightIcon: "close",
                    onClick: disconnectBluetooth,
                  },
                ]
              : [
                  {
                    state: "default",
                    leftText: "Search Device",
                    leftIcon: "wifi_tethering",
                    onClick: connectToBluetoothDevice,
                  },
                ]
          }
        />
      </InnerLeft>

      {/*----- Right -----*/}
      <InnerRight>
        <Time>
          <span className="material-icon">timer</span>
          <span>{context.emulator.time.toFixed(3)}</span>
        </Time>

        {/* Record */}
        {context.emulator.state === "recording" ? (
          <IconButton
            {...{
              icon: "stop",
              color: "orange",
              size: "s",
              shape: "square",
            }}
            onClick={stopRec}
          />
        ) : (
          <IconButton
            {...{
              icon: "radio_button_checked",
              color: "red",
              size: "s",
              shape: "square",
            }}
            onClick={rec}
            isInactive={
              context.emulator.state === "playing" ||
              context.emulator.state === "repeating"
            }
          />
        )}

        {/* Play */}
        {context.emulator.state === "playing" ? (
          <IconButton
            {...{
              icon: "stop",
              color: "orange",
              size: "s",
              shape: "square",
            }}
            isInactive={context.emulator.command.signals.length === 0}
            onClick={stopPlay}
          />
        ) : (
          <IconButton
            {...{
              icon: "play_arrow",
              color: "blue",
              size: "s",
              shape: "square",
            }}
            isInactive={
              context.emulator.state === "recording" ||
              context.emulator.state === "repeating" ||
              context.emulator.command.signals.length === 0
            }
            onClick={() => play(false)}
          />
        )}

        {/* Repeat */}
        {context.emulator.state === "repeating" ? (
          <IconButton
            {...{
              icon: "stop",
              color: "orange",
              size: "s",
              shape: "square",
            }}
            isInactive={context.emulator.command.signals.length === 0}
            onClick={stopPlay}
          />
        ) : (
          <IconButton
            {...{
              icon: "repeat",
              color: "green",
              size: "s",
              shape: "square",
            }}
            isInactive={
              context.emulator.state === "recording" ||
              context.emulator.state === "playing" ||
              context.emulator.command.signals.length === 0
            }
            onClick={() => play(true)}
          />
        )}

        {/* Save */}
        {context.user.isSignedIn && (
          <Button
            {...{
              size: "s",
              color: "primary",
              text: "Save",
              leftIcon: context.user.isAdmin ? "cloud_upload" : "download",
              icon: "left",
            }}
            isInactive={
              context.emulator.state === "recording" ||
              context.emulator.command.signals.length === 0
            }
            onClick={save}
          />
        )}
        <Button
          {...{
            size: "s",
            color: "outline",
            text: "Share",
            leftIcon: "share",
            icon: "left",
          }}
          isInactive={
            context.emulator.state === "recording" ||
            context.emulator.command.signals.length === 0
          }
          onClick={share}
        />
      </InnerRight>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  ${Layout.alignElements("flex", "space-between", "center")};
  padding: 0 ${Layout.SpacingX(2)};
  height: 48px;
  border-bottom: 1px solid ${Colors.borderColorLv1};
`;

const InnerLeft = styled.div`
  ${Layout.alignElements("flex", "space-between", "center")};
  ${Layout.spacingBetweenElements("horizontal", 1)};
  > * {
    ${Layout.alignElements("flex", "space-between", "center")};
  }
  > .material-icon {
    color: ${Colors.elementColorWeak};
  }
`;

const InnerRight = styled.div`
  ${Layout.alignElements("flex", "space-between", "center")};
  ${Layout.spacingBetweenElements("horizontal", 1)};
`;

const Device = styled.div`
  ${Layout.alignElements("flex", "center", "center")};
  ${Layout.spacingBetweenElements("vertical", -2)};
  flex-direction: column;
  padding-right: 8px;
  * {
    user-select: none;
  }
  .on {
    color: ${Colors.brandColorPrimary};
  }
  .off {
    color: ${Colors.brandColorSecondary};
    opacity: 0.6;
  }
`;

const Time = styled.div`
  ${Layout.alignElements("flex", "flex-start", "center")};
  ${Layout.spacingBetweenElements("horizontal", 1 / 2)};
  width: 64px;
`;
