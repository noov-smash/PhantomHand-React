import React from "react";
import uid from "uniqid";
import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import * as Colors from "../../../styles/Colors";
import * as Effects from "../../../styles/Effects";
import Dropdown, { DropdownProps } from "../../parts/Combo/Dropdown";

export type DropdownListProps = DropdownProps[];

export const DropdownList = (props: DropdownListProps) => (
  <StyledDropdown className="dropdown-list-container">
    {Object.keys(props).map((k: any) => (
      <Dropdown {...props[k]} key={uid()} />
    ))}
  </StyledDropdown>
);

export default DropdownList;

const StyledDropdown = styled.ul`
  ${Layout.alignElements("inline-flex", "flex-start", "stretch")};
  flex-direction: column;
  background-color: ${Colors.Colors.bgColorLv0};
  border: 1px solid ${Colors.Colors.borderColorLv1};
  ${Layout.roundX(1 / 2)};
  box-shadow: ${Effects.Shadow.float};
  max-height: 380px;
  z-index: 100;
  visibility: visible;
`;
