export default {
	namespaced: true,
	state: () => {
		return {
			videoData: {}
		}
	},
	mutations: {
		// 设置视频数据
		setVideoData(state, data) {
			state.videoData = data
		}
	}
}