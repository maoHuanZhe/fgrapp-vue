import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/func/class/page',
    method: 'get',
    params: query
  })
}
export function list() {
  return request({
    url: '/page/classList',
    method: 'get'
  })
}

export function getInfo(id) {
  return request({
    url: '/func/class/' + id,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/func/class',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: '/func/class',
    method: 'put',
    data: data
  })
}
export function blogSort(data) {
  return request({
    url: '/func/class/blogSort',
    method: 'put',
    data: data
  })
}


export function dels(ids) {
  return request({
    url: '/func/class/' + ids,
    method: 'delete'
  })
}
