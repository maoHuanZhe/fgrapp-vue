import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    isAdmin: false,
    showRegister:false,
    classMap: {}
  },

  mutations: {
    SET_CLASSMAP: (state, classMap) => {
      state.classMap = classMap
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ADMIN: (state, isAdmin) => {
      state.isAdmin = isAdmin
    },
    SET_SHOWREGISTER: (state, permissions) => {
      state.showRegister = permissions
    }
  },

  actions: {
    // 设置分类列表
    ClassMap({ commit }, map) {
        commit('SET_CLASSMAP', map)
    },
    // 登录
    Login({ commit }, info) {
      return new Promise((resolve, reject) => {
        login(info).then(res => {
          setToken(res.data)
          commit('SET_TOKEN', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.data;
          const avatar = !user.avatar ? require("@/assets/images/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
          commit('SET_NAME', user.nickName)
          commit('SET_ADMIN', user.isAdmin)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          commit('SET_NAME', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
