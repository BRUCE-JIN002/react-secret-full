import React from "react";
import { Code } from "../../components/code/Code";
import { useStateFuncUpdateCode, useStateCode } from "./codeSnippet";
import Space from "../../components/space/Space";

export const UseStateCode: React.FC = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Space direction="vertical" size={20} style={{ padding: "20px 0px" }}>
        <Code codeString={useStateCode} fileName="App.tsx" />
        <Code codeString={useStateFuncUpdateCode} fileName="App.tsx" />
      </Space>
    </div>
  );
};
