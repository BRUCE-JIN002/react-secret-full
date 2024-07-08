import { MutableRefObject } from "react";
import useSafeState from "../useSafeState/useSafeState";
import useEventListener from "./useEventListener";
import BasicTarget from "../../common/utils/BasicTarget";

interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHover: boolean) => void;
}

const useHover = (target: BasicTarget, options: Options): boolean => {
  const { onChange, onEnter, onLeave } = options;

  const [isHover, setIsHover] = useSafeState(false);

  useEventListener(
    "mouseenter",
    () => {
      onEnter?.();
      onChange?.(isHover);
      setIsHover(true);
    },
    target
  );
  useEventListener(
    "mouseleave",
    () => {
      onLeave?.();
      onChange?.(isHover);
      setIsHover(false);
    },
    target
  );

  return false;
};

export default useHover;
