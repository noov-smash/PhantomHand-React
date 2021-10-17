import { Link } from "react-router-dom";
// Styles
import styled from "styled-components";
import Colors from "../styles/Colors";
import { Button } from "../ui/parts/Button/Button";

export const NotFoundScreen = () => {
  return (
    <Main>
      <div>
        <h1>404 Not Found</h1>
        <p>ページが見つかりません</p>
        <Link to="/projects">
          <Button color="primary" text="Top" icon="none" size="m" width={128} />
        </Link>
      </div>
    </Main>
  );
};

const Main = styled.section`
  height: 100vh;
  background: ${Colors.brandColorTertiary};
  text-align: center;
  display: grid;
  place-items: center;
  > div {
    h1 {
      font-weight: 600;
      font-size: 36px;
    }
    p {
      padding: 20px 0;
      white-space: pre-wrap;
    }
  }
`;
