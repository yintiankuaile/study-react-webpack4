import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import getRouter from './router/router';
import store from './redux/store'


const router = getRouter();

//初始化
renderWithHotReload(router);

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <Provider store={store}>{RootElement}</Provider>,
        document.getElementById('root'));
}

// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
    // 实现热更新
    module.hot.accept();
}