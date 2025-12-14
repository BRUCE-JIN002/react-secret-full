export const useCounterCodeString = `import { useState } from "react";

const useCounter = (initialValue: number = 0) => {
  const [current, setCurent] = useState(initialValue);

  const add = (number = 1) => setCurent((v) => v + number);
  const dec = (number = 1) => setCurent((v) => v - number);
  const set = (number = 1) => setCurent(number);

  return [
    current,
    {
      add,
      dec,
      set,
    },
  ] as const;
};

export default useCounter;`;
