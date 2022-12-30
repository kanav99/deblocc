import * as React from "react";
import { defaultTheme } from "./theme";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    height?: string;
    width?: string;
    header?: string;
    flex?: boolean;
}

const cardStyle : React.CSSProperties = {
    border: '1px solid gray',
    padding: '10px',
    marginTop: '4px',
    borderRadius: '5px',
    display: 'flex',
    overflowY: 'auto',
}

const cardHeaderStyle: React.CSSProperties = {
    position: 'absolute',
    marginTop: '-20px',
    backgroundColor: defaultTheme.color.background,
    padding: '0px 5px',
    fontFamily: 'monospace'
}

export const Card: React.FC<CardProps> = ({ header, children, style, flex, ...props }) => {
    const additionalStyle = flex ? {flexGrow: 1} : {};
    return <div style={{...cardStyle, ...style, ...additionalStyle}} {...props}>
        <div style={cardHeaderStyle}>{header}</div>
        {children}
    </div>;
}
