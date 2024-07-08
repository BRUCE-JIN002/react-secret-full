import { useSafeState } from "ahooks";
import { useEffect } from "react";
import getTarget from "../../common/utils/getTarget";

type Options = Pick<
  IntersectionObserverInit,
  "root" | "rootMargin" | "threshold"
>;

const useInViewport = (target: any, options: Options) => {
  const [inviewport, setInViewport] = useSafeState<boolean>();
  const [ratio, setRatio] = useSafeState<number>();

  useEffect(() => {
    const element = getTarget(target);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setInViewport(entry.isIntersecting);
          setRatio(entry.intersectionRatio);
        }
      },
      {
        ...options,
        root: options?.root ? getTarget(options.root) : null,
      }
    );
    observer?.observe(element);

    return () => observer?.disconnect();
  }, [target]);

  return [inviewport, ratio] as const;
};

export default useInViewport;
