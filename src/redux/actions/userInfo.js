export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAIL = "GET_USER_INFO_FAIL";

function getUserInfoRequest() {
    return {
        type: GET_USER_INFO_REQUEST
    }
}
function getUserInfoSuccess(userInfo) {
    return {
        type: GET_USER_INFO_SUCCESS,
        userInfo: userInfo
    }
}
function getUserInfoFail() {
    return {
        type: GET_USER_INFO_FAIL
    }
}

export function getUserInfoFun() {
    return function (dispatch) {
        dispatch(getUserInfoRequest());

        return fetch('/api/user.json')
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                dispatch(getUserInfoSuccess(json));
            })
            .catch(() => {
                dispatch(getUserInfoFail());
            })
    }
}