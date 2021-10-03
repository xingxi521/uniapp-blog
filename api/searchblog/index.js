import request from '../../utils/request.js'
// 获取默认搜索内容
export function getDefaultText() {
	return request({
		url: '/search/default-text',
		method: 'get'
	})
}
// 获取热搜列表
export function getSearchHotList() {
	return request({
		url: '/search/hot-list',
		method: 'get'
	})
}
// 获取搜索内容结果
export function getSearchResultList(data) {
	return request({
		url: '/search',
		method: 'get',
		data
	})
}

// 关注接口
export function follow(data) {
	return request({
		url: '/user/follow',
		method: 'get',
		data
	})
}

// 发表评论
export function comment(data) {
	return request({
		url: '/user/article/comment',
		method: 'post',
		data
	})
}

// 点赞
export function praise(data) {
	return request({
		url: '/user/praise',
		method: 'get',
		data
	})
}

// 收藏
export function collect(data) {
	return request({
		url: '/user/collect',
		method: 'get',
		data
	})
}