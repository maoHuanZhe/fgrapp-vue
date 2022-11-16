import request from '@/utils/request'

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/user/getInfo',
    method: 'get'
  })
}



// 退出方法
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

// 发送验证码
export function sendCode(phoneOrEmail) {
  return request({
    url: '/login/'+phoneOrEmail,
    method: 'get'
  })
}

// 注册登录接口
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}
