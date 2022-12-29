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
}

export const HStack: React.FC<HStackProps> = ({ height, width, spacing, flex, children, ...props }) => {
    if (flex) {
        return (
            <div style={{...hstackStyle, width, height, flexGrow: 1 }}>
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
    }
    return (
        <div style={{...hstackStyle, width, height }}>
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
