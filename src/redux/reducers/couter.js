/**
 * @date 2019/1/2
 * @author 赵磊
 * @Description: 这是项目其中的一个reducers,一个项目有很多reducers
 * reducer就是纯函数，接收state 和 action，然后返回一个新的 state
*/

import { INCREMENT, DECREMENT, RESET} from "../actions/couter";

//初始化state
const initState = {
    count: 0,
};

//render
export default function reducer(state = initState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count +1,
            };
        case DECREMENT:
            return {
                count: state.count -1,
            };
        case RESET:
            return {
                count: 0
            };
        default:
            return state;
    }
}