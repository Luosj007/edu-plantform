import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://localhost:7001/admin/question/getList',
    method: 'get',
    params
  })
}

export function doubt(data) {
  return request({
    url: 'http://localhost:7001/admin/question/doubt',
    method: 'post',
    data
  })
}

