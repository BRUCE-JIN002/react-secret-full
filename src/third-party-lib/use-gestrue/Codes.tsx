import React from "react";
import { Code } from "../../components/code/Code";
import { CodeString } from "./codeString";
import { HooksType } from "../../menu/Menu";

interface CodeProps {
  onToggle: () => void;
}

const ViewpagerCode: React.FC<CodeProps> = (props) => {
  return (
    <Code
      codeString={CodeString}
      width={1000}
      fileName="App.tsx"
      onClick={props.onToggle}
      id={HooksType.UseGusture}
    />
  );
};

export default ViewpagerCode;
