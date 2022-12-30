import * as React from "react";
import { Button } from "./components/button";
import { HStack } from "./components/hstack";
import { VStack } from "./components/vstack";
import { Input } from "./components/input";
import "./styles.css";
import { Code } from "./components/code";
import { Card } from "./components/card";
import { highlightAssembly } from "./grammar/assembly";
import { TabCard, Tab } from "./components/tabcard";
import { highlightCode, highlightStruct } from "./grammar/arch/avm";
import { Struct } from './grammar/struct';
import { defaultTheme } from "./components/theme";
import { Body } from "./components/body";
import { sampleAssemblyCode, sampleCode, sampleStructs } from "./sample"

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
  const highlightedCode = highlightCode(code);
  return (
    <Body>
      <Card header="contract">
        <HStack flex>
          <Input placeholder="contract address..." flex/>
          <Button title="decompile"/>
        </HStack>
      </Card>
      <HStack flex>
        <VStack width="30%">
          <Card header="assembly" flex>
            <Code value={highlightedAssembly} selectColor="#cefad0"/>
          </Card>
        </VStack>
        <VStack flex>
          <Card style={{ height: "50%"}} header="source">
            <Code value={highlightedCode} selectColor="#cefad0"/>
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
    </Body>
  );
};
