<template>
	<view class="popup-main" :style="{ bottom: bottom + 'px' }">
		<uni-easyinput v-model="value" placeholder="说点什么..." :disable="!value" type="textarea" :inputBorder="false"></uni-easyinput>
		<view class="popup-btn">
			<button type="primary" size="mini" @click="sendHandler">发送</button>
		</view>
	</view>
</template>

<script>
	import { comment } from '@/api/searchblog/index.js'
	export default {
		name:"CommentPopUp",
		props: {
			// 文章ID
			articleId: {
				type: [String, Number],
				required: true
			}
		},
		data() {
			return {
				value: '',
				// 弹出层的位置
				bottom: 0,
			};
		},
		created() {
			uni.onKeyboardHeightChange(({ height }) => {
				console.log(height)
				this.bottom = height
			})
		},
		methods: {
			// 发表评论
			async sendHandler() {
				uni.showLoading({
					title: '正在发表中...',
					mask: true
				})
				const { data: res } = await comment({
					articleId: this.articleId,
					content: this.value
				})
				uni.showToast({
					title: '发表成功',
					mask: true,
					icon: 'success'
				})
				this.$emit('onSend', res)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-main{
		padding: $uni-spacing-col-lg;
		background: $uni-bg-color;
		// 用于后面动态计算弹出层的高度
		position: relative;
		.popup-btn{
			text-align: right;
		}
	}
</style>
