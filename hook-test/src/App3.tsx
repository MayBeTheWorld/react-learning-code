import { produce } from "immer"
import { Reducer, useReducer } from "react"

interface Data {
    result: number
}

interface Action {
    type: 'add' | 'minus',
    num: number
}

// React 推崇的是数据不可变，在 react 里，只要涉及到 state 的修改，就必须返回新的对象，不管是 useState 还是 useReducer
// 你直接修改原始的 state 返回，是触发不了重新渲染的，因为对象的引用没变化，必须返回一个新的对象才行，如示例1
// 如果对象结构很复杂，每次都创建一个新的对象会比较繁琐，而且性能也不好。
// 这个时候就可以使用 immutable 相关的库，最常用的是 immer ，用法如示例2

function reducer (state: Data, action: Action) {
    switch(action.type) {
        case 'add':
            // return {
            //     result: state.result + action.num
            // }

            // 示例1
            // state.result += action.num
            // return state 

            // 示例2
            return produce(state, (state) => {
                state.result += action.num
            })

        case 'minus': 
            return {
                result: state.result - action.num
            }
    }
    return state
}

function App () {
    const [res, dispatch] = useReducer<Reducer<Data, Action>>(reducer, { result: 0} );

    return (
        <div>
            <div onClick={() => dispatch({type: 'add', num: 2})}>加</div>
            <div onClick={() => dispatch({type: 'minus', num: 1})}>减</div>
            <div>{res.result}</div>
        </div>
    );
}

export default App;