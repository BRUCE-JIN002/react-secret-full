import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseLiftcycleCode: React.FC = () => {
  return (
    <Code
      codeString={useLiftcycleCodeString}
      fileName="useLiftcycle.ts"
      id={HooksType.UseLifecycle}
    />
  );
};

export default UseLiftcycleCode;

const useLiftcycleCodeString = `import { useEffect } from "react";

const useLifecycles = (mount: Function, unmount?: Function) => {
  useEffect(() => {
    if (mount) {
      mount();
    }

    return () => {
      if (unmount) {
        unmount();
      }
    };
  }, []);
};

export default useLifecycles;`;
