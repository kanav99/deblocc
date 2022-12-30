import * as React from "react";
import { defaultTheme } from "./theme";

interface HStackProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
  width?: string;
  spacing?: string;
  flex?: boolean;
  loading?: boolean;
}

const hstackStyle : React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
}

export const HStack: React.FC<HStackProps> = ({ height, width, spacing, flex, children, style, loading, ...props }) => {
    const additionalStyle = flex ? {flexGrow: 1} : {};
    return (
        <div style={{...hstackStyle, ...additionalStyle, ...style, width, height, }} {...props}>
            {React.Children.map(children, (child, index) => {
                if (index === 0) return child;
                let spacing2 = spacing || '10px';
                return (
                    <>
                        <div style={{ width: spacing2, height: '100%' }} />
                        {child}
                    </>
                );
            })}      
            {loading && <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontFamily: defaultTheme.font.family}}>Loading...</div>
            </div>}
        </div>
    );
};
