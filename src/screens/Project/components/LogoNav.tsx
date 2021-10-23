import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import { Colors } from "../../../styles/Colors";
import {
  IconButton,
  IconButtonProps,
} from "../../../ui/parts/Button/IconButton";

export interface LogoNavProps {
  id: string;
  title: string;
  imageUrl: string;
  button: IconButtonProps;
}

export const LogoNav = (props: LogoNavProps) => {
  return (
    <Wrapper>
      <Left to={`/projects/${props.id}`}>
        <Thumbnail src={props.imageUrl} />
        <Title>{props.title}</Title>
      </Left>
      <Link to="/projects">
        <IconButton {...props.button} />
      </Link>
    </Wrapper>
  );
};

LogoNav.defaultProps = {
  button: {
    ...IconButton.defaultProps,
    shape: "square",
    size: "xs",
    color: "ghost",
    icon: "apps",
  },
  imageUrl: "",
  title: "",
};

const Wrapper = styled.div`
  ${Layout.alignElements("inline-flex", "space-between", "center")};
  width: 100%;
  height: 48px;
  padding: ${Layout.spacingVH(0, 1)};
  border-bottom: 1px solid ${Colors.borderColorLv1};
`;

const Left = styled(Link)`
  ${Layout.alignElements("inline-flex", "space-between", "center")};
  width: calc(100% - 24px);
`;

const Thumbnail = styled.img`
  width: 28px;
  height: 28px;
  object-fit: cover;
  object-position: center;
  border-radius: 2px;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 8px;
`;
