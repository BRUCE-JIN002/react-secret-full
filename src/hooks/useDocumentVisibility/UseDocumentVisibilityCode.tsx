import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseDocumentVisibilityCode: React.FC = () => {
  return (
    <Code
      codeString={useDocumentVisibilityCodeString}
      fileName="useDocumentVisibility.ts"
      id={HooksType.UseDocumentVisibility}
    />
  );
};

export default UseDocumentVisibilityCode;

const useDocumentVisibilityCodeString = `import { useSafeState } from "ahooks";
import isBrowser from "../../common/utils/isBrowser";
import useEventListener from "../useHover/useEventListener";

type VisibilityType = "hidden" | "visible" | undefined;

const getVisibility = (): VisibilityType => {
  if (!isBrowser) {
    return "visible";
  }
  return document.visibilityState;
};

const useDocumentVisibility = (): VisibilityType => {
  const [visibility, setVisibility] = useSafeState(() => getVisibility());

  useEventListener(
    "visibilitychange",
    () => {
      setVisibility(getVisibility());
    },
    document
  );

  return visibility;
};

export default useDocumentVisibility;`;
