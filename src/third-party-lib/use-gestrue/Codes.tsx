import React from "react";
import { Code } from "../../components/code/Code";
import { CodeString } from "./codeString";

interface CodeProps {
  onToggle: () => void;
}

const ViewpagerCode: React.FC<CodeProps> = (props) => {
  return (
    <Code
      codeString={CodeString}
      fileName="App.tsx"
      onClick={props.onToggle}
      id={"useGusture"}
    />
  );
};

export default ViewpagerCode;
