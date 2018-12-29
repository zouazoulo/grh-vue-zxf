import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home.vue')), 'home');
const more = r => require.ensure([], () => r(require('../page/more/more.vue')), 'more');
const shopCart = r => require.ensure([], () => r(require('../page/shopCart/shopCart.vue')), 'shopCart');
const my = r => require.ensure([], () => r(require('../page/my/my.vue')), 'my');
const login = r => require.ensure([], () => r(require('../page/login/login.vue')), 'login');
const regsiter = r => require.ensure([], () => r(require('../page/login/regsiter.vue')), 'regsiter');
const userInfo = r => require.ensure([], () => r(require('../page/my/userInfo/userInfo.vue')), 'userInfo');
const messageChange = r => require.ensure([], () => r(require('../page/my/userInfo/messageChange.vue')), 'messageChange');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children:[
        {
          path:'',
          redirect: '/home',
        },
        {  //主页
          path:'/home',
          component:home,
        },
        {  //更多商品
          path:'/more',
          component:more,
        },
        {  //购物车
          path:'/shopCart',
          component:shopCart,
        },
        {  //我
          path:'/my',
          component:my,
        },
        { //登录
          path:'/login',
          component:login,
        },
        { //注册
          path:'/regsiter',
          component:regsiter,
        },
        { //用户信息
          path:'/my/userInfo',
          component:userInfo,
        },
        { //更换手机号码
          path:'/my/userInfo/messageChange',
          component:messageChange,
        }
      ]
    }
  ]
})
