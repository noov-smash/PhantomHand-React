import { css } from "styled-components";

export const Shaping = {
  radius: "8px",
};

export const Spacing = {
  default: "8px",
};

export const Lettering = {
  lineHeight: 1.6,
  letterSpacing: "2%",
};

export const Sizing = {
  headerHeight: "48px",
};

export const SpacingX = (x: number) => `${parseInt(Spacing.default) * x}px`;

export const spacingVH = (v: number, h: number) => {
  return `${parseInt(Spacing.default) * v}px ${
    parseInt(Spacing.default) * h
  }px `;
};
spacingVH.defaultProps = {
  v: 1,
  h: 1,
};

export const radiusX = (x: number) => {
  return `${parseInt(Shaping.radius) * x}px`;
};
radiusX.defaultProps = {
  x: 1,
};

export const roundX = (x: number) => {
  return css`
    border-radius: ${parseInt(Shaping.radius) * x}px;
  `;
};
roundX.defaultProps = {
  x: parseInt(Shaping.radius),
};

export const roundRightX = (x: number) => {
  return css`
    border-radius: 0 ${x} ${x} 0;
  `;
};
roundRightX.defaultProps = {
  x: parseInt(Shaping.radius),
};

export const roundLeftX = (x: number) => {
  return css`
    border-radius: ${x} 0 0 ${x};
  `;
};
roundLeftX.defaultProps = {
  x: parseInt(Shaping.radius),
};

export const fixRatio = (ratio: number) => {
  const size = `calc(100% * ${ratio})`;
  return css`
    position: relative;
    overflow: hidden;
    &::before {
      content: "";
      display: block;
      top: 0;
      padding-top: ${size};
    }
  `;
};
fixRatio.defaultProps = {
  ratio: 3 / 4,
};

export const alignElements = (
  display: "flex" | "inline-flex" | "none",
  justify:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "stretch",
  align:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "stretch"
) => {
  return css`
    display: ${display};
    justify-content: ${justify};
    align-items: ${align};
  `;
};
alignElements.defaultProps = {
  display: "flex",
  justify: "space-between",
  align: "center",
};

export const centralizeInnerElement = css`
  display: grid;
  place-items: center;
`;

export const spacingBetweenElements = (
  direction: "horizontal" | "vertical",
  x: number
) =>
  direction === "vertical"
    ? css`
        > * {
          margin-bottom: ${parseInt(Spacing.default) * x}px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      `
    : css`
        > * {
          margin-right: ${parseInt(Spacing.default) * x}px;
          &:last-child {
            margin-right: 0;
          }
        }
      `;
spacingBetweenElements.defaultProps = {
  direction: "horizontal",
  x: 1,
};
