import * as React from "react";
import { Button } from "./components/button";
import { HStack } from "./components/hstack";
import { VStack } from "./components/vstack";
import { Spacer } from "./components/spacer";
import { Input } from "./components/input";


export default () => (
  <VStack>
    <HStack>
      <Input placeholder="hello"/>
      <Spacer />
      <Button title="click me"/>
    </HStack>
    <Spacer />
    <HStack>
      <Input placeholder="hello"/>
      <Button title="click me" flex/>
    </HStack>
  </VStack>
);
