import React from "react";
import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseScrollingCode: React.FC = () => {
  return (
    <Code
      codeString={useScrollingCodeString}
      fileName="useScrolling.ts"
      id={HooksType.UseScrolling}
    />
  );
};

export default UseScrollingCode;

const useScrollingCodeString = `import { RefObject, useEffect, useState } from "react";

const useScrolling = (ref: RefObject<HTMLElement>): boolean => {
  const [scrolling, setScrolling] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      let scollingTimer: ReturnType<typeof setTimeout>;

      const handleScrollEnd = () => {
        setScrolling(false);
      };

      const handleScroll = () => {
        setScrolling(true);
        clearTimeout(scollingTimer);
        scollingTimer = setTimeout(() => handleScrollEnd(), 150);
      };

      ref.current?.addEventListener("scroll", handleScroll);

      return () => {
        if (ref.current) {
          ref.current?.removeEventListener("scroll", handleScroll);
        }
      };
    }
    return () => {};
  }, [ref]);

  return scrolling;
};

export default useScrolling;`;
