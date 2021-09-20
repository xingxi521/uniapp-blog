export default {
	namespaced: true,
	state: () => {
		return {
			// 历史数据
			historyData: uni.getStorageSync('historyData') || []
		}
	},
	mutations: {
		// 保存数据到本地存储
		saveStorage(state) {
			uni.setStorageSync('historyData', state.historyData)
		},
		// 单个标签删除
		removeHistory(state, text) {
			const index = state.historyData.findIndex(item => item === text)
			state.historyData.splice(index, 1)
			this.commit('search/saveStorage')
		},
		// 删除全部
		removeAll(state) {
			state.historyData = []
			this.commit('search/saveStorage')
		},
		// 保存历史数据
		saveHistoryData(state, val) {
			const index = state.historyData.findIndex(item => item === val)
			if (index !== -1) {
				state.historyData.splice(index, 1)
			}
			state.historyData.unshift(val)
			// 超过10个就删除10个以后的所有数据
			if (state.historyData.length > 10) {
				state.historyData.splice(10, state.historyData.length - 10)
			}
			this.commit('search/saveStorage')
		}
	}
}