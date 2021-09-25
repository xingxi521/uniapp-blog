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

// 获取文章详情数据
export function getArticleDetails(data) {
	return request({
		url: '/article/details',
		method: 'get',
		data
	})
}

// 获取文章评论数据
export function getCommentList(data) {
	return request({
		url: '/article/comment/list',
		method: 'get',
		data
	})
}
