import Vue from 'vue'

import Element from 'element-ui'

import '@/assets/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

import './assets/icons' // icon

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

import $loading from "@/components/Load/loading";
Vue.use($loading)
// 全局方法挂载
Vue.prototype.dayjs = dayjs

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

/**
 * 过滤器
 */
Vue.filter('className', function (value) {
  return store.getters.classMap[value]
})
Vue.filter('typeName', function (value) {
  return value === 0 ? "问题" : "博客"
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
