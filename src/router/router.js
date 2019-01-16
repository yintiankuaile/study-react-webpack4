import React from 'react';

import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom';


import Index from '../pages/Index/Index'
import Home from '../pages/Home/Home';
import Page from '../pages/Page/Page';
import Counter from '../pages/Counter/Counter'
import UserInfoComponent from '../pages/UserInfo/UserInfoComponent'


const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/page">Page</Link></li>
                <li><Link to="/counter">Counter</Link></li>
                <li><Link to="/userinfocomponent">UserInfo</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={Index}/>
                <Route path="/home" component={Home}/>
                <Route path="/page" component={Page}/>
                <Route path="/counter" component={Counter}/>
                <Route path="/userinfocomponent" component={UserInfoComponent}/>
            </Switch>
        </div>
    </Router>
);
export default getRouter;