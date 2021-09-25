<template>
	<view class="comment-item-main">
		<view>
			<image :src="item.avatar" class="circle-image"></image>
		</view>
		<view class="item-right">
			<!-- 名称 -->
			<text class="item-name">{{ item.nickName || item.userName }}</text>
			<!-- 内容 -->
			<text class="item-content">{{ item.content }}</text>
			<!-- 时间 -->
			<text class="item-date">{{ item.postTime | timeFomatter }}</text>
		</view>
	</view>
</template>

<script>
	/**
	 * 评论项组件
	 */
	export default {
		name:"CommentItem",
		props: {
			// 数据
			item: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.comment-item-main{
	display: flex;
	padding: $uni-spacing-col-lg 0;
	.item-right{
		display: flex;
		flex-direction: column;
		margin-left: $uni-spacing-row-sm;
		.item-name{
			font-size: $uni-font-size-sm;
			font-weight: bolder;
			color: $uni-text-color;
		}
		.item-content{
			margin-top: $uni-spacing-col-sm;
			font-size: $uni-font-size-base;
			color: $uni-text-color;
		}
		.item-date{
			margin-top: $uni-spacing-col-sm;
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
		}
	}
}
</style>
