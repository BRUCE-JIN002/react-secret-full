import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseDebounceFnCode: React.FC = () => {
  return (
    <Code
      codeString={useDebounceFnCodeString}
      fileName="useDebounceFn.ts"
      id={HooksType.UseDebounceFn}
    />
  );
};

export default UseDebounceFnCode;

const useDebounceFnCodeString = `import { useLatest, useUnmount, useCreation } from "ahooks";
import debounce from "lodash/debounce";

type noop = (...args: any[]) => any;

export interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

const useDebounceFn = <T extends noop>(fn: T, options: DebounceOptions) => {
  const fnRef = useLatest(fn);

  const debounced = useCreation(() => {
    return debounce(
      (...args: Parameters<T>): ReturnType<T> => fnRef.current(...args),
      options.wait ?? 100,
      options
    );
  }, []);

  useUnmount(() => {
    debounced.cancel();
  });

  return debounced;
};

export default useDebounceFn;`;
