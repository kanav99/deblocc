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
import { highlightCode, highlightStruct } from "./grammar/targets/avm";
import { Struct } from './grammar/struct';
import { defaultTheme } from "./components/theme";
import { Body } from "./components/body";
import { sampleAssemblyCode, sampleCode, sampleStructs } from "./sample"
import { Modal } from "./components/modal";
import { Text } from "./components/text";

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
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  
  const highlightedAssembly = highlightAssembly(disassembly);
  console.log(highlightedAssembly);
  const highlightedCode = highlightCode(code);
  return (
    <Body>
      <HStack flex>
        <Card header="load contract" flex>
          <HStack flex>
            <Input placeholder="contract address..." flex/>
            <Button title="decompile" />
          </HStack>
        </Card>
        <Card header="options">
          <Button  title="settings" onClick={() => setIsSettingsOpen(true)}/>
        </Card>
      </HStack>
      <HStack flex>
        <VStack>
          <Card header="assembly" style={{resize: 'horizontal'}} flex>
            <Code value={highlightedAssembly} selectColor="#cefad0"/>
          </Card>
        </VStack>
        <VStack flex>
          <Card style={{ height: "50%", resize: "vertical"}} header="source">
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
      <Modal show={isSettingsOpen} heading={'settings'} onClose={() => {setIsSettingsOpen(false)}}>
        <VStack style={{justifyContent: 'space-between'}}>
          <VStack>
            <Text>Hello</Text>
          </VStack>
          <HStack style={{justifyContent: 'right'}}>
            <Button title="reset" />
            <Button title="save" />
          </HStack>
        </VStack>
      </Modal>
    </Body>
  );
};
