import LoadingVue from './02/index'
const $loading = {
  install: (Vue) => {
    // 通过 Vue.extend方法 获取LoadingComponent 组件 类
    const LoadingComponent = Vue.extend(LoadingVue);
    // new LoadingComponent得到组件的实例
    const vm = new LoadingComponent();
    // 获取组件实例的html 并插入到body中
    const tpl = vm.$mount().$el;
    // 插入到body中
    document.body.appendChild(tpl);
    // 添加 显示loading方法
    Vue.prototype.$showLoading = () => {
      // 通过改变实例 .mask v-show绑定变量控制显示
      vm.isShow += 1
    }
    // 添加关闭loading方法
    Vue.prototype.$hideLoading = () => {
      // 通过改变实例 .mask v-show绑定变量控制隐藏
      vm.isShow -= 1
    }
  }
}
export default $loading;
