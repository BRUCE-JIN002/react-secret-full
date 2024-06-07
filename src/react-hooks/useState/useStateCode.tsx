import React from "react";
import { Code } from "../../components/code/Code";
import { useStateFuncUpdateCode, useStateCode } from "./codeSnippet";

export const UseStateCode: React.FC = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        gap: 20,
        padding: 10,
      }}
    >
      <Code codeString={useStateCode} fileName="App.tsx" />
      <Code codeString={useStateFuncUpdateCode} fileName="App.tsx" />
    </div>
  );
};
