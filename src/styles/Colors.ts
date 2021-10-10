import { css } from "styled-components";

export const Colors = {
  // brand
  brandColorPrimary: "#9B51E0",
  brandColorSecondary: "#8f9295",
  brandColorTertiary: "#efefef",
  brandColorDestructive: "#fc4c80",
  // status
  statusColorSuccess: "#5cc689",
  statusColorSuccessWeak: "#f2faf6",
  statusColorInfo: "#2b1e70",
  statusColorError: "#ec5c5c",
  statusColorErrorWeak: "#fff5f9",
  statusColorNotification: "#ec5c5c",
  // element
  elementColorDefault: "#464646",
  elementColorWeak: "#878682",
  elementColorMute: "#e8e7e7",
  elementColorInverse: "#ffffff",
  elementColorLink: "#0088c5",
  elementColorHighlight: "#f9edd5",
  // border
  borderColorLv1: "#dfdfde",
  borderColorLv2: "#d8d7d4",
  borderColorLv3: "#aaa9a5",
  // background
  bgColorLv0: "#ffffff",
  bgColorLv1: "#f7f6f3",
  bgColorLv2: "#e8e7e4",
  bgColorLv3: "#cdccca",
  bgGrad: "linear-gradient(180deg, #EEE7FF 0%, rgba(255, 255, 255, 0) 100%)",
  // sns
  twitter: "#00acee",
  facebook: "#1877f2",
  google: "#DB4437",
};

export const setBgColors = () => css`
  &.primary {
    color: ${Colors.elementColorInverse};
    background: ${Colors.brandColorPrimary};
  }
  &.secondary {
    color: ${Colors.elementColorInverse};
    background: ${Colors.brandColorSecondary};
  }
  &.tertiary {
    color: ${Colors.elementColorDefault};
    background: ${Colors.brandColorTertiary};
  }
  &.destructive {
    color: ${Colors.elementColorInverse};
    background: ${Colors.brandColorDestructive};
  }
  &.outline {
    color: ${Colors.elementColorWeak};
    border: 1px solid ${Colors.borderColorLv1};
  }
  &.outlinePrimary {
    color: ${Colors.brandColorPrimary};
    border: 1px solid ${Colors.brandColorPrimary};
  }
  &.ghost {
    color: ${Colors.elementColorWeak};
    padding: 0;
  }
  &.red {
    color: ${Colors.elementColorInverse};
    background-color: #ed1a1a;
  }
  &.orange {
    color: ${Colors.elementColorInverse};
    background-color: #ffaa2c;
  }
  &.green {
    color: ${Colors.elementColorInverse};
    background-color: #05a128;
  }
  &.blue {
    color: ${Colors.elementColorInverse};
    background-color: #296fd7;
  }
`;

export const seElementColors = () => css`
  &.primary {
    color: ${Colors.brandColorPrimary};
  }
  &.secondary {
    color: ${Colors.brandColorSecondary};
  }
  &.tertiary {
    color: ${Colors.brandColorTertiary};
  }
  &.destructive {
    color: ${Colors.brandColorDestructive};
  }
`;

export const setHoverStyle = (alpha?: number) => {
  return css`
    &:hover {
      opacity: ${alpha || 0.8};
      cursor: pointer;
    }
  `;
};

export default Colors;
