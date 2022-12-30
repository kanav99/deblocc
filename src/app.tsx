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
import { Dedaub } from "./grammar/tools/dedaub";

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

const targets = [
  "evm"
]

// for each target, we have a list of decompilers
const decompilers = [
  [
    new Dedaub(),
  ]
]

// for each target, we have a list of networks
const networks = [
  [
    "mainnet",
    "goerli"
  ]
]

export default () => {
  const [disassembly, setDisassembly] = React.useState(sampleAssemblyCode);
  const [code, setCode] = React.useState(sampleCode);
  const [structs, setStructs] = React.useState(sampleStructs);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [contractAddress, setContractAddress] = React.useState("");
  const [isDecompiling, setIsDecompiling] = React.useState(false);
  const [target, setTarget] = React.useState(0);
  const [network, setNetwork] = React.useState(0);
  const [decompiler, setDecompiler] = React.useState(0);

  const highlightedAssembly = highlightAssembly(disassembly);
  const highlightedCode = highlightCode(code);
  
  return (
    <Body>
      <HStack style={{minHeight: '50px'}} flex>
        <Card header="load contract" flex>
          <HStack flex>
            <select style={{fontFamily: defaultTheme.font.family}} onChange={e => {
              setTarget(parseInt(e.target.value));
              setNetwork(0);
            }}>
              {targets.map((target, index) => {
                return <option style={{fontFamily: defaultTheme.font.family}} value={index}>{target}</option>
              })}
            </select>
            <select style={{fontFamily: defaultTheme.font.family}} onChange={e => {
              setNetwork(parseInt(e.target.value));
            }}>
              {networks[target].map((network, index) => {
                return <option style={{fontFamily: defaultTheme.font.family}} value={index}>{network}</option>
              })}
            </select>
            <Input placeholder="contract address..." value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} flex/>
            <Button title="decompile" onClick={async () => {
              setIsDecompiling(true);
              const result = await decompilers[target][decompiler].decompileByAddress(contractAddress, networks[target][network]);
              setCode(result.code);
              setIsDecompiling(false);
              setDisassembly(result.assembly);
              // setStructs(result.structs);
            }}/>
          </HStack>
        </Card>
        <Card header="options">
          <Button  title="settings" onClick={() => setIsSettingsOpen(true)}/>
        </Card>
      </HStack>
      <HStack loading={isDecompiling} flex>
        <VStack>
          <Card header="disassembly" style={{resize: 'both'}} flex>
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
            <Card header="decompilers">
              {targets.map((target, index) => {
                return <HStack>
                    <Text>{target}: </Text>
                    <select style={{fontFamily: defaultTheme.font.family}} onChange={e => {
                      setDecompiler(parseInt(e.target.value));
                    }}>
                      {decompilers[index].map((decompiler, index) => {
                        return <option style={{fontFamily: defaultTheme.font.family}} value={index}>{decompiler.name}</option>
                      })}
                    </select>
                  </HStack>
              })}
            </Card>
          </VStack>
          {/* <HStack style={{justifyContent: 'right'}}>
            <Button title="reset" />
            <Button title="save" />
          </HStack> */}
        </VStack>
      </Modal>
    </Body>
  );
};
