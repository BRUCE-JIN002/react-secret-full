import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseIsomorphicEffectCode: React.FC = () => {
  return (
    <Code
      codeString={useIsomorphicEffectCodeString}
      fileName="useIsomorphicEffect.ts"
      id={HooksType.UseIsomorphicEffect}
    />
  );
};

export default UseIsomorphicEffectCode;

const useIsomorphicEffectCodeString = `import { useEffect, useLayoutEffect } from "react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;`;
