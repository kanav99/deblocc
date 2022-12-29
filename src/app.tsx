import * as React from "react";
import { Button } from "./components/button";
import { HStack } from "./components/hstack";
import { VStack } from "./components/vstack";
import { Spacer } from "./components/spacer";
import { Input } from "./components/input";
import { Editor } from "./components/editor";
import "./styles.css";

export default () => {
  const [code, setCode] = React.useState(`const a = 1;`);
  return (
    <VStack flex>
      <HStack>
        <Input placeholder="contract address" flex/>
        <Button title="Decompile"/>
      </HStack>
      <HStack flex>
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          padding={10}
          readOnly
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            backgroundColor: "white",
            width: "50%",
          }}
        />
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          padding={10}
          readOnly
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            backgroundColor: "white",
            width: "50%",
          }}
        />
      </HStack>
    </VStack>
  );
};
