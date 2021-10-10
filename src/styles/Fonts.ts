// Fonts
import "typeface-poppins";

export const FontFamily =
  " 'Poppins', 'poppins, M PLUS 1p', 'Noto Sans CJK JP',  游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴシック Pro', 'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif";

interface FontWeightType {
  [key: string]: number;
}
export const FontWeight: FontWeightType = {
  default: 400,
  regular: 400,
  bold: 600,
};

interface FontSizeType {
  [key: string]: string;
}
export const FontSize: FontSizeType = {
  default: "14px",
  h1: "32px",
  h2: "28px",
  h3: "24px",
  xs: "10px",
  s: "12px",
  m: "14px",
  l: "16px",
  xl: "18px",
};

export const IconFamily: string = "Material Icons";

interface IconSizeType {
  [key: string]: string;
}
export const IconSize: IconSizeType = {
  default: "20px",
  h1: "36px",
  h2: "32px",
  h3: "28px",
  xs: "12px",
  s: "16px",
  m: "20px",
  l: "24px",
  xl: "26px",
};
