<template>
  <div class="login-box">
    <div class="login-box-formbox">
      <div class="login-box-login">
        <h1>Welcome to FGRAPP</h1>
        <p>
          未注册手机/邮箱验证后自动登录
        </p>
        <form action="#">
          <div>
            <label> 手机/邮箱 </label>
            <input v-model="form.phoneOrEmail" type="text" class="input-email">
          </div>
          <div>
            <label> 验证码 </label>
            <input v-model="form.code" type="text" class="input-password">
            <el-link v-if="showSec" class="codeLink" :underline="false" type="danger">{{ sec }}</el-link>
            <el-button v-else class="codeBtn" type="primary" :loading="loading" @click="getCode">获取验证码</el-button>
          </div>
          <div>
            <el-button style="width:100%;" type="primary" :loading="registerLoading" @click="handRegister">登录/注册</el-button>
          </div>
        </form>
      </div>
    </div>
    <div class="login-box-quotebox">
      <div class="quote-container">
        <div class="quote">Make a Dream.</div>
        <div class="quote-small">
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
          repellendus cumque voluptatum animi, illum veniam?"
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendCode } from '@/api/login'
export default {
  name: 'Index',
  data() {
    return {
      loading: false,
      registerLoading: false,
      showSec: false,
      sec: 60,
      form: {
        phoneOrEmail: '',
        code: ''
      }
    }
  },
  methods: {
    verifyForm(flag) {
      // 校验phoneOrEmail
      // 校验是否是手机号
      var phoneExp = new RegExp('^1[34578]\\d{9}$')
      // 校验是否是邮箱
      var emailExp = new RegExp('^([a-z0-9A-Z]+[-|_|.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$')
      if (!phoneExp.test(this.form.phoneOrEmail) && !emailExp.test(this.form.phoneOrEmail)) {
        this.$message.warning('请输入正确的手机号或邮箱地址')
        return false
      }
      if (flag && this.form.code.length !== 6) {
        // 校验code
        this.$message.warning('请输入6位验证码')
        return false
      }
      return true
    },
    getCode() {
      if (this.verifyForm(false)) {
        this.loading = true
        sendCode(this.form.phoneOrEmail).then(() => {
          this.showSec = true
          var interval = setInterval(() => {
            if (this.sec) {
              this.sec--
            } else {
              clearInterval(interval)
              this.showSec = false
              this.sec = 60
            }
          }, 1000)
        }).finally(() => {
          this.loading = false
        })
      }
    },
    handRegister() {
      if (this.verifyForm(true)) {
        this.registerLoading = true
        this.$store.dispatch('Login', this.form).then(() => {
          this.$message.success('登录成功')
          this.$router.go(0)// 页面重新刷新
        }).finally(() => {
          this.registerLoading = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;400;600;700&display=swap");

$clr-bg-main: #ebeef7;
$clr-bg-box: #ffffff;
$clr-bg-quote: #2028eb;
$clr-bg-quote-hover: #0f1396;
$clr-text-main: #bebebe;
$clr-text-headline: #131125;
$clr-text-link: #a0a4e3;
$clr-accent: #93f8e0;

* {
  box-sizing: border-box;
}

h1 {
  font-size: 2.5em;
  color: $clr-text-headline;
  font-weight: 700;
  margin: 0;
}

p {
  line-height: 180%;
}
.codeBtn {
  position: absolute;
  right: 7px;
  top: 30px;
}
.codeLink {
  position: absolute;
  right: 15px;
  top: 35px;
  font-size: 20px;
  font-weight: 600;
}
.login-box {
  display: flex;
  width: 75em;
  height: 65vh;
  min-height: 60em;
  border-radius: 20px;
  background-color: $clr-bg-box;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.025);
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
}

.login-box-formbox,
.login-box-quotebox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1 100%;
  //   width: 100%;
  padding: 4em 6em;
}

.login-box-quotebox {
  color: white;
  background-color: $clr-bg-quote;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="%235257f0" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 17.6l-2 -1.1v-2.5"></path><path d="M4 10v-2.5l2 -1.1"></path><path d="M10 4.1l2 -1.1l2 1.1"></path><path d="M18 6.4l2 1.1v2.5"></path><path d="M20 14v2.5l-2 1.12"></path><path d="M14 19.9l-2 1.1l-2 -1.1"></path><line x1="12" y1="12" x2="14" y2="10.9"></line><line x1="18" y1="8.6" x2="20" y2="7.5"></line><line x1="12" y1="12" x2="12" y2="14.5"></line><line x1="12" y1="18.5" x2="12" y2="21"></line><path d="M12 12l-2 -1.12"></path><line x1="6" y1="8.6" x2="4" y2="7.5"></line></svg>'),
  linear-gradient(
      to right top,
      #0f1396,
      #202199,
      #2d2d9c,
      #38389f,
      #4243a1,
      #4243a1,
      #4142a0,
      #4142a0,
      #36379d,
      #2b2b99,
      #1d1e95,
      #0a0f90
  );
  background-size: 125%;
  background-repeat: no-repeat;
  background-position: center left;
}

.login-box-signup {
  a {
    color: $clr-text-link;
    font-weight: 600;
    text-decoration: inherit;

    &:hover,
    &:focus {
      color: $clr-bg-quote-hover;
    }
  }
}

.login-box-login {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  flex-grow: 1;

  & > * {
    width: 100%;
    flex-shrink: 0;
  }
}

form {
  & > div {
    position: relative;
    padding: 1.5em 0;

    input {
      color: $clr-text-main;
      width: 100%;
      padding: 1.5em 2em;
      border: 1px solid $clr-text-main;
      border-radius: 5px;

      &.input-email,
      &.input-password {
        background-repeat: no-repeat;
        background-position: right 1em top 1.25em;
      }

      &:focus {
        outline-color: $clr-bg-quote;
        border-color: $clr-bg-quote;
      }
    }

    label {
      font-size: 0.85em;
      position: absolute;
      top: 1.25em;
      left: 1.5em;
      background: $clr-bg-box;
      padding: 0 0.5em;
    }

    &:focus-within label {
      color: $clr-bg-quote;
      font-weight: 600;
    }

    .btn {
      color: $clr-bg-box;
      font-size: 1em;
      letter-spacing: 1px;
      line-height: 1;
      background-color: $clr-bg-quote;
      border-color: $clr-bg-quote;
      cursor: pointer;
      transition: all 500ms ease;

      &:hover,
      &:focus {
        background-color: $clr-bg-quote-hover;
        border-color: $clr-bg-quote-hover;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      }
    }
  }
}

.alternate-text {
  display: flex;
  align-items: center;
  margin: 1.5em 0;
  text-align: center;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid $clr-text-main;
  }

  &::before {
    margin-right: 1em;
  }

  &::after {
    margin-left: 1em;
  }
}

.alternate-boxes {
  display: flex;
  justify-content: space-between;
  gap: 1em;
  margin-top: 1.5em;
}

.alternate-box {
  color: $clr-text-headline;
  text-align: center;
  width: 100%;
  padding: 1em 1em;
  border: 1px solid rgba($clr-text-main, 0.5);
  border-radius: 5px;
  cursor: pointer;
  transition: all 500ms ease;

  svg {
    transition: transform 500ms ease;
  }

  &:hover {
    border-color: $clr-text-main;
    background-color: rgba($clr-text-main, 0.25);

    svg {
      transform: scale(1.25);
    }
  }
}

.quote-container {
  padding: 1em 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -4.5em;
    left: -0.65em;
    width: 3.5em;
    height: 3.5em;
    background-color: $clr-accent;
    border-radius: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 15px;
    height: 100%;
    width: 2px;
    background-color: rgba($clr-bg-box, 0.25);
  }
}

.quote {
  color: $clr-bg-box;
  font-size: 7em;
  font-weight: 600;
  line-height: 1;
}

.quote-small {
  color: $clr-bg-main;
  line-height: 180%;
  padding: 2em 0 0 6em;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 2.75em;
    left: 1.2em;
    width: 3em;
    height: 2px;
    background-color: rgba($clr-bg-box, 0.25);
  }
}
</style>
