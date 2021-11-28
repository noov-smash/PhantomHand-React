import React from "react";
// Hooks
import { Context } from "../../../hooks/Provider";
// Styles
import styled from "styled-components";
// import * as Layout from "../../../styles/Layout";
// import { Colors } from "../../../styles/Colors";

export const Screen: React.FC = () => {
  const [context] = React.useContext(Context);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!context.media.stream) return;
    videoRef.current!.srcObject = context.media.stream;
  }, [context.media.stream]);

  return (
    <Wrapper ref={divRef}>
      <StyledVideo
        ref={videoRef}
        rect={divRef.current?.getBoundingClientRect()}
        autoPlay
        playsInline
        muted
        // controls
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* position: absolute; */
  display: grid;
  place-items: center;
  position: relative;
  width: 75%;
  height: 100%;
`;

const StyledVideo = styled.video<{ rect?: DOMRect }>`
  /* position: absolute; */
  width: 100%;
  /* width: ${(props) =>
    props.rect ? `${(props.rect.height * 16) / 9}px` : `auto`}; */
  height: ${(props) =>
    props.rect ? `${(props.rect.width * 9) / 16}px` : `auto`};
  /* height: 100%; */
`;
