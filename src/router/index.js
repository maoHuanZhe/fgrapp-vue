import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
Vue.use(Router)

import Layout from '@/layout'
import store from "@/store";

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/page',
    component: Layout,
    children: [
      {
        path: '',
        component: (resolve) => require(['@/views/topic/list'], resolve)
      },
      {
        path: 'class/:classId',
        component: (resolve) => require(['@/views/topic/list'], resolve)
      },
      {
        path: 'time',
        component: (resolve) => require(['@/views/topic/timeline/index'], resolve)
      },
      {
        path: 'profile',
        component: (resolve) => require(['@/views/topic/profile/index'], resolve),
        meta: { title: '关于我'}
      },
      {
        path: 'detail/:topicId',
        component: (resolve) => require(['@/views/topic/detail/index'], resolve)
      },
      {
        path: 'add',
        component: (resolve) => require(['@/views/topic/add/index'], resolve),
        hidden: true,
        name: 'Add',
        meta: { title: '添加问题', noCache: true, affix: false }
      },
      {
        path: 'edit/:topicId',
        component: (resolve) => require(['@/views/topic/add/index'], resolve),
        meta: { title: '修改问题'}
      }
    ]
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    meta: { title: '404'}
  },
  {
    path: '*',
    redirect: '/page',
  }
]

const router = new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta.title && store.dispatch('settings/setTitle', to.meta.title)
  next();
});
router.afterEach(() => {
  NProgress.done()
})
export default router
