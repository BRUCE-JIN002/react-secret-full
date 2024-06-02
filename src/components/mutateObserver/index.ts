import React, { useLayoutEffect } from "react";
import useMutateObserver from "../../hooks/useMutateOberver";

interface MutationObserverProps {
  options?: MutationObserverInit;
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void;
  children: React.ReactElement;
}

const MutateObserver: React.FC<MutationObserverProps> = (props) => {
  const { options, onMutate = () => {}, children } = props;

  const elementRef = React.useRef<HTMLElement>(null);
  const [target, setTarget] = React.useState<HTMLElement>();

  useLayoutEffect(() => {
    setTarget(elementRef.current!);
  }, []);

  useMutateObserver(target!, onMutate, options);

  if (!children) {
    return null;
  }

  return React.cloneElement(children, { ref: elementRef });
};

export default MutateObserver;
