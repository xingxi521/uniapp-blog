import request from '../../utils/request.js'

// 热搜文章类型
export function getHotTabsList() {
	return request({
		url: '/hot/tabs',
		method: 'get'
	})
}
// 获取热搜文章列表
export function getHotList(type) {
	return request({
		url: '/hot/list',
		method: 'get',
		data: {
			type
		}
	})
}