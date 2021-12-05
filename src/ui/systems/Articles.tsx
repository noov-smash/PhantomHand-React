import React from "react";
// Styled
import styled from "styled-components";
import Colors from "../../styles/Colors";
import * as Layout from "../../styles/Layout";

interface ArticlesProps {
  data: any;
}

export const Articles = (props: ArticlesProps) => {
  const [lang, setLang] = React.useState<"jp" | "en">("jp");
  return (
    <StyledWrapper>
      {console.log(props.data)}
      <StyledTabs>
        <StyledTab
          onClick={() => setLang("jp")}
          className={lang === "jp" ? "active" : "inactive"}
        >
          日本語
        </StyledTab>
        <StyledTab
          onClick={() => setLang("en")}
          className={lang === "en" ? "active" : "inactive"}
        >
          English
        </StyledTab>
      </StyledTabs>
      <StyledInner>
        {props.data.map((d: any) => (
          <Article key={d.id}>
            <h2 className="title">
              {lang === "jp" && d.title_jp}
              {lang === "en" && d.title_en}
            </h2>
            {d.contents &&
              d.contents.map((c: any) => (
                <Content>
                  {c.title_jp && lang === "jp" && (
                    <h3 className="small-title">{c.title_jp}</h3>
                  )}
                  {c.title_en && lang === "en" && (
                    <h3 className="small-title">{c.title_en}</h3>
                  )}
                  {c.image && (
                    <img src={c.image.url} alt={c.id} className="img" />
                  )}
                  {c.body_jp && lang === "jp" && (
                    <div
                      className="body"
                      dangerouslySetInnerHTML={{ __html: `${c.body_jp}` }}
                    />
                  )}
                  {c.body_en && lang === "en" && (
                    <div
                      className="body"
                      dangerouslySetInnerHTML={{ __html: `${c.body_en}` }}
                    />
                  )}
                </Content>
              ))}
          </Article>
        ))}
      </StyledInner>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section`
  border-top: 1px solid ${Colors.borderColorLv1};
  padding: 40px;
`;

const StyledInner = styled.div`
  max-width: 640px;
  margin: auto;
  padding-top: 40px;
`;

const StyledTabs = styled.ul`
  ${Layout.alignElements("flex", "center", "center")};
  ${Layout.spacingBetweenElements("horizontal", 2)};
`;

const StyledTab = styled.li`
  ${Layout.alignElements("flex", "center", "center")};
  height: 100%;
  &.inactive {
    color: ${Colors.elementColorWeak};
  }
  &:hover {
    cursor: pointer;
    color: ${Colors.elementColorDefault};
  }
  &.active {
    color: ${Colors.brandColorPrimary};
    font-weight: bold;
  }
`;

const Article = styled.article`
  ${Layout.spacingBetweenElements("vertical", 6)};
  padding-bottom: 80px;
  border-bottom: 1px solid ${Colors.borderColorLv1};
  .title {
    font-size: 22px;
    font-weight: 600;
    border-left: 4px solid ${Colors.brandColorPrimary};
    padding-left: 16px;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const Content = styled.div`
  ${Layout.spacingBetweenElements("vertical", 2)};
  .img {
    width: 100%;
  }
  .small-title {
    font-size: 18px;
    font-weight: 600;
  }
  .body {
    li {
      list-style: disc;
      list-style-position: inside;
    }
  }
`;
