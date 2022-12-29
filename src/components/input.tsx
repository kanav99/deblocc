import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  flex? : boolean;
  placeholder?: string;
}

const inputStyle = {
    padding: '3px',
    fontFamily: 'Monospace',
    fontSize: '12px',
}

export const Input: React.FC<InputProps> = ({ flex, placeholder, ...props }) => {
  if (flex) {
    return (
      <input style={{...inputStyle, flexGrow: 1}} {...props} placeholder={placeholder}/>
    );
  }
  return (
    <input style={inputStyle} {...props} placeholder={placeholder}/>
  );
};
