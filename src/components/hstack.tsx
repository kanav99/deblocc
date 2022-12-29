import * as React from "react";

interface HStackProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  spacing?: string;
}

const hstackStyle : React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
}

export const HStack: React.FC<HStackProps> = ({ width, spacing, children, ...props }) => {
  return (
    <div style={{...hstackStyle, width }}>
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
