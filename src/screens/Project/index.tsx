import React from "react";
import ReactTooltip from "react-tooltip";
import { RouteComponentProps, Redirect, useLocation } from "react-router-dom";
import queryString from "query-string";
import rison from "rison";
// Hooks
import { useDatabase } from "../../hooks/useDatabase";
import { Context } from "../../hooks/Provider";
import { SignalProps } from "../../interfaces";
// Components
import { SideMenu } from "./components/SideMenu";
import { ProjectHeader } from "./components/ProjectHeader";
import { Viewer } from "./components/Viewer";
// Styles
import styled from "styled-components";

type PageProps = {} & RouteComponentProps<{ id: string }>;

export const Project: React.FC<PageProps> = (props) => {
  const [context, setContext] = React.useContext(Context);
  const { fetchProject } = useDatabase();
  const search = useLocation().search;

  const init = React.useCallback(async () => {
    try {
      setContext((c) => ({ ...c, app: { isLoading: true } }));
      const projectId = props.match.params.id;
      await fetchProject(projectId, context.user.isAdmin);

      const queryData = queryString.parse(search).data;
      if (queryData && typeof queryData === "string") {
        const decoded: SignalProps[] = rison.decode(queryData);
        decoded &&
          setContext((c) => ({
            ...c,
            emulator: {
              ...c.emulator,
              command: {
                ...c.emulator.command,
                signals: decoded,
              },
            },
          }));
      }

      setContext((c) => ({ ...c, app: { isLoading: false } }));
    } catch (error) {
      console.error(error);
    }
  }, [
    context.user.isAdmin,
    fetchProject,
    props.match.params.id,
    search,
    setContext,
  ]);

  React.useEffect(() => {
    init();
  }, [init]);

  return React.useMemo(() => {
    if (!context.app.isLoading) {
      if (context.project.isLoaded && context.project.publicData) {
        return (
          <StyledDiv>
            <SideMenu
              index={{
                id: context.project.id,
                title: context.project.name,
                imageUrl: context.project.imageUrl,
              }}
              publicData={context.project.publicData}
              privateData={context.project.privateData}
            />
            <StyledMain>
              <ProjectHeader />
              <StyledSection>
                <Viewer />
              </StyledSection>
            </StyledMain>
            <ReactTooltip effect="solid" />
          </StyledDiv>
        );
      } else return <></>;
    } else if (!context.app.isLoading && context.project.isLoaded) {
      return <Redirect to="/projects" />;
    } else return <></>;
  }, [
    context.app.isLoading,
    context.project.id,
    context.project.imageUrl,
    context.project.isLoaded,
    context.project.name,
    context.project.privateData,
    context.project.publicData,
  ]);
};

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  height: 100vh;
  background: $bgColorLv0;
`;

const StyledMain = styled.main`
  height: 100vh;
`;

const StyledSection = styled.section`
  height: calc(100vh - 48px);
`;
