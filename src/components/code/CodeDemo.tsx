import React from "react";
import { Code } from "./Code";
import { rowSpanCountfun } from "./codeStringDemo";

export const CodeDemo: React.FC = () => {
  return <Code codeString={rowSpanCountfun} fileName="calRowSpan.js" />;
};
