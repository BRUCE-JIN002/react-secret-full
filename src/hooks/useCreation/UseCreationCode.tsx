import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseCreationCode: React.FC = () => {
  return (
    <Code
      codeString={useCreationCodeString}
      fileName="useCreation.ts"
      id={HooksType.UseCounter}
    />
  );
};

export default UseCreationCode;

const useCreationCodeString = `import { useRef } from "react";
import type { DependencyList } from "react";

const depsAreSame = (
  oldDeps: DependencyList,
  deps: DependencyList
): boolean => {
  if (oldDeps === deps) return true;

  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i])) return false;
  }

  return true;
};

const useCreation = <T>(fn: () => T, deps: DependencyList) => {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false
  });

  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = fn();
    current.initialized = true;
  }

  return current.obj as T;
};

export default useCreation;`;
