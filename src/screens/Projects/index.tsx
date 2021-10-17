import React from "react";
import { Link } from "react-router-dom";
// Hooks
import { Context } from "../../hooks/Provider";
import { useDatabase } from "../../hooks/useDatabase";
// Styles
import styled from "styled-components";
import * as Layout from "../../styles/Layout";
import * as Animation from "../../styles/Animations";
// Components
import { TheHeader } from "../../ui/systems/Navigation/TheHeader";
import { TextWithIcon } from "../../ui/parts/Text/TextWithIcon";
// Interfaces
import { FirebaseProjectProps } from "../../interfaces";

export const Projects = () => {
  const [projects, setProjects] = React.useState<FirebaseProjectProps[]>();
  const [, setContext] = React.useContext(Context);
  const { fetchProjects } = useDatabase();

  const init = React.useCallback(async () => {
    setContext((c) => ({ ...c, project: { isLoaded: false } }));
    const fetchedProjects = await fetchProjects();
    setProjects(fetchedProjects);
  }, [fetchProjects, setContext]);

  React.useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <TheHeader
        title="PhantomHand"
        buttonUrl="https://github.com/noov-smash/PhantomHand"
      />
      <StyledProjects>
        {projects &&
          projects.map((p) => (
            <StyledProject to={`projects/${p.id}`} key={p.id}>
              <StyledProjectImage>
                <img src={p.imageUrl} alt={p.name} />
              </StyledProjectImage>
              <TextWithIcon text={p.name} fontSize="m" icon="sports_esports" />
            </StyledProject>
          ))}
      </StyledProjects>
    </>
  );
};

const StyledProjects = styled.div`
  ${Layout.alignElements("flex", "flex-start", "stretch")};
  ${Layout.spacingBetweenElements("vertical", 2)};
  ${Layout.spacingBetweenElements("horizontal", 4)};
  flex-wrap: wrap;
  padding: ${Layout.SpacingX(2)};
  display: flex;
  margin-top: 60px;
`;

const StyledProject = styled(Link)`
  ${Layout.alignElements("flex", "flex-start", "flex-start")};
  flex-direction: column;
  width: calc(100vw / 4 - 24px);
`;

const StyledProjectImage = styled.div`
  ${Layout.fixRatio(9 / 16)};
  ${Layout.roundX(1 / 2)};
  display: block;
  width: 100%;
  img {
    position: absolute;
    object-fit: cover;
    object-position: center;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    ${Animation.ZoomIn};
  }
`;
