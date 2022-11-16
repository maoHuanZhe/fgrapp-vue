const getters = {
  //登录凭证
  token: state => state.user.token,
  //分类列表
  classMap: state => state.user.classMap,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  avatar: state => state.user.avatar,
  isAdmin: state => state.user.isAdmin,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  showRegister: state => state.user.showRegister,
  topbarRouters:state => state.permission.topbarRouters,
  defaultRoutes:state => state.permission.defaultRoutes,
  sidebarRouters:state => state.permission.sidebarRouters,
}
export default getters
