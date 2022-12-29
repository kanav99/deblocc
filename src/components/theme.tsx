import * as React from "react";

interface Theme {
    font: {
        family: string;
    },
    color: {
        background: string;
    }
};

export const defaultTheme: Theme = {
    font: {
        family: 'monospace',
    },
    color: {
        background: '#dfdfdf',
    }
};
