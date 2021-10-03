import request from '../../utils/request.js'

// 热搜文章类型
export function login(data) {
	return request({
		url: '/sys/login',
		method: 'post',
		data
	})
}