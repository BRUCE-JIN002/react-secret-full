export const useUnmountedRefCodeString = `import { useEffect, useRef } from "react";

const useUnmountedRef = (): { readonly current: boolean } => {
  const unMountedRef = useRef<boolean>(false);

  useEffect(() => {
    unMountedRef.current = false;

    return () => {
      unMountedRef.current = true;
    };
  }, []);

  return unMountedRef;
};

export default useUnmountedRef;`;
