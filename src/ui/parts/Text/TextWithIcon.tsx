import styled from "styled-components";
import * as Layout from "../../../styles/Layout";
import * as Colors from "../../../styles/Colors";

export interface TextWithIconProps {
  fontSize: "xs" | "s" | "m" | "l" | "h3" | "h2" | "h1";
  color: "default" | "weak" | "error" | "success" | "info";
  text: string;
  icon?: string;
}

export const TextWithIcon = (props: TextWithIconProps) => (
  <Wrapper
    className={`
      text-with-icon
      text-with-icon--${props.color}
  `}
  >
    {props.icon && (
      <span
        className={`
          material-icon
          fs-${props.fontSize}
          text-with-icon__icon
      `}
      >
        {props.icon}
      </span>
    )}
    <span
      className={`
        fs-${props.fontSize}
        text-with-icon__text
    `}
    >
      {props.text}
    </span>
  </Wrapper>
);

TextWithIcon.defaultProps = {
  color: "default",
  text: "テキスト",
  icon: "edit",
  fontSize: "h3",
};

const Wrapper = styled.span`
  display: inline;
  color: ${Colors.Colors.elementColorDefault};
  ${Layout.alignElements("inline-flex", "flex-start", "center")};
  ${Layout.spacingBetweenElements("horizontal", 1 / 2)};
  ${Colors.setBgColors()};
  &--weak {
    color: ${Colors.Colors.elementColorWeak};
  }
  &--info {
    color: ${Colors.Colors.statusColorInfo};
  }
  &--error {
    color: ${Colors.Colors.statusColorError};
  }
  &--success {
    color: ${Colors.Colors.statusColorSuccess};
  }
  &__icon {
    padding-right: ${Layout.SpacingX(0.5)};
  }
  &__text {
    white-space: pre-wrap;
  }
`;
