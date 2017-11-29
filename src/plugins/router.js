import Vue from 'vue';
import Router from 'vue-router';
import Pages from '../pages/index';
import * as Constants from '../assets/js/Constants';

function addRouter(name, meta) {
    routes.push({
        path: '/' + name.replace(/-/g, '/'),
        name: name,
        component: Pages[name],
        meta: Object.assign({keepAlive: true}, meta)
    });
}

Vue.use(Router);

let routes = [{
    path: '/',
    name: Constants.PageName.main,
    component: Pages.main,
    meta: {keepAlive: true, title: '主页'},
    children: [
        {
            path: Constants.PageName.qaIndex,
            name: Constants.PageName.qaIndex,
            component: Pages[Constants.PageName.qaIndex]
        },
        {
            path: Constants.PageName.qaUser,
            name: Constants.PageName.qaUser,
            component: Pages[Constants.PageName.qaUser],
            meta: {title: '我的'}
        }
    ]
}];

addRouter(Constants.PageName.template, {title: '测试页面'});
addRouter(Constants.PageName.qaDetail, {title: '问答详情'});
addRouter(Constants.PageName.qaAsk, {title: '提问'});
addRouter(Constants.PageName.qaResponse, {title: '回复'});
addRouter(Constants.PageName.qaComment, {title: '评论'});
// addRouter(Constants.PageName.qaUser, {title: '我的'});
//addRouter(Constants.PageName.qaIndex, {title: '问答'});

let router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title;
    }

    next();
});

export default router;