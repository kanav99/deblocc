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
import { highlightStruct } from "./grammar/arch/avm";
import { Struct } from './grammar/struct';
import { defaultTheme } from "./components/theme";

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

const sampleStructs = [
  {name: "point2d", fields: [{name: "x", type: "int"}, {name: "y", type: "int"}]},
  {name: "point3d", fields: [{name: "x", type: "int"}, {name: "y", type: "int"}, {name: "z", type: "int"}]},
];

const StructListView = (props: {structs: Struct[]}) => {
  const [selectedStruct, setSelectedStruct] = React.useState(0);
  return <HStack flex>
    <VStack style={{marginTop: '5px'}} spacing="3px">
      {props.structs.map((struct, index) => {
        return <HStack style={{fontFamily: defaultTheme.font.family}}>
            <span style={{width: '5px'}}> {index === selectedStruct && ">"}</span>
            <a className="undreline-link" onClick={() => setSelectedStruct(index)}>{struct.name}</a>
          </HStack>
      })}
    </VStack>
    <Code value={highlightStruct(props.structs[selectedStruct])}></Code>
  </HStack>
}


export default () => {
  const [disassembly, setDisassembly] = React.useState(sampleAssemblyCode);
  const [code, setCode] = React.useState(sampleCode);
  const [structs, setStructs] = React.useState(sampleStructs);
  
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
            <Tab header="types">
              <StructListView structs={structs} />
            </Tab>
            <Tab header="symbols">
              <Code value={"todo"} />
            </Tab>
          </TabCard>
        </VStack>
      </HStack>
    </VStack>
  );
};
