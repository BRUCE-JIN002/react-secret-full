import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseUnmountedRefCode: React.FC = () => {
  return (
    <Code
      codeString={useUnmountedRefCodeString}
      fileName="useUnmountedRef.ts"
      id={HooksType.UseUnmountedRef}
    />
  );
};

export default UseUnmountedRefCode;

const useUnmountedRefCodeString = `import { useEffect, useRef } from "react";

const useUnmountedRef = (): { readonly current: boolean } => {
  const unMountedRef = useRef<boolean>(false);

  useEffect(() => {
    unMountedRef.current = false;

    return () => {
      unMountedRef.current = true;
    };
  }, []);

  return unMountedRef;
};

export default useUnmountedRef;`;
