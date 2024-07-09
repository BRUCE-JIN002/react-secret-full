import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseWhyDidYouUpdateCode: React.FC = () => {
  return (
    <Code
      codeString={useWhyDidYouUpdateCodeString}
      fileName="useWhyDidYouUpdate.ts"
      id={HooksType.UseWhyDidYouUpdate}
    />
  );
};

export default UseWhyDidYouUpdateCode;

const useWhyDidYouUpdateCodeString = `import { useEffect, useRef } from "react";

export type Iprops = Record<string, any>;

export default function useWhyDidYouUpdate(
  componentNname: string,
  props: Iprops
) {
  const prevProps = useRef<Iprops>({});

  useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props });
      const changedProps: Iprops = {};

      allKeys.forEach((key) => {
        if (!Object.is(prevProps.current[key], props[key])) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key],
          };
        }
      });
      if (Object.keys(changedProps).length) {
        console.log("[why-did-you-update]", componentNname, changedProps);
      }
    }

    prevProps.current = props;
  });
}`;
