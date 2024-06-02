import { cloneElement, useLayoutEffect, useRef, useState } from "react";
import useMutateObserver from "../../hooks/useMutateOberver";

interface MutationObserverPoprs {
  options: MutationObserverInit;
  children?: React.ReactElement;
  onMutate?: (mutations: MutationRecord[], observe: MutationObserver) => void;
}

const MutateObserver: React.FC<MutationObserverPoprs> = (props) => {
  const { options, onMutate = () => {}, children } = props;

  const refElement = useRef<HTMLElement>();
  const [target, setTarget] = useState<HTMLElement>();

  useLayoutEffect(() => {
    setTarget(refElement.current);
  }, []);

  useMutateObserver(target!, onMutate, options);

  if (!children) {
    return;
  }

  return cloneElement(children, { ref: refElement });
};

export default MutateObserver;
