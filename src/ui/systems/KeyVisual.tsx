import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GitHubButton } from "../parts/Button/GitHubButton";
import { Button } from "../parts/Button/Button";

import logo from "../../assets/logo.png";

import { Colors } from "../../styles/Colors";
import { alignElements, spacingBetweenElements } from "../../styles/Layout";

interface KeyVisualProps {
  title: string;
  text: string;
}

const KeyVisual = (props: KeyVisualProps) => {
  return (
    <Main>
      <Logo />
      <h1>{props.title}</h1>
      <p>{props.text}</p>
      <Link to="/projects">
        <Button
          color="primary"
          text="Start"
          icon="none"
          size="m"
          width={128}
        />
      </Link>
      <GitHubButton url="https://github.com/noov-smash/PhantomHand" />
      <a href="https://twitter.com/intent/user?user_id=1295277787293446145" target="_blank" rel="noreferrer">©︎ NOOV</a>
    </Main>
  );
};

const Main = styled.section`
  margin-top: 60px;
  height: 640px;
  background: ${Colors.bgGrad};
  text-align: center;
  ${alignElements("flex", "center", "center")};
  ${spacingBetweenElements("vertical", 2)};
  flex-direction: column;
  h1 {
    font-weight: 600;
    font-size: 36px;
  }
  p {
    white-space: pre-wrap;
    padding-bottom: 24px;
  }
`;

const Logo = styled.span`
  display: block;
  width: 84px;
  height: 84px;
  background: url(${logo}) no-repeat center/contain;
`;

export default KeyVisual;
