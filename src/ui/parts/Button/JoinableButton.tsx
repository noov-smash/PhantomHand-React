import React from "react";
import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import * as Colors from "../../../styles/Colors";
export interface JoinableButtonProps {
  icon: string;
  color: "primary" | "secondary" | "tertiary" | "destructive" | "ghost";
  position: "left" | "center" | "right";
}

export const JoinableButton = (props: JoinableButtonProps) => (
  <Button
    className={`
    button-joinable--${props.color}
    button-joinable--${props.position}
    material-icon
  `}
  >
    {props.icon}
  </Button>
);

JoinableButton.defaultProps = {
  color: "primary",
  position: "left",
  icon: "edit",
};

const Button = styled.button`
  ${Layout.alignElements("inline-flex", "center", "center")};
  ${Colors.seElementColors()};
  ${Layout.roundX(1 / 2)};
  white-space: nowrap;
  height: 32px;
  padding: ${Layout.spacingVH(1 / 2, 1 / 4)};
  justify-content: center;
  color: ${Colors.Colors.elementColorInverse};
`;
