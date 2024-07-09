import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseForceUpdateCode: React.FC = () => {
  return (
    <Code
      codeString={useForceUpdateCodeString}
      fileName="useForceUpdate.ts"
      id={HooksType.UseForceUpdate}
    />
  );
};

export default UseForceUpdateCode;

const useForceUpdateCodeString = `import { useReducer } from "react";

function useForceUpdate(): () => void {
  const [, update] = useReducer((num: number): number => num + 1, 0);

  return update;
}

export default useForceUpdate;`;
