import * as React from "react";
import { HStack } from "./hstack";
import { VStack } from "./vstack";

interface CodeProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string | React.ReactNode[];
    selectColor?: string;
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
    minWidth: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '5px',
    backgroundColor: '#f5f5f5',
    color: '#6c6c6c',
    userSelect: 'none',
}

const containerStyle: React.CSSProperties = {
    backgroundColor: "white",
}

const lineContainerStyle: React.CSSProperties = {
    height: '15px',
    overflowY: 'visible'
}

export const Code : React.FC<CodeProps> = ({ value, selectColor, ...props}) => {
    let lines : React.ReactNode[] | string[] = [];
    if (typeof value === 'string') {
        lines = value.split('\n');
    } else {
        lines = value;
    }
    const [selectedLine, setSelectedLine] = React.useState<number>(-1);
    return (
        <VStack spacing="0px" style={containerStyle} flex {...props}>
            {lines.map((line, index) => {
                const additionalStyle = ((index === selectedLine) && (selectColor)) ? {backgroundColor: '#cefad0'} : {};
                return <HStack key={`${index}`}spacing="0" className="line-container" style={{...lineContainerStyle, ...additionalStyle}} onClick={() => setSelectedLine(index)}>
                    <div className="code-line-numbers" style={lineNumberStyle}>{index + 1}</div>
                    <div style={codeStyle}>{line}</div>
                </HStack>
            })}
        </VStack>
    )
}
