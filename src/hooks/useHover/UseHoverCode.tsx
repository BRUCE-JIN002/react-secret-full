import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseHoverCode: React.FC = () => {
  return (
    <Code
      codeString={useHoverCodeString}
      fileName="useHover.ts"
      id={HooksType.UseHover}
    />
  );
};

export default UseHoverCode;

const useHoverCodeString = `import { RefObject, useEffect, useState } from "react";

export interface Options {
  onEnter?: VoidFunction;
  onLeave?: VoidFunction;
  onChange?: (isHovering: boolean) => void;
}

const useHovers = (ref: RefObject<HTMLElement>, options?: Options): boolean => {
  const { onEnter, onLeave, onChange } = options || {};
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    ref.current?.addEventListener("mouseenter", () => {
      onEnter?.();
      setIsHover(true);
      onChange?.(true);
    });

    ref.current?.addEventListener("mouseleave", () => {
      onLeave?.();
      setIsHover(false);
      onChange?.(false);
    });
  }, [ref]);

  return isHover;
};

export default useHovers;`;
