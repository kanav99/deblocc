import * as React from "react";
import { Button } from "./components/button";
import { HStack } from "./components/hstack";
import { VStack } from "./components/vstack";
import { Input } from "./components/input";
import "./styles.css";
import { Code } from "./components/code";
import { Card } from "./components/card";
import { AssemblyCode, highlightAssembly, Label, Instruction } from "./grammar/assembly";
import { TabCard, Tab } from "./components/tabcard";

function highlight(code: string) {
  return code
    .split("\n")
    .map((line) => {
        return <span style={{whiteSpace: 'pre'}}>{line}</span>;
    })
}

const sampleAssemblyCode : AssemblyCode = [
  {name: "square(int)"} as Label,
  {address: 0x0, bytes: new Uint8Array([]), mnemonic: "push", operands: "rbp"} as Instruction,
  {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "rbp, rsp"} as Instruction,
  {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "DWORD PTR [rbp-4], edi"} as Instruction,
  {address: 0x0, bytes: new Uint8Array([]), mnemonic: "mov", operands: "eax, DWORD PTR [rbp-4]"} as Instruction,
  {address: 0x0, bytes: new Uint8Array([]), mnemonic: "imul", operands: "eax, eax"} as Instruction,
  {address: 0x0, bytes: new Uint8Array([]), mnemonic: "pop", operands: "rbp"} as Instruction,
  {address: 0x0, bytes: new Uint8Array([]), mnemonic: "ret", operands: ""} as Instruction,
]

const sampleCode = `const a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\nconst a = 1;\n`;

export default () => {
  const [disassembly, setDisassembly] = React.useState(sampleAssemblyCode);
  const [code, setCode] = React.useState(sampleCode);
  
  const highlightedAssembly = highlightAssembly(disassembly);
  console.log(highlightedAssembly);
  const highlightedCode = highlight(code);
  return (
    <VStack flex>
      <Card header="contract">
        <HStack flex>
          <Input placeholder="contract address..." flex/>
          <Button title="decompile"/>
        </HStack>
      </Card>
      <HStack flex>
        <VStack width="30%">
          <Card header="assembly" flex>
            <Code value={highlightedAssembly} />
          </Card>
        </VStack>
        <VStack flex>
          <Card style={{ height: "50%"}} header="source">
            <Code value={highlightedCode} />
          </Card>
          <TabCard flex>
            <Tab header="symbols">
              <Code value={"symbols"} />
            </Tab>
            <Tab header="types">
              <Code value={"types"} />
            </Tab>
          </TabCard>
        </VStack>
      </HStack>
    </VStack>
  );
};
