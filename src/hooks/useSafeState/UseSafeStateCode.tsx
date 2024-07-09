import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseSafeStateCode: React.FC = () => {
  return (
    <Code
      codeString={useSafeStateCodeString}
      fileName="useSafaState.ts"
      id={HooksType.UseSafaState}
    />
  );
};

export default UseSafeStateCode;

const useSafeStateCodeString = `import { useCallback, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import useUnmountedRef from "../useUnmountedRef/useUnmountedRef";

function useSafeState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];

function useSafeState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>
];

function useSafeState<S>(initialState?: S | (() => S)) {
  const unmountedRef: { current: boolean } = useUnmountedRef();
  const [state, setState] = useState(initialState);
  const setCurrentState = useCallback((currentState: any) => {
    if (unmountedRef.current) {
      return;
    }
    setState(currentState);
  }, []);

  return [state, setCurrentState] as const;
}

export default useSafeState;`;
