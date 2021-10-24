import React from "react";
import styled from "styled-components";
import { CommandProps, SignalProps } from "../../../interfaces";
import Colors from "../../../styles/Colors";
import * as Layout from "../../../styles/Layout";
// Hooks
import { Context } from "../../../hooks/Provider";
import { useEmulator } from "../../../hooks/useEmulator";
// UI
import { Button } from "../../../ui/parts/Button/Button";
// Configs
import {
  ProControllerButtonNames,
  SwitchControlLibrary,
} from "../../../configs/controller";
import { IconButton } from "../../../ui/parts/Button/IconButton";
interface TheHeaderProps {
  signals: CommandProps["signals"];
}

export const CommandTable = (props: TheHeaderProps) => {
  const [context, setContext] = React.useContext(Context);
  const [flg, setFlg] = React.useState<boolean>(false);
  const [top, setTop] = React.useState<number>(window.innerHeight - 100);
  const [isResizing, setIsResizing] = React.useState<boolean>(false);
  const { save, share } = useEmulator();

  const onChange = React.useCallback(
    (
      i: number,
      target: "t" | "s1" | "s2",
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setContext((c) => {
        const signals = c.emulator.command.signals;
        signals.splice(i, 1, {
          t: target === "t" ? Number(e.target.value) : signals[i].t,
          s:
            target === "s1"
              ? new Uint8Array([Number(e.target.value), signals[i].s[1]])
              : target === "s2"
              ? new Uint8Array([signals[i].s[0], Number(e.target.value)])
              : signals[i].s,
        });
        return {
          ...c,
          emulator: {
            ...c.emulator,
            command: {
              ...c.emulator.command,
              signals: signals,
            },
          },
        };
      });
      setFlg((f) => !f);
    },
    [setContext]
  );

  const addRow = React.useCallback(
    (i: number) => {
      setContext((c) => {
        const signals = [...c.emulator.command.signals];
        if (c.emulator.command.signals.length > 0)
          signals.splice(i + 1, 0, {
            t: signals[i]?.t || 0,
            s: new Uint8Array(Array.from([99, 1])),
          });
        else signals[0] = { t: 0, s: new Uint8Array(Array.from([99, 1])) };
        return {
          ...c,
          emulator: {
            ...c.emulator,
            command: {
              ...c.emulator.command,
              signals: signals,
            },
          },
        };
      });
    },
    [setContext]
  );

  const removeRow = React.useCallback(
    (i: number) => {
      setContext((c) => {
        const signals = [...c.emulator.command.signals];
        signals.splice(i, 1);
        return {
          ...c,
          emulator: {
            ...c.emulator,
            command: {
              ...c.emulator.command,
              signals: signals,
            },
          },
        };
      });
    },
    [setContext]
  );

  const onMouseMove = React.useCallback((e: MouseEvent) => {
    setTop(e.clientY - 48);
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

  const exportFile = React.useCallback(
    (signals: SignalProps[]) => {
      let prev18 = 128;
      let prev19 = 128;
      let prev20 = 128;
      let prev21 = 128;
      let code =
        "#include <NintendoSwitchControlLibrary.h>\n\nvoid setup() {}\n\nvoid loop() {\n\n";
      const title = context.emulator.command.title
        .replace(" ", "")
        .match(/^[A-Za-z0-9]*$/)
        ? context.emulator.command.title
        : Date.now();

      signals.sort().forEach((c, i) => {
        const prev = context.emulator.command.signals.sort()[i - 1];
        if (c.s[0] === 18) prev18 = c.s[1];
        if (c.s[0] === 19) prev19 = c.s[1];
        if (c.s[0] === 20) prev20 = c.s[1];
        if (c.s[0] === 21) prev21 = c.s[1];
        code =
          code + `  delay(${((c.t - (prev?.t || 0)) * 1000).toFixed(0)});\n`;
        code =
          code +
          "  " +
          (c.s[0] === 99
            ? "\n"
            : c.s[0] < 12 || (16 <= c.s[0] && c.s[0] <= 17)
            ? `SwitchControlLibrary().${
                c.s[1] === 1 ? "press" : "release"
              }Button(Button::${SwitchControlLibrary[c.s[0]]});\n`
            : 12 <= c.s[0] && c.s[0] <= 15
            ? `SwitchControlLibrary().${
                c.s[1] === 1 ? "press" : "release"
              }HatButton(Hat::${SwitchControlLibrary[c.s[0]]});\n`
            : c.s[0] === 18
            ? `SwitchControlLibrary().moveLeftStick(${c.s[1]}, ${prev19});\n`
            : c.s[0] === 19
            ? `SwitchControlLibrary().moveLeftStick(${prev18}, ${c.s[1]});\n`
            : c.s[0] === 20
            ? `SwitchControlLibrary().moveLeftStick(${c.s[1]}, ${prev21});\n`
            : c.s[0] === 21
            ? `SwitchControlLibrary().moveLeftStick(${prev20}, ${c.s[1]});\n`
            : "");
        code = code + "  SwitchControlLibrary().sendReport();\n";
      });
      code = code + "}\n\n";

      const blob = new Blob([code], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `PhantomHand-${title}.ino`;
      link.click();
    },
    [context.emulator.command.signals, context.emulator.command.title]
  );

  return React.useMemo(() => {
    return (
      <StyledWrapper top={top}>
        <StyledBorder
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          isResizing={isResizing}
        />
        <StyledHeader>
          <div className="left">
            <span className="title fs-l fw-bold">Command Editor</span>
          </div>
          <div className="right">
            <Button
              {...{
                size: "xs",
                color: "primary",
                text: "Save",
                leftIcon: "save",
                icon: "left",
              }}
              isInactive={
                context.emulator.state === "recording" ||
                context.emulator.command.signals.length === 0
              }
              onClick={save}
            />
            <Button
              {...{
                size: "xs",
                color: "arduino",
                text: "Arduino",
                leftIcon: "get_app",
                icon: "left",
              }}
              isInactive={
                context.emulator.state === "recording" ||
                context.emulator.command.signals.length === 0
              }
              onClick={() => exportFile(context.emulator.command.signals)}
            />
            <Button
              {...{
                size: "xs",
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
          </div>
        </StyledHeader>

        <table>
          <thead>
            <tr>
              <th className="number"></th>
              <th className="time grow">Time (sec)</th>
              <th className="button grow">Button</th>
              <th className="value grow">Value</th>
              <th className="action">
                <span
                  onClick={() => exportFile(context.emulator.command.signals)}
                >
                  Export
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {context.emulator.command.signals.sort().map((c, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <input
                    type="number"
                    value={c.t}
                    onChange={(e) => onChange(i, "t", e)}
                    min="0"
                    step="0.01"
                  />
                </td>
                <td>
                  <StyledSelect>
                    <select
                      value={c.s[0] !== undefined ? c.s[0] : 99}
                      onChange={(e) => onChange(i, "s1", e)}
                    >
                      {Object.keys(ProControllerButtonNames)
                        .concat()
                        .map((key: any) => (
                          <option value={key} key={key}>
                            {ProControllerButtonNames[key]}
                          </option>
                        ))}
                    </select>
                  </StyledSelect>
                </td>
                <td>
                  {c.s[0] !== 99 ? (
                    c.s[0] < 18 ? (
                      <select
                        value={c.s[1] || 0}
                        onChange={(e) => onChange(i, "s2", e)}
                      >
                        <option value={0}>Release</option>
                        <option value={1}>Push</option>
                      </select>
                    ) : (
                      <input
                        type="number"
                        value={c.s[1]}
                        onChange={(e) => onChange(i, "s2", e)}
                        min="0"
                        max="255"
                        step={15}
                      />
                    )
                  ) : (
                    ""
                  )}
                </td>
                <td className="action">
                  <IconButton
                    size="xxs"
                    color="outline"
                    icon="remove"
                    onClick={() => removeRow(i)}
                  />
                  <IconButton
                    size="xxs"
                    color="outline"
                    icon="add"
                    onClick={() => addRow(i)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} className="add">
                <IconButton
                  size="xxs"
                  color="outlinePrimary"
                  icon="add"
                  onClick={() =>
                    addRow(context.emulator.command.signals.length)
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
        {flg}
      </StyledWrapper>
    );
  }, [
    top,
    onMouseDown,
    onMouseUp,
    isResizing,
    context.emulator.state,
    context.emulator.command.signals,
    save,
    share,
    flg,
    exportFile,
    onChange,
    removeRow,
    addRow,
  ]);
};

const StyledWrapper = styled.section.attrs<{ top: number }>((props) => ({
  style: {
    height: `${window.innerHeight - props.top}px`,
    // top: `${props.top}px`
  },
}))<{ top: number }>`
  /* position: absolute; */
  position: relative;
  min-width: 100%;
  min-height: 128px;
  border-top: 1px solid ${Colors.borderColorLv1};
  overflow-y: scroll;
  padding-bottom: 16px;
  background-color: ${Colors.bgColorLv0};
  table {
    width: 100%;
    font-size: 12px;
  }
  td,
  th {
    padding: ${Layout.spacingVH(1 / 4, 1)};
  }
  thead {
    /* border-bottom: 1px solid ${Colors.borderColorLv1}; */
  }
  th {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: ${Colors.bgColorLv0};
    white-space: nowrap;
    color: ${Colors.elementColorWeak};
    padding-top: 8px;
    &.number {
      width: 10px;
    }
    &.time {
      width: calc((100% -10px) * 0.2);
    }
    &.button {
      width: calc((100% -10px) * 0.4);
    }
    &.value {
      width: calc((100% -10px) * 0.3);
    }
    &.action {
      width: calc((100% -10px) * 0.1);
    }
  }
  tr:first-child {
    td {
      padding-top: 8px;
    }
  }
  td {
    white-space: nowrap;
    &.add {
      display: table-cell;
      text-align: center;
      padding-top: 8px;
    }
    &.action {
      ${Layout.spacingBetweenElements("horizontal", 1 / 2)};
    }
  }
  input,
  select {
    background-color: ${Colors.bgColorLv1};
    padding: ${Layout.spacingVH(1 / 4, 2)};
    min-width: 128px;
    width: 100%;
  }
  select::-ms-expand {
    display: none;
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

const StyledHeader = styled.div`
  ${Layout.alignElements("flex", "space-between", "center")};
  padding: ${Layout.spacingVH(1 / 2, 1)};
  .left,
  .right {
    ${Layout.alignElements("flex", "space-between", "center")};
    ${Layout.spacingBetweenElements("horizontal", 1)};
  }
  .title {
    font-weight: 600;
  }
`;

const StyledSelect = styled.div`
  position: relative;
  &::after {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4.5px solid ${Colors.elementColorWeak};
    content: "";
    position: absolute;
    right: 9px;
    top: calc(50% - 2.5px);
    width: 0;
  }
`;

const StyledBorder = styled.div.attrs<{ isResizing: boolean }>((props) => ({
  style: {
    backgroundColor: `${
      props.isResizing ? Colors.borderColorLv1 : "transparent"
    }`,
  },
}))<{ isResizing: boolean }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 4px;
  user-select: none;
  z-index: 10;
  &:hover {
    background-color: ${Colors.borderColorLv2} !important;
    cursor: row-resize;
  }
`;
