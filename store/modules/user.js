import { login } from '@/api/my/index.js'
export default {
	namespaced: true,
	state: () => {
		return {
			token: uni.getStorageSync('token') || '',
			userInfo: uni.getStorageSync('userInfo') || {}
		}
	},
	mutations: {
		// 保存token到vuex
		saveToken(state, token) {
			state.token = token
			this.commit('user/saveTokenStorage')
		},
		// 保存用户信息到vuex
		saveUserInfo(state, userInfo) {
			state.userInfo = userInfo
			this.commit('user/saveUserInfoStorage')
		},
		// 保存token到本地存储
		saveTokenStorage(state) {
			uni.setStorage({
				key: 'token',
				data: state.token
			})
		},
		// 保存用户信息到本地存储
		saveUserInfoStorage(state) {
			uni.setStorage({
				key: 'userInfo',
				data: state.userInfo
			})
		},
		// 清空token
		clearToken(state) {
			state.token = ''
			state.userInfo = {}
			this.commit('user/saveTokenStorage')
			this.commit('user/saveUserInfoStorage')
		}
	},
	actions: {
		// 登录
		async login(context, userProfile) {
			const { userInfo } = userProfile
			const { data: res } = await login({
				signature: userProfile.signature,
				iv: userProfile.iv,
				nickName: userInfo.nickName,
				gender: userInfo.gender,
				city: userInfo.city,
				province: userInfo.province,
				avatarUrl: userInfo.avatarUrl
			})
			this.commit('user/saveToken', res.token)
			this.commit('user/saveUserInfo', userInfo)
		},
		// 退出登录
		logout(context) {
			this.commit('user/clearToken')
		},
		// 检测登录状态
		async checkLogin(context) {
			if (!context.state.token) {
				const result = await uni.showModal({
					title: '登录后才能进行后续操作',
					content: '是否立马跳转到登录页面?'
					
				})
				const [error, success] = result
				const { cancel, confirm } = success
				if (confirm) {
					uni.navigateTo({
						url: '/subpkg/pages/MyLogin/MyLogin'
					})
				}
				return false
			} else {
				return true
			}
		}
	}
}