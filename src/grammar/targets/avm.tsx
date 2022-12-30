import * as React from "react";
import { Struct } from "../struct";

export const supportedLanguages = [
    "leo"
]

export const highlightStruct = (struct: Struct) => {
    return [
        <><span style={{color: "#0000ff"}}>struct</span> <span style={{color: 'black'}}>{struct.name}</span> {'{'}</>,
        ...struct.fields.map((field) => {
            return <div style={{paddingLeft: '20px'}}>{field.name}: <span style={{color: "#0000ff"}}>{field.type}</span></div>
        }),
        <>{'}'}</>
    ]
}

export const highlightCode = (code: string) => {
    return code
      .split("\n")
      .map((line) => {
          return <span style={{whiteSpace: 'pre'}}>{line}</span>;
      })
}
  