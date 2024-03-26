import React from "react";
import { Code } from "../../components/code/Code";
import { useReducerCode } from "./codeSnippet";

export const UseReducerCode: React.FC = () => {
  return <Code codeString={useReducerCode} fileName="App.tsx" />;
};
