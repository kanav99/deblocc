import * as React from "react";

interface VStackProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
  width?: string;
  spacing?: string;
}

const vstackStyle : React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
}

export const VStack: React.FC<VStackProps> = ({ height, width, spacing, children, ...props }) => {
  return (
    <div style={{...vstackStyle, width, height }}>
        {React.Children.map(children, (child, index) => {
            if (index === 0) return child;
            let spacing2 = spacing || '10px';
            return (
                <>
                    <div style={{ width: "100%", height: spacing2 }} />
                    {child}
                </>
            );
        })}
    </div>
  );
};
