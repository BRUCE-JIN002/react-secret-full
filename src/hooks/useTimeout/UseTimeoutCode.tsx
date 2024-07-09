import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseTimeoutCode: React.FC = () => {
  return (
    <Code
      codeString={useTimeoutCodeString}
      fileName="useTimeout.ts"
      id={HooksType.UseTimeout}
    />
  );
};

export default UseTimeoutCode;

const useTimeoutCodeString = `import { useRef, useCallback, useEffect } from "react";

const useTimeout = (fn: VoidFunction, delay?: number) => {
  const fnRef = useRef<Function>(fn);
  fnRef.current = fn;

  const timerRef = useRef<number>();

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(fnRef.current, delay);

    return clear;
  });

  return clear;
};

export default useTimeout;`;
