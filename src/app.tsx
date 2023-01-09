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
import { Aleopathy } from "./grammar/tools/aleopathy";
import { FileInput } from "./components/fileinput";

const StructListView = (props: {structs: Struct[]}) => {
  const [selectedStruct, setSelectedStruct] = React.useState(0);
  return <HStack flex>
    <VStack style={{marginTop: '5px'}} spacing="3px">
      {props.structs.map((struct, index) => {
        return <HStack style={{fontFamily: defaultTheme.font.family}} key={`${index}`}>
            <span style={{width: '5px'}}> {index === selectedStruct && ">"}</span>
            <a className="undreline-link" onClick={() => setSelectedStruct(index)}>{struct.name}</a>
          </HStack>
      })}
    </VStack>
    <Code value={highlightStruct(props.structs[selectedStruct])}></Code>
  </HStack>
}

const targets = [
  "ethereum",
  "aleo",
]

// for each target, we have a list of decompilers
const decompilers = [
  [
    new Dedaub(),
  ],
  [
    new Aleopathy(),
  ]
]

// for each target, we have a list of networks
const networks = [
  [
    "goerli",
    "mainnet",
  ],
  [
    "testnet3",
  ]
]

const useCachedState = (key: string, defaultValue: any) => {
  const [value, setValue] = React.useState(() => {
    const cachedValue = localStorage.getItem(key);
    if (cachedValue) {
      return JSON.parse(cachedValue);
    }
    return defaultValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default () => {
  const [disassembly, setDisassembly] = useCachedState("disassembly", sampleAssemblyCode);
  const [code, setCode] = useCachedState("code", sampleCode);
  const [structs, setStructs] = useCachedState("structs", sampleStructs);
  const [contractAddress, setContractAddress] = useCachedState("contractAddress", "");
  const [target, setTarget] = useCachedState("target", 0);
  const [network, setNetwork] = useCachedState("network", 0);
  const [decompiler, setDecompiler] = useCachedState("decompiler", 0);
  
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isDecompiling, setIsDecompiling] = React.useState(false);

  const highlightedAssembly = highlightAssembly(disassembly);
  const highlightedCode = highlightCode(code);
  
  return (
    <Body>
      <HStack style={{minHeight: '50px', maxHeight: '50px'}}>
        <Card header="load contract" flex>
          <HStack flex>
            <select style={{fontFamily: defaultTheme.font.family}} 
              onChange={e => {
                setTarget(parseInt(e.target.value));
                setNetwork(0);
              }}
              value={target}
            >
              {targets.map((target, index) => {
                return <option key={`${index}`} style={{fontFamily: defaultTheme.font.family}} value={index}>{target}</option>
              })}
            </select>
            <select style={{fontFamily: defaultTheme.font.family}} 
              onChange={e => {
                setNetwork(parseInt(e.target.value));
              }}
              value={network}
            >
              {networks[target].map((network, index) => {
                return <option key={`${index}`} style={{fontFamily: defaultTheme.font.family}} value={index}>{network}</option>
              })}
            </select>
            <Input placeholder="contract address..." value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} flex/>
            <Button title="decompile" onClick={async () => {
              setIsDecompiling(true);
              try {
                const result = await decompilers[target][decompiler].decompileByAddress(contractAddress, networks[target][network]);
                setCode(result.code);
                setIsDecompiling(false);
                setDisassembly(result.assembly);
              }
              catch(e) {
                console.log(e);
                alert("Failed to decompile contract, check contract address and network. Check out console for more logs.")
                setCode('');
                setDisassembly([]);
                setIsDecompiling(false);
              }
              // setStructs(result.structs);
            }}/>
            <Text>or</Text>
            <FileInput placeholder="load contract..." onChange={(e) => {
              // @ts-ignore
              const file = e.target.files[0];
              if (!file) {
                return;
              }
              setIsDecompiling(true);
              const reader = new FileReader();

              reader.onload = async (event) => {
                setIsDecompiling(false);
                try {
                  // @ts-ignore
                  const result = await decompilers[target][decompiler].decompileByBytecode(event.target.result);
                  setCode(result.code);
                  setIsDecompiling(false);
                  setDisassembly(result.assembly);
                }
                catch(e) {
                  console.log(e);
                  alert("Failed to decompile contract, check contract address and network. Check out console for more logs.")
                  setCode('');
                  setDisassembly([]);
                  setIsDecompiling(false);
                }
              };

              reader.onerror = (err) => {
                setIsDecompiling(false);
                console.log(err);
              };

              reader.readAsArrayBuffer(file);

            }}/>
          </HStack>
        </Card>
        <Card header="options">
          <Button  title="settings" onClick={() => setIsSettingsOpen(true)}/>
        </Card>
      </HStack>
      <HStack loading={isDecompiling} flex>
        <VStack>
          <Card header="disassembly" style={{resize: 'both', minWidth: '200px'}} flex>
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
              <VStack>
              {targets.map((target, index) => {
                return <HStack key={`${index}`}>
                    <Text>{target}: </Text>
                    <select style={{fontFamily: defaultTheme.font.family}} 
                      onChange={e => {
                        setDecompiler(parseInt(e.target.value));
                      }}
                      value={decompiler}
                    >
                      {decompilers[index].map((decompiler, index) => {
                        return <option key={`${index}`} style={{fontFamily: defaultTheme.font.family}} value={index}>{decompiler.name}</option>
                      })}
                    </select>
                  </HStack>
              })}
              </VStack>
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
