import request from '@/utils/request'

// 添加评论
export function add(data) {
  return request({
    url: '/func/comment',
    method: 'post',
    data: data
  })
}
