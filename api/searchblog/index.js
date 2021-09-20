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