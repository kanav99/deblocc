import * as React from "react";
import { HStack } from "./hstack";
import { VStack } from "./vstack";

interface CodeProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string | React.ReactNode[];
}

// const codeFont = 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace';
const codeFont = 'monospace';

const codeStyle : React.CSSProperties = {
    fontFamily: codeFont,
    fontSize: "13px",
}

const lineNumberStyle : React.CSSProperties = {
    fontFamily:  codeFont, //'"Fira code", "Fira Mono", monospace',
    fontWeight: "lighter",
    fontSize: "13px",
    width: '30px',
    // borderRight: '1px solid gray',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '5px',
    backgroundColor: '#f5f5f5',
    color: '#6c6c6c',
    userSelect: 'none',
}

const containerStyle: React.CSSProperties = {
    backgroundColor: "white",
    // border: '1px solid gray',
    overflow: 'scroll',
}

const lineContainerStyle: React.CSSProperties = {
    height: '15px',
    // border: '1px solid gray',
}

export const Code : React.FC<CodeProps> = ({ value, ...props}) => {
    let lines : React.ReactNode[] | string[] = [];
    if (typeof value === 'string') {
        lines = value.split('\n');
    } else {
        lines = value;
    }
    const numLines = lines.length;
    return (
        <VStack spacing="0px" style={containerStyle} flex>
            {lines.map((line, index) => <HStack style={lineContainerStyle}>
                <div style={lineNumberStyle}>{index + 1}</div>
                <div style={codeStyle}>{line}</div>
            </HStack>)}
            <HStack style={lineContainerStyle}>
                <div style={lineNumberStyle}>{numLines + 1}</div>
                <div style={codeStyle}></div>
            </HStack>
        </VStack>
    )
}
