import { createGlobalStyle, css } from "styled-components";
import { Reset } from "./Reset";
import { Colors } from "./Colors";
import { Lettering } from "./Layout";
import {
  FontFamily,
  FontSize,
  FontWeight,
  IconFamily,
  IconSize,
} from "./Fonts";

const createFontSizeClasses = Object.keys(FontSize).map(
  (key) => css`
    .fs-${key} {
      font-size: ${FontSize[key]};
    }
  `
);

const createFontWeightClasses = Object.keys(FontWeight).map(
  (key) => css`
    .fw-${key} {
      font-weight: ${FontWeight[key]};
    }
  `
);

const createIconSizeClasses = Object.keys(IconSize).map(
  (key) => css`
    &.fs-${key} {
      font-size: ${IconSize[key]};
    }
  `
);

export default createGlobalStyle`
    ${Reset};
    :root {
        // font
        font-family: ${FontFamily};
        font-size: ${FontSize.default};
        font-weight: ${FontWeight.default};
        // lettering
        line-height: ${Lettering.lineHeight};
        letter-spacing: ${Lettering.letterSpacing};
        // coloring
        color: ${Colors.elementColorDefault};
        background-color: ${Colors.bgColorLv0};
    }

    /* Font Size */
    ${createFontSizeClasses}

    /* Font Weight */
    .fs-h1,
    .fs-h2,
    .fs-h3 {
        font-weight: ${FontWeight.bold};
    };
    ${createFontWeightClasses}

    .material-icon {
        font-family: ${IconFamily};
        font-size: ${IconSize.default};
        font-style: normal;
        ${createIconSizeClasses};
    };

`;
