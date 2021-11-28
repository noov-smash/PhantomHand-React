import React from "react";
// Hooks
import { Context } from "../../../hooks/Provider";
// Styles
import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import { Colors } from "../../../styles/Colors";
// Components
import { Screen } from "./Screen";
import { GamePad } from "./GamePad";
import { CommandTable } from "./CommandTable";

export const Viewer: React.FC = () => {
  const [context] = React.useContext(Context);

  return React.useMemo(() => {
    return (
      <Wrapper>
        <PreviewWrapper>
          {context.media.stream && <Screen />}
          <GamePad />
        </PreviewWrapper>

        <CommandTable signals={context.emulator.command.signals} />
      </Wrapper>
    );
  }, [context.emulator.command, context.media.stream]);
};

const Wrapper = styled.div`
  ${Layout.alignElements("inline-flex", "space-between", "space-between")};
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`;

const PreviewWrapper = styled.div`
  ${Layout.alignElements("inline-flex", "space-between", "space-between")};
  /* flex-direction: column; */
  position: relative;
  width: 100%;
  height: 100%;
  /* background-color: ${Colors.bgColorLv0}; */
  /* background-color: rgba(255, 255, 255, .75); */
`;
