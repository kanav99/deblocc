import * as React from "react";
import { Button } from "./components/button";
import { HStack } from "./components/hstack";
import { VStack } from "./components/vstack";
import { Input } from "./components/input";
import "./styles.css";
import { Code } from "./components/code";
import { Card } from "./components/card";

function highlight(code: string) {
  return code
    .split("\n")
    .map((line) => {
        return <span style={{whiteSpace: 'pre'}}>{line}</span>;
    })
}

export default () => {
  const [code, setCode] = React.useState(`const a = 1;`);
  const highlightedCode = highlight(code);
  return (
    <VStack flex>
      <Card header="contract" >
        <HStack flex>
          <Input placeholder="contract address..." flex/>
          {/* <div style={{margin: 'auto', fontFamily: 'monospace'}}> or </div> */}
          <Button title="decompile"/>
        </HStack>
      </Card>
      <HStack flex>
        <Card style={{width: "50%", height: "100%"}} header="assembly">
          <Code value={highlightedCode} />
        </Card>
        <Card style={{width: "50%", height: "100%"}} header="source">
          <Code value={highlightedCode} />
        </Card>
      </HStack>
    </VStack>
  );
};
