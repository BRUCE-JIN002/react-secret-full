import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseMountedStateCode: React.FC = () => {
  return (
    <Code
      codeString={UseMountedStateCodeString}
      fileName="useMountedState.ts"
      id={HooksType.UseMountedState}
    />
  );
};

export default UseMountedStateCode;

const UseMountedStateCodeString = `import { useCallback, useEffect, useRef } from "react";

export default function useMountedState(): () => boolean {
  const mountedRef = useRef(false);
  const get = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return get;
}`;
