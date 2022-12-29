import * as React from "react";
import { defaultTheme } from "./theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  flex? : boolean;
}

const buttonStyle = {
    padding: '8px',
    fontFamily: defaultTheme.font.family,
    fontSize: '12px',
    backgroundColor: 'white',
}

export const Button: React.FC<ButtonProps> = ({ title, flex, ...props }) => {
  const additionalStyle = flex ? {flexGrow: 1} : {};
  return (
    <button style={{...buttonStyle, ...additionalStyle}} {...props}>
      {title}
    </button>
  );
};
