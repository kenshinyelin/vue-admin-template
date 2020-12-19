import request from '@/utils/request'

export function getInfo(token) {
  return request({
    url: '/users/info',
    method: 'get',
    params: { token } // url序列化参数
  })
}

export function logout() {
  return request({
    url: '/users/logout',
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/checklogin',
    method: 'post',
    data
  })
}
