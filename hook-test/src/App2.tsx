import { useEffect, useLayoutEffect, useState } from "react";

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

  // 绝大多数情况下，你把 useEffect 换成 useLayoutEffect 效果是一样的，不同的是 useEffect 存在的异步的 effect 执行的回调会在渲染后执行
  // useLayoutEffect 存在异步的 effect 执行是同步的，也就是在同一个任务。这样浏览器会等 effect 逻辑（包括异步逻辑）执行完再渲染
  useLayoutEffect(() => {++
    console.log('xxx')
    queryData().then(data => {
      setNum(data)
    })
  }, [1, 2, 3, Date.now()])
  
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