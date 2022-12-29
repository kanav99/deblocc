import * as React from "react";
import { defaultTheme } from "./theme";

interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
    header: string;
}

interface TabCardProps extends React.HTMLAttributes<HTMLDivElement> {
    height?: string;
    width?: string;
    flex?: boolean;
    children: React.ReactElement<TabProps>[]
}

const tabCardStyle : React.CSSProperties = {
    border: '1px solid gray',
    padding: '10px',
    marginTop: '4px',
    borderRadius: '5px',
    display: 'flex',
    flexGrow: 1,
}

const tabCardHeaderStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: 'transparent',
    marginTop: '-20px',
    padding: '0px 5px',
    fontFamily: 'monospace'
}

const tabCardHeaderElementStyle: React.CSSProperties = {
    backgroundColor: defaultTheme.color.background,
    marginLeft: '10px',
    paddingLeft: '5px',
    paddingRight: '5px',
    fontFamily: 'monospace'
}

export const Tab: React.FC<TabProps> = ({ children, ...props }) => {
    return children as React.ReactElement;
};


export const TabCard: React.FC<TabCardProps> = ({ children, style, flex, ...props }) => {
    const additionalStyle = flex ? {flexGrow: 1} : {};
    const [activeTab, setActiveTab] = React.useState(0);
    return (
        <div style={{...tabCardStyle, ...style, ...additionalStyle}}>
            <span style={tabCardHeaderStyle}>
                {React.Children.map(children, (child, index) => {
                    const additionalStyle2 = (index === activeTab) ? {textDecorationLine: 'underline'} : {};
                    return <span style={tabCardHeaderElementStyle}>
                        <a className="undreline-link" onClick={() => setActiveTab(index)} style={{...additionalStyle2}}>{child?.props.header}</a>
                    </span>
                })}
            </span>
            {children[activeTab]}
        </div>
    );
}
