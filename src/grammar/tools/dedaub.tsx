import { Decompiler, DecompilationResult } from './common'

const INFURA_KEY = "918b3d31ca0141bb8fd76be2879394ae";

export class Dedaub implements Decompiler {
    name = "dedaub";
    async decompileByBytecode(bytecode: string): Promise<DecompilationResult> {
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
        const res = await fetch(`https://${network}.infura.io/v3/${INFURA_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "eth_getCode",
                params: [address, "latest"],
                id: 1
            })
        }).then(res => res.json());
        return this.decompileByBytecode(res.result);
    }
}
