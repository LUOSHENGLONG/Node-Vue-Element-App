// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入默认初始化样式
import '@/assets/css/reset.css'
import axios from './http'
import moment from 'moment'


Vue.use(ElementUI)
Vue.prototype.axios = axios

Vue.config.productionTip = false

Vue.filter('dateFormat', dataStr => {
    dataStr = parseInt(dataStr)
    moment.locale('zh-cn') //设置中文显示
    return moment(dataStr).format('YYYY-MM-DD HH:mm:ss');
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
