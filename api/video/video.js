import request from '../../utils/request.js'
// 获取热播列表数据
export function getVideoList() {
	return request({
		url: '/video/list',
		method: 'get'
	})
}

// 获取弹幕所有数据
export function getDanmuAllList(data) {
	return request({
		url: '/video/danmu',
		method: 'get',
		data
	})
}

// 获取弹幕列表分页数据
export function getDanmuList(data) {
	return request({
		url: '/video/comment/list',
		method: 'get',
		data
	})
}
