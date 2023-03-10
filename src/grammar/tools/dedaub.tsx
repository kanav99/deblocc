import { Decompiler, DecompilationResult } from './common'

function buf2hex(buffer: ArrayBuffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}

export class Dedaub implements Decompiler {
    name = "dedaub";
    async decompileByHex(bytecode: string): Promise<DecompilationResult> {
        const res = await fetch(`https://library.dedaub.com/api/on_demand/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hex_bytecode: bytecode
            })
        }).then(res => res.text());

        const md5 = res.substring(1, res.length - 1);

        const decompilerLink = `/.netlify/functions/dedaub?md5=${md5}`;
        const decompiledJSON = await fetch(decompilerLink).then(res => res.json());
        const assembly = decompiledJSON.disassembled.split("\n").map((line : string) => line.split(":")[1].trim().split(' ').filter((x : string) => x !== ""));

        return {
            assembly: assembly.map((line : string[]) => {
                return {
                    address: 0,
                    bytes: [],
                    mnemonic: line[0],
                    operands: line.slice(1).join(' ')
                }
            }),
            code: decompiledJSON.source
        }
    }

    async decompileByAddress(address: string, network: string): Promise<DecompilationResult> {
        const res = await fetch(`/.netlify/functions/infura?address=${address}&network=${network}`).then(res => res.json());
        console.log(res);
        return this.decompileByHex(res.result);
    }

    async decompileByBytecode(bytecode: ArrayBuffer): Promise<DecompilationResult> {
        return this.decompileByHex(buf2hex(bytecode));
    }
}
