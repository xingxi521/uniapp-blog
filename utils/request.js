const BASE_URL = 'https://api.imooc-blog.lgdsunday.club/api'
import store from '../store/index.js'
function request({ url, method, data }) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			header: {
				Authorization: store.state.user.token
			},
			method,
			data,
			success: ({ data }) => {
				if (data.success) {
					resolve(data)
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none',
						mask: true,
						duration: 3000
					})
					reject(data.message)
				}
			},
			fail: (error) => {
				reject(error)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}
export default request