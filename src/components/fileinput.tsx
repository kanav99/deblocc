import * as React from "react";
import { Button } from "./button";
import { HStack } from "./hstack";
import { Text } from "./text";
import { Input } from "./input";
import { defaultTheme } from "./theme";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  flex? : boolean;
}

const inputStyle = {
    left: 0,
    top: 0,
    opacity: 0,
}

export const FileInput: React.FC<FileInputProps> = ({ flex, onChange, ...props }) => {
  const hiddenFileInput = React.useRef(null);
  const [fileName, setFileName] = React.useState<string>("");
  const handleClick = (event: any) => {
    // @ts-ignore
    hiddenFileInput.current.click();
  };
  return (
    // <Input type={"file"} {...props}/>
    <>
        <input type="file"
            ref={hiddenFileInput}
            onChange={e => {
                // @ts-ignore
                const file = e.target.files[0];
                setFileName(file.name);
                // @ts-ignore
                onChange(e)
            }}
            style={{display:'none'}} 
        /> 
        <HStack style={{padding: 0, maxWidth: '20%'}}>
            <Button title="⬆" onClick={handleClick} flex></Button>
            <Text>{fileName != "" ? fileName : "no file selected"}</Text>
        </HStack>
    </>
  );
};
