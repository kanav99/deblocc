import * as React from "react";
import { defaultTheme } from "./theme";

export const Text : React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
    return <div style={{fontFamily: defaultTheme.font.family, display: "flex",
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column'}}>{children}</div>;
}
