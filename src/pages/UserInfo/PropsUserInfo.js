import React, {Component} from 'react';

class PropsUserInfo extends Component{
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div>
                姓名：{this.props.name}
            </div>
        )
    }
}

export default PropsUserInfo