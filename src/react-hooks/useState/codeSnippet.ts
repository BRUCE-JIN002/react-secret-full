export const useStateCode = `
import { useState } from "react";

function App() {
  const [num, setNum] = useState(1);

  return (
    <div onClick={() => setNum(num + 1)}>{num}</div>
  );
}

export default App;
`;

export const useStateFuncUpdateCode = `
import { useState } from "react";

function App() {
  //传入函数进行惰性初始化
  const [num, setNum] = useState<number>(() => {
    const num1 = 1 + 2;
    const num2 = 2 + 3;
    return num1 + num2;
  });
  //set时通过函数取最新的state值
  return <div onClick={() => setNum((pre) => pre + 1)}>{num}</div>;
};

export default App;
`;
