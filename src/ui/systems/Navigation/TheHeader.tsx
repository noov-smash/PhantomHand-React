import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Colors from "../../../styles/Colors";
import { alignElements } from "../../../styles/Layout";

import logo from "../../../assets/logo.png";
import GitHubButton from "../../parts/Button/GitHubButton";

interface TheHeaderProps {
  title: string;
  buttonUrl: string;
}

export const TheHeader = (props: TheHeaderProps) => {
  return (
    <Header>
      <Logo to="/">{props.title}</Logo>
      <GitHubButton url={props.buttonUrl} />
    </Header>
  );
};

const Header = styled.header`
  position: fixed;
  z-index: 10;
  top: 0;
  height: 60px;
  width: 100vw;
  padding: 0 16px;
  ${alignElements("flex", "space-between", "center")};
  background: white;
  border-bottom: 1px solid ${Colors.borderColorLv1};
`;

interface LogoProps {
  logo?: string;
}
const Logo = styled(Link)<LogoProps>`
  font-weight: 600;
  padding-left: 40px;
  height: 30px;
  position: relative;
  line-height: 30px;
  font-size: 24px;
  color: ${Colors.brandColorPrimary};
  &::before {
    content: "";
    position: absolute;
    left: 0;
    height: 30px;
    width: 30px;
    background: url(${logo}) no-repeat left center / contain;
  }
`;

export default TheHeader;
