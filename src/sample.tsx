import { AssemblyCode, Label, Instruction } from "./grammar/assembly";

export const sampleAssemblyCode : AssemblyCode = [
    {name: "square(int)"} as Label,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "push", operands: "rbp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "rbp, rsp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "DWORD PTR [rbp-4], edi"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "eax, DWORD PTR [rbp-4]"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "imul", operands: "eax, eax"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "pop", operands: "rbp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "ret", operands: ""} as Instruction,
    {name: "square(int)"} as Label,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "push", operands: "rbp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "rbp, rsp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "DWORD PTR [rbp-4], edi"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "eax, DWORD PTR [rbp-4]"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "imul", operands: "eax, eax"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "pop", operands: "rbp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "ret", operands: ""} as Instruction,
    {name: "square(int)"} as Label,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "push", operands: "rbp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "rbp, rsp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "DWORD PTR [rbp-4], edi"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "eax, DWORD PTR [rbp-4]"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "imul", operands: "eax, eax"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "pop", operands: "rbp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "ret", operands: ""} as Instruction,
    {name: "square(int)"} as Label,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "push", operands: "rbp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "rbp, rsp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "DWORD PTR [rbp-4], edi"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "eax, DWORD PTR [rbp-4]"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "imul", operands: "eax, eax"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "pop", operands: "rbp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "ret", operands: ""} as Instruction,
    {name: "square(int)"} as Label,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "push", operands: "rbp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "rbp, rsp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "DWORD PTR [rbp-4], edi"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "eax, DWORD PTR [rbp-4]"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "imul", operands: "eax, eax"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "pop", operands: "rbp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "ret", operands: ""} as Instruction,
    {name: "square(int)"} as Label,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "push", operands: "rbp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "rbp, rsp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "DWORD PTR [rbp-4], edi"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "eax, DWORD PTR [rbp-4]"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "imul", operands: "eax, eax"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "pop", operands: "rbp"} as Instruction,
    {address: 0x0, bytes: new Uint8Array([]), mnemonic: "ret", operands: ""} as Instruction,
  ]
  
export const sampleCode = `int square(int num) {
    return num * num;
}

int square(int num) {
    return num * num;
}

int square(int num) {
    return num * num;
}

int square(int num) {
    return num * num;
}

int square(int num) {
    return num * num;
}

int square(int num) {
    return num * num;
}
`;
  
export const sampleStructs = [
    {name: "point2d", fields: [{name: "x", type: "int"}, {name: "y", type: "int"}]},
    {name: "point3d", fields: [{name: "x", type: "int"}, {name: "y", type: "int"}, {name: "z", type: "int"}]},
];