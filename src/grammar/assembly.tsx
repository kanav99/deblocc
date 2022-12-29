import * as React from "react";

export interface Instruction {
    address: number;
    bytes: Uint8Array;
    mnemonic: string;
    operands: string;
}

export interface Label {
    name: string;
}

type AssemblyLine = Instruction | Label;

const isInstruction = (line: AssemblyLine): line is Instruction => {
    return (line as Instruction).address !== undefined && 
        (line as Instruction).bytes !== undefined && 
        (line as Instruction).mnemonic !== undefined && 
        (line as Instruction).operands !== undefined;
}

export type AssemblyCode = AssemblyLine[];

export const highlightAssembly = (code: AssemblyCode) => {
    return code.map((line) => {
        if (isInstruction(line)) {

            return <span style={{whiteSpace: 'pre'}}>  <span style={{color: "#0000ff"}}>{line.mnemonic}</span> <span style={{color: "#4864aa"}}>{line.operands}</span></span>;
        } else  {
            return <span style={{whiteSpace: 'pre', color: '#008080'}}>{line.name}:</span>;
        }
    })
}
