import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseLatestCode: React.FC = () => {
  return (
    <Code
      codeString={useLatestCodeString}
      fileName="useLatest.ts"
      id={HooksType.UseLatest}
    />
  );
};

export default UseLatestCode;

const useLatestCodeString = `import { useRef } from "react";

const useLatest = <T>(value: T): { readonly current: T } => {
  const ref = useRef(value);
  ref.current = value;

  return ref;
};

export default useLatest;`;
