import React from "react";
import styled from "styled-components";
import { Colors } from "../../../styles/Colors";
import * as Layout from "../../../styles/Layout";

export interface TextInputProps {
  state: "default" | "error";
  icon: "none" | "left" | "right" | "both";
  required?: boolean;
  inputType: "text" | "number";
  leftIcon?: string;
  value: string | number;
  onClickOutside?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = (props: TextInputProps) => {
  const [text, setText] = React.useState(props.value);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    inputRef.current?.select();
  }, [inputRef]);

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onPressEnter = (e: any) => {
    if (e.key === "Enter" && props.onClickOutside) {
      props.onClickOutside(e);
    }
  };

  return (
    <StyledInput className="input-text">
      <input
        type={props.inputType}
        required={props.required}
        placeholder="Type Here..."
        value={text}
        onChange={changeText}
        onBlur={props.onClickOutside}
        onKeyPress={(e) => onPressEnter(e)}
        ref={inputRef}
      />
    </StyledInput>
  );
};

export default TextInput;

const StyledInput = styled.span`
  ${Layout.alignElements("flex", "flex-start", "center")};
  ${Layout.roundX(1 / 2)};
  padding: ${Layout.spacingVH(0, 1 / 2)};
  height: 32px;
  width: 100%;
  position: relative;
  background-color: ${Colors.elementColorDefault};
  input {
    width: 100%;
    height: 100%;
    color: ${Colors.elementColorInverse};
    font: 12px;
  }
`;
