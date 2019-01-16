import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getUserInfoFun } from "../../redux/actions/userInfo";

import PropsUserInfo from "./PropsUserInfo"

class UserInfoComponent extends Component{
    render() {
        const {
            userInfo: {isLoading,userInfo,errorMsg},
            getUserInfoFun
        } = this.props;
        return (
            <div>
                {isLoading ? '请求信息中。。。。。。' :errorMsg || (
                    <div>
                        <p>用户信息：</p>
                        <p>用户名：{userInfo.name}</p>
                        <p>介绍：{userInfo.inform}</p>
                        <PropsUserInfo name={userInfo.name}/>
                    </div>
                )}
                <button onClick={() => getUserInfoFun()}>请求用户信息</button>
            </div>
        )
    }
}

export default connect(
    state => ({userInfo: state.userInfo}),
    { getUserInfoFun }
)(UserInfoComponent);