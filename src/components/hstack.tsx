import * as React from "react";

interface HStackProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
  width?: string;
  spacing?: string;
  flex?: boolean;
}

const hstackStyle : React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
}

export const HStack: React.FC<HStackProps> = ({ height, width, spacing, flex, children, style, ...props }) => {
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
        </div>
    );
};
