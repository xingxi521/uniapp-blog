<template>
	<view class="comment-bottom-main">
		<view class="comment-btn" @click="commentHadnler">
			<Search :placeHolder="placeHolder" :config="{ height: '28px', border: 'none', icon: '/static/images/input-icon.png', backgroundColor: '#eeedf4' }"/>
		</view>
		<!-- 点赞 -->
		<view class="praise" @click="praiseHandler">
			<image class="praise-img" :src="articleData.isPraise ? '/static/images/praise.png' : '/static/images/un-praise.png'"></image>
			<text class="praise-text">点赞</text>
		</view>
		<!-- 收藏 -->
		<view class="collect" @click="collectHandler">
			<image class="collect-img" :src="articleData.isCollect ? '/static/images/collect.png' : '/static/images/un-collect.png'"></image>
			<text class="collect-text">收藏</text>
		</view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		name:"CommentBottom",
		props: {
			// 文章数据
			articleData: {
				type: Object,
				default: () => {
					return {}
				}
			},
			// 提示
			placeHolder: {
				type: String,
				default: '评论一句,前排打call...'
			}
		},
		methods: {
			...mapActions('user', ['checkLogin']),
			// 点击评论事件
			async commentHadnler() {
				const isLogin = await this.checkLogin()
				if (!isLogin) return
				this.$emit('onComment')
			},
			// 点赞事件
			async praiseHandler() {
				const isLogin = await this.checkLogin()
				if (!isLogin) return
				this.$emit('onPraise')
			},
			// 收藏事件
			async collectHandler() {
				const isLogin = await this.checkLogin()
				if (!isLogin) return
				this.$emit('onCollect')
			}
		}
	}
</script>

<style lang="scss" scoped>
.comment-bottom-main{
	position: fixed;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: $uni-bg-color;
	padding: 4px 6px 32px 6px;
	display: flex;
	align-items: center;
	.comment-btn{
		padding-top: 5px;
		flex-grow: 1;
	}
	.praise{
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		align-items: center;
		.praise-img{
			width: 26px;
			height: 26px;
		}
		.praise-text{
			font-size: $uni-font-size-sm;
		}
	}
	.collect{
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		align-items: center;
		.collect-img{
			width: 26px;
			height: 26px;
		}
		.collect-text{
			font-size: $uni-font-size-sm;
		}
	}
}
</style>
