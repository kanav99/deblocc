import { AssemblyCode } from "../assembly";

export type DecompilationResult = {
    assembly: AssemblyCode;
    code: string;
}

export interface Decompiler {
    decompileByBytecode: (bytecode: string) => Promise<DecompilationResult>
    decompileByAddress:  (address:  string, network: string) => Promise<DecompilationResult>;
}
