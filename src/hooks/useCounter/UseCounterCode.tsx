import { Code } from "../../components/code/Code";
import { HooksType } from "../../menu/Menu";

const UseCounterCode: React.FC = () => {
  return (
    <Code
      codeString={useCounterCodeString}
      fileName="useCounter.ts"
      id={HooksType.UseCounter}
    />
  );
};

export default UseCounterCode;

const useCounterCodeString = `import { useState } from "react";

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
