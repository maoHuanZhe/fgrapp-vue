<template>
  <el-container ref="container" class="container">
    <el-header height="65px" style="padding: 0;">
      <Header @loginOrReg="loginOrReg" />
    </el-header>
    <el-main class="main" style="padding: 0">
      <el-container class="container">
        <el-aside width="400px" style="position: relative;padding:0;margin: 0;background: #eef1f6;">
          <ClassList :list="classList" :class-id="defaultActive" />

          <Footer />
        </el-aside>
        <el-main>
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </el-main>
      </el-container>
    </el-main>
    <el-dialog :visible.sync="showRegister" :before-close="closeRegister" width="1100px" append-to-body>
      <register />
    </el-dialog>
  </el-container>
</template>

<script>
import { list } from '@/api/func/class'
import Register from '@/components/register'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { mapGetters } from 'vuex'
import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import ClassList from '@/components/ClassList/02'
export default {
  name: 'Index',
  components: {
    Register,
    Footer,
    Header,
    ClassList
  },
  data() {
    return {
      userName: '',
      open: false,
      loading: false,
      mainOptions: [],
      otherOptions: [],
      defaultActive: 'home',
      classList: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'showRegister',
      'avatar'
    ])
  },
  created() {
    // 获取分类编号
    const classId = this.$route.params && this.$route.params.classId
    if (classId) {
      this.defaultActive = classId + ''
    }
    // 获取分类列表
    list().then(({ data }) => {
      this.classList = data
      const classMap = {}
      data.forEach(item => {
        classMap[item.id] = item.name
      })
      store.dispatch('ClassMap', classMap)
    })
    // 获取当前用户
    if (getToken()) {
      // 已登录
      if (!store.getters.name) {
        // 未获取用户信息  获取用户信息
        store.dispatch('GetInfo')
      }
    }
  },
  methods: {
    goto() {
      window.open('https://admin.fgrapp.com')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.go(0)// 页面重新刷新
        })
      })
    },
    loginOrReg() {
      // 登陆或注册
      store.commit('SET_SHOWREGISTER', true)
    },
    closeRegister() {
      // 登陆或注册
      store.commit('SET_SHOWREGISTER', false)
    },
    handleSelect(key) {
      const path = this.$route.path
      if (key === 'home') {
        if (path !== '/') {
          return this.$router.push('/')
        }
      } else {
        if (this.$route.params.classId !== key) {
          this.$router.push('/class/' + parseInt(key))
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      margin-top: 5px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .site-nav {
    position: fixed;
    z-index: 1996;
    width: 100%;
    background-color: #f5f5f5;
    border-bottom: 1px solid #eee;
    *zoom: 1;
  }
  .site-nav .site-nav-bd {
    max-width: 900px;
    width: 100%;
    height: 50px;
    background: #f5f5f5;
    -webkit-backface-visibility: hidden;
    *zoom: 1;
  }
  .container {
    color: #3C3C3C;
    -webkit-font-smoothing: antialiased;
    background: #fff url("~@/assets/images/backgroud.png") repeat-y 0 36px;
    background-size: cover;
    height: 100%;
  }
  .main{
    width: 100%;
    margin: 0 auto;
  }
  .el-footer{
    height: 70px;
    text-align: center;
    width: 100%;
    bottom: 0;
  }
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-size: cover;
  }
  .title {
    margin: 0 auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    height: 38px;
    float: right;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial,serif;
    font-size: 12px;
    letter-spacing: 1px;
  }
  .login-code-img {
    height: 38px;
  }
</style>
