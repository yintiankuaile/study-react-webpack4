/**
 * @date 2019/1/2  
 * @author 赵磊
 * @Description: 一个项目有很多的reducers,要把他们整合到一起 src/redux/reducers.js
*/

import counter from './reducers/couter';
import userInfo from './reducers/userInfo'

export default function combineReducers(state = {},action) {
    return {
        counter: counter(state.counter,action),
        userInfo: userInfo(state.userInfo, action)
    }
}