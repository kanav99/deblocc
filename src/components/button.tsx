import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  flex? : boolean;
}

const buttonStyle = {
    padding: '8px',
    fontFamily: 'Monospace',
    fontSize: '12px',
    backgroundColor: 'white',
}

export const Button: React.FC<ButtonProps> = ({ title, flex, ...props }) => {
  if (flex) {
    return (
      <button style={{...buttonStyle, flexGrow: 1}} {...props}>
        {title}
      </button>
    );
  }
  return (
    <button style={buttonStyle} {...props}>
      {title}
    </button>
  );
};
