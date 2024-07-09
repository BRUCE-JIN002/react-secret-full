import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseReactiveCode: React.FC = () => {
  return (
    <Code
      codeString={useReactiveCodeString}
      fileName="useReactive.ts"
      id={HooksType.UseReactive}
    />
  );
};

export default UseReactiveCode;

const useReactiveCodeString = `import { useCreation, useLatest } from "ahooks";
import useUpdate from "../useForceUpdate/useForceUpdate";

const observer = <T extends Record<string, any>>(
  initialVal: T,
  cb: VoidFunction
): T => {
  const proxy = new Proxy<T>(initialVal, {
    get(target, key, reciver) {
      const res = Reflect.get(target, key, reciver);
      return typeof res === "object"
        ? observer(res, cb)
        : Reflect.get(target, key);
    },
    set(target, key, val) {
      const res = Reflect.set(target, key, val);
      cb();
      return res;
    },
  });

  return proxy;
};

const useReactive = <T extends Record<string, any>>(intialState: T): T => {
  const ref = useLatest(intialState);
  const update = useUpdate();

  const state = useCreation(() => {
    return observer(ref.current, () => {
      update();
    });
  }, []);

  return state;
};

export default useReactive;`;
