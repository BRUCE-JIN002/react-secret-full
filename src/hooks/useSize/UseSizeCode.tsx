import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseSizeCode: React.FC = () => {
  return (
    <Code
      codeString={useSizeCodeString}
      fileName="useSize.ts"
      id={HooksType.UseSize}
    />
  );
};

export default UseSizeCode;

const useSizeCodeString = `import ResizeObserver from "resize-observer-polyfill";
import { RefObject, useEffect, useState } from "react";

type Size = { width: number; height: number };
const useSize = (taregtRef: RefObject<HTMLElement>): Size | undefined => {
  const [state, setState] = useState<Size | undefined>(() => {
    const el = taregtRef.current;
    return el ? { width: el.clientWidth, height: el.clientHeight } : undefined;
  });

  useEffect(() => {
    const el = taregtRef.current;
    if (!el) {
      return;
    }

    const resizeObserer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { clientWidth, clientHeight } = entry.target;
        setState({ width: clientWidth, height: clientHeight });
      });
    });

    resizeObserer.observe(el);

    return () => {
      resizeObserer.disconnect();
    };
  }, [taregtRef]);

  return state;
};

export default useSize;`;
