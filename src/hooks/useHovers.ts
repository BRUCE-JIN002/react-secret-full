import { RefObject, useEffect, useState } from "react";

export interface Options {
  onEnter?: VoidFunction;
  onLeave?: VoidFunction;
  onChange?: (isHovering: boolean) => void;
}

const useHovers = (ref: RefObject<HTMLElement>, options?: Options): boolean => {
  const { onEnter, onLeave, onChange } = options || {};
  const [isEnter, setIsEnter] = useState(false);

  useEffect(() => {
    ref.current?.addEventListener("mouseenter", () => {
      onEnter?.();
      setIsEnter(true);
      onChange?.(true);
    });

    ref.current?.addEventListener("mouseleave", () => {
      onLeave?.();
      setIsEnter(false);
      onChange?.(false);
    });
  }, [ref]);

  return isEnter;
};

export default useHovers;
