import * as React from "react";

interface VStackProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
  width?: string;
  spacing?: string;
  flex?: boolean;
}

const vstackStyle : React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
}

export const VStack: React.FC<VStackProps> = ({ height, width, spacing, flex, children, ...props }) => {
  if (flex) {
    return (
      <div style={{...vstackStyle, width, height, minHeight: height, flexGrow: 1 }}>
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
  }
  return (
    <div style={{...vstackStyle, width, height, minHeight: height }}>
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
