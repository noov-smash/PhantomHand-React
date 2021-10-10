import React from "react";
import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import ImagePath from "../../../assets/masterhand.png";

export const NoConnection: React.FC = (props) => {
  return (
    <Wrapper>
      <Image src={ImagePath} alt="MasterHand" />
      <b>
        <span className="material-icon">info</span>Waiting for Connection
      </b>
      <span>
        Please connect "<b>NintendoSwitch Pro Controller</b>" via Bluetooth,
        <br />
        and press any button.
      </span>
    </Wrapper>
  );
};

export default NoConnection;

const Wrapper = styled.main`
  ${Layout.alignElements("flex", "center", "center")};
  ${Layout.spacingBetweenElements("vertical", 1)};
  flex-direction: column;
  text-align: center;
  height: 100%;
  > b {
    font-size: 22px;
    font-weight: bold;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    > span {
      margin-right: 8px;
    }
  }
  > span {
    > b {
      font-weight: bold;
    }
  }
`;

const Image = styled.img`
  padding-bottom: 24px;
`;
