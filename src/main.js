// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import animate from 'animate.css'
let lodash = require('lodash')

import 'lib-flexible'

import axios from 'axios' // 引入 axios

// import Mint from 'mint-ui'; // 引用饿了么ui

// Vue.use(Mint);
import 'mint-ui/lib/style.css'
import { CellSwipe, Toast, Indicator, MessageBox } from 'mint-ui';
Vue.prototype.$toast = Toast;
Vue.prototype.$indicator = Indicator;
Vue.prototype.$messagebox = MessageBox;
Vue.component(CellSwipe.name, CellSwipe);

let md5 = require('js-md5') // md5 引入
Vue.prototype.$md5 = md5;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.prototype.HOST =
"http://testapp.guorh.cn/grhapi/server/api.do" //测试


function startLoading() {
  Indicator.open({//打开loading
    text: '加载中...',
    spinnerType: 'fading-circle'
  });
}

let needLoadingRequestCount = 0

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    lodash.debounce(tryCloseLoading, 50)()
  }
}
const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    Indicator.close()
  }
}

axios.interceptors.request.use(function (config) {
  console.log("请求开始")
  showFullScreenLoading()
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use((res) => {
  console.log("请求结束 ")
  tryHideFullScreenLoading()
  return res;
}, (error) => {
  console.log(error)
  Indicator.close();//关闭loading
  return Promise.reject(error);
});

axios.defaults.timeout = 5000;
axios.defaults.retry = 4;
axios.defaults.retryDelay = 5000;
axios.interceptors.response.use((res) => {
      console.log("请求结束 ")
      return res;
    }, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
      return axios(config);
    });
});
Vue.prototype.$ajax = axios //修改Vue的原型属性
