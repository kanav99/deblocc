import { AssemblyCode } from "../assembly";

export type DecompilationResult = {
    assembly: AssemblyCode;
    code: string;
}

export interface Decompiler {
    decompileByBytecode: (bytecode: ArrayBuffer) => Promise<DecompilationResult>
    decompileByHex: (hex: string) => Promise<DecompilationResult>
    decompileByAddress:  (address:  string, network: string) => Promise<DecompilationResult>;
    name: string;
}
