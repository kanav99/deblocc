import { Decompiler, DecompilationResult } from './common'

export class Aleopathy implements Decompiler {
    name = "aleopathy";
    
    async decompileByBytecode(bytecode: string): Promise<DecompilationResult> {
        return {
            assembly: [],
            code: ""
        }
    }

    async decompileByAddress(address: string, network: string): Promise<DecompilationResult> {
        const res = await fetch(`https://vm.aleo.org/api/${network}/program/${address}`).then(res => res.json());
        // console.log(res);
        // remove empty lines
        const assembly = res.split("\n").filter((line : string) => line !== "");
        console.log(assembly);
        return {
            assembly: assembly.map((line: string, idx: number) => {
                if (idx == 0) {
                    return {
                        name: line
                    }
                }
                if (line.includes(":")) {
                    return {
                        name: line.split(":")[0]
                    }
                }
                else {
                    const line2 = line.trimLeft();
                    return {
                        address: 0,
                        bytes: [],
                        mnemonic: line2.split(' ')[0],
                        operands: line2.split(' ').slice(1).join(' ')
                    }
                }
            }),
            code: ""
        }
    }
}
