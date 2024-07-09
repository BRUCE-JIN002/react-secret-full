import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseDebounceCode: React.FC = () => {
  return (
    <Code
      codeString={useDebounceCodeString}
      fileName="useDebounce.ts"
      id={HooksType.UseDebounce}
    />
  );
};

export default UseDebounceCode;

const useDebounceCodeString = `import { useSafeState, useCreation } from "ahooks";
import useDebounceFn from "../useDebounceFn/useDebounceFn";
import type { DebounceOptions } from "../useDebounceFn/useDebounceFn";

const useDebounce = <T>(value: T, options: DebounceOptions) => {
  const [debounced, setDebounced] = useSafeState(value);

  const run = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useCreation(() => {
    run();
  }, [value]);

  return debounced;
};

export default useDebounce;`;
