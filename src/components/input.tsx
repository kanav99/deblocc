import * as React from "react";
import { defaultTheme } from "./theme";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  flex? : boolean;
  placeholder?: string;
}

const inputStyle = {
    padding: '10px',
    fontFamily: defaultTheme.font.family,
    fontSize: '12px',
    // border: '1px solid gray',
}

export const Input: React.FC<InputProps> = ({ flex, placeholder, ...props }) => {
  const additionalStyle = flex ? {flexGrow: 1} : {};
  return (
    <input style={{...inputStyle, ...additionalStyle}} {...props} placeholder={placeholder}/>
  );
};
