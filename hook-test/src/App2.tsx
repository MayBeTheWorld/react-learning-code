import { useEffect, useState } from "react";

// 由于useEffect 参数的那个函数不支持 async，使用 async await 语法需要单独写一个函数
async function queryData() {
  const data = await new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(666);
    }, 2000)
  })
  return data;
}


function App() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    console.log('xxx')
    queryData().then(data => {
      setNum(data)
    })
  // 这里传入的第二个参数叫做依赖数组，react 是根据它有没有变来决定是否执行 effect 函数的，如果没传则每次都执行
  }, [1, 2, 3, Date.now()])
  
  // useEffect 里如果跑了一个定时器，依赖变了之后，再次执行 useEffect，又跑了一个，清理上一个定时器
  useEffect(() => {
    console.log('effect')
    const timer = setInterval(() => {
      console.log(num);
    }, 1000);

    return () => {
      console.log('clear up')
      clearInterval(timer);
    }
  }, [num])

  return (
    <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
  );
}

export default App;