import { Decompiler, DecompilationResult } from './common'
import init, { disassemble } from 'aleopath';
import { Label, Instruction } from '../assembly';

const fromHexString = (hexString : string) =>
  Uint8Array.from(hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));

const toHexString = (bytes: ArrayBuffer) => {
    let s = "";
    let bytes2 = new Uint8Array(bytes);
    for(let i = 0; i < bytes2.byteLength; i++) {
        if (bytes2[i] < 0x10) {
            s += "0";
        }
        let x :number = bytes2[i];
        s += x.toString(16);
    }
    return s;
}
    
export class Aleopathy implements Decompiler {
    name = "aleopathy";
    initialized = false;

    async decompileByBytecode(bytecode: ArrayBuffer): Promise<DecompilationResult> {
        if (!this.initialized) {
            let m = await init();
            this.initialized = true;
            console.log('initialized aleopath');
        }
        const res = disassemble(toHexString(bytecode));
        const assembly = res.split("\n").filter((line : string) => line !== "");
        return {
            assembly: assembly.map((line: string, idx: number) => {
                    if (idx == 0) {
                        return {
                            name: line
                        } as Label;
                    }
                    if (line.includes(":")) {
                        return {
                            name: line.split(":")[0]
                        } as Label;
                    }
                    else {
                        const line2 = line.trimLeft();
                        let x =  line2.split(' ');
                        return {
                            address: 0,
                            bytes: new Uint8Array([]),
                            mnemonic: x[0],
                            operands: x.slice(1).join(' ')
                        } as Instruction;
                    }
                }),
            code: ""
        }
    }

    async decompileByHex(bytecode: string): Promise<DecompilationResult> {
        return this.decompileByBytecode(fromHexString(bytecode));
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
