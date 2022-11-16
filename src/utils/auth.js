import Cookies from 'js-cookie'

const TokenKey = 'fgrapp-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token, { path: '/', domain: 'fgrapp.com' })
  return Cookies.set(TokenKey, token, { path: '/'})
}

export function removeToken() {
  return Cookies.remove(TokenKey, { path: '/'})
}
