import React from "react";
import { Code } from "../../components/code/Code";
import { useContextAppCode } from "./codeSnippet";

export const UseContextCode: React.FC = () => {
  return <Code codeString={useContextAppCode} fileName="App.tsx" />;
};
