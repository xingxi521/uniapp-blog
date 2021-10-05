<template>
	<view class="login-main">
		<!-- 未登录状态 -->
		<block v-if="!token">
			<image src="/static/images/default-avatar.png" class="circle-image login-img"></image>
			<view class="login-desc">
				登录后可同步数据
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<button type="primary" class="login-btn" @click="loginHandler">微信一键登录</button>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<button type="primary" class="login-btn" @click="loginHfHandler">一键登录</button>
			<!-- #endif -->
		</block>
		<block v-else>
			<image :src="userInfo.avatarUrl" class="circle-image login-img"></image>
			<view class="login-desc">
				{{ userInfo.nickName }}
			</view>
			<button type="default" class="login-btn" @click="logoutHandler">退出登录</button>
		</block>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		name:"Login",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('user', ['token', 'userInfo'])
		},
		methods: {
			...mapActions('user', ['login', 'logout']),
			// 微信登录按钮事件
			loginHandler() {
				uni.showLoading({
					title: '数据正在加载中...',
					mask: true
				})
				uni.getUserProfile({
					desc: '登录成功后可同步数据',
					success: (obj) => {
						console.log(obj)
						this.login(obj)
						this.$emit('onBack')
					},
					fail: () => {
						uni.showToast({
							title: '用户已取消授权',
							icon: 'error'
						})
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			async loginHfHandler() {
				uni.showLoading({
					title: '数据正在加载中...',
					mask: true
				})
				await this.login({
					encryptedData: 'BmGEMqpGI5w',
					errMsg: 'getUserProfile:ok',
					iv: 'c+NbINO4CuEWCBYGG2FxWw==',
					rawData:
						'{"nickName":"CorderX","gender":1,"language":"zh_CN","city":"","province":"","country":"China","avatarUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/Mb6hMmpR9Oia0sMJhvRM7FQo4wvpcibx8TriajWYgCqRhHwYaT4lakbMpA0a21TjBf3Bpib4vYCoDoMK2e5UHxzmLA/132"}',
					signature: '449a10f11998daf680fe546a5176e6e2973516ce',
					userInfo: { nickName: 'CorderX', gender: 1, language: 'zh_CN', city: '', province: '',"avatarUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/Mb6hMmpR9Oia0sMJhvRM7FQo4wvpcibx8TriajWYgCqRhHwYaT4lakbMpA0a21TjBf3Bpib4vYCoDoMK2e5UHxzmLA/132" }
				})
				this.$emit('onBack')
				uni.hideLoading()
			},
			// 退出登录
			logoutHandler() {
				uni.showModal({
					title: '提示',
					content: '退出登录将无法同步数据',
					success: () => {
						this.logout()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.login-main{
		padding-top: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.login-img{
			width: 78px;
			height: 78px;
		}
		.login-desc{
			padding: $uni-spacing-col-lg 0;
			color: $uni-text-color-grey;
			font-size: $uni-font-size-base;
		}
		.login-btn{
			width: 85%;
		}
	}
</style>
