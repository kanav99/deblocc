import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    height?: string;
    width?: string;
    header?: string;
}

const cardStyle : React.CSSProperties = {
    border: '1px solid gray',
    padding: '10px',
    marginTop: '4px',
    borderRadius: '5px',
    display: 'flex',
}

const cardHeaderStyle: React.CSSProperties = {
    position: 'absolute',
    marginTop: '-20px',
    backgroundColor: '#dfdfdf',
    padding: '0px 5px',
    fontFamily: 'monospace'
}

export const Card: React.FC<CardProps> = ({ header, children, style, ...props }) => {
    return <div style={{...cardStyle, ...style}}>
        <div style={cardHeaderStyle}>{header}</div>
        {children}
    </div>;
}
