import App from '../App'

export default [{
    path: '/',
    component: App,
    children: [{
        path: '',
        component: r => require.ensure([], () => r(require('../page/home')), 'home')
    }, {
        path: '/wei3d',
        component: r => require.ensure([], () => r(require('../page/wei3d/index.vue')), 'index')
    }, {
        path: '/answer',
        component: r => require.ensure([], () => r(require('../page/wei3d/answer.vue')), 'answer')
    }, {
        path: '/score',
        component: r => require.ensure([], () => r(require('../page/score')), 'score')
    }]
}]