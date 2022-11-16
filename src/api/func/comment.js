import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/func/comment/page',
    method: 'get',
    params: query
  })
}
export function list() {
  return request({
    url: '/func/comment/list',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/func/comment',
    method: 'put',
    data: data
  })
}

export function dels(ids) {
  return request({
    url: '/func/comment/' + ids,
    method: 'delete'
  })
}
