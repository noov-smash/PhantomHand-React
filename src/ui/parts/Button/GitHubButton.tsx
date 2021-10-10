import React from "react";
import styled from "styled-components";
import githubButton from "../../../assets/view_on_github.png";

interface GitHubButtonProps {
  url: string;
}

export const GitHubButton = (props: GitHubButtonProps) => {
  return <Button href={props.url} target="_blank" />;
};

const Button = styled.a`
  width: 128px;
  height: 40px;
  background: url(${githubButton}) no-repeat left center / contain;
  object-fit: cover;
  object-position: center;
`;

export default GitHubButton;
