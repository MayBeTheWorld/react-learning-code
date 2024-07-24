import { resolve } from "path";
import { useState } from "react";

function App() {
  // useState 返回一个数组，包含 state 和 setXxx 的 api，一般我们都是用解构语法取
  const [num, setNum] = useState(() => {
    const num1 = 1 + 2
    const num2 = 2 + 3
    return num1 + num2
  });

  return (
    // setXxx 的 api, 可以直接传新的值，或者传一个函数，返回新的值(这个函数的参数是上一次的 state)
    <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
  );
}

export default App;