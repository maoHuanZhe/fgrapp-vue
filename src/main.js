import Vue from 'vue'

import Element from 'element-ui'

import '@/assets/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

import './assets/icons' // icon

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

VueMarkdownEditor.use(createEmojiPlugin());
VueMarkdownEditor.use(createCopyCodePlugin());
VueMarkdownEditor.use(createLineNumbertPlugin());
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  extend(md) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
  },
  codeHighlightExtensionMap: {
    vue: 'html',
  },
});

Vue.use(VueMarkdownEditor);

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
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
