export const useForceUpdateCodeString = `import { useReducer } from "react";

function useForceUpdate(): () => void {
  const [, update] = useReducer((num: number): number => num + 1, 0);

  return update;
}

export default useForceUpdate;`;
