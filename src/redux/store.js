/**
 * @date 2019/1/2  
 * @author 赵磊
 * @Description: 我们可以使用 action 来描述“发生了什么”，使用action创建函数来返回action。
 * 还可以使用 reducers 来根据 action 更新 state 。
 * 那我们如何提交action？提交的时候，怎么才能触发reducers呢？
 * store 就是把它们联系到一起的对象。
 * store 有以下职责：
 * 1.提供 getState() 方法获取 state；
 * 2.提供 dispatch(action) 触发reducers方法更新 state；
 * 3.通过subscribe(listener) 注册监听器;
 * 4.通过 subscribe(listener) 返回的函数注销监听器。
*/

import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk';
import combineReducers from './reducers';
const store = createStore(combineReducers, applyMiddleware(thunkMiddleware));
export default store;