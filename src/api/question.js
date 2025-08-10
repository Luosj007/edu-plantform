// 这是接口
import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://localhost:7001/admin/question/getList',
    method: 'get',
    params
  })
}

export function getDoubt(data) {
  return request({
    url: 'http://localhost:7001/admin/question/getDoubt',
    method: 'post',
    data
  })
}

