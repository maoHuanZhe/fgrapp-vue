import request from '@/utils/request'

// 查询列表
export function page(query) {
  return request({
    url: '/page',
    method: 'get',
    params: query
  })
}
// 查询列表
export function readTop() {
  return request({
    url: '/page/readTop',
    method: 'get'
  })
}
// 查询列表
export function randomList(query) {
  return request({
    url: '/page/randomList',
    method: 'get',
    params: query
  })
}
export function list() {
  return request({
    url: '/page/list',
    method: 'get'
  })
}
// 查询详细
export function getInfo(id) {
  return request({
    url: '/func/' + id,
    method: 'get'
  })
}
// 查询详细
export function getDetailInfo(id) {
  return request({
    url: '/page/detail/' + id,
    method: 'get'
  })
}
// 博客点赞操作
export function updateLickNum(id) {
  return request({
    url: '/func/liked/' + id,
    method: 'put',
    headers: {
      isToken: true
    }
  })
}
// 添加评论
export function addComment(data) {
  return request({
    url: '/page/topic',
    method: 'post',
    data: data
  })
}

// 获取操作数据
export function getNum() {
  return request({
    url: '/page/num',
    method: 'get'
  })
}
