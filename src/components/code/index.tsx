import React from "react";
import { Code } from "./Code";
import { rowSpanCountfun } from "../../code-snippet/countRowSpan";

export const CodeDemoComponent: React.FC = () => {
  return <Code codeString={rowSpanCountfun} fileName="calRowSpan.js" />;
};
