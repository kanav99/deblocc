import * as React from "react";
import { defaultTheme } from "./theme";

import { VStack } from "./vstack";

export const Body : React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
    return <VStack style={{
        backgroundColor: defaultTheme.color.background,
        padding: '10px',
        minHeight: '97vh',
        maxHeight: '97vh',
    }} flex>{children}</VStack>
}
