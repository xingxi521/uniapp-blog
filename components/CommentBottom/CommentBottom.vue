<template>
	<view class="comment-bottom-main">
		<view class="comment-btn">
			<Search placeHolder="评论一句,前排打call..." :config="{height: '28px', border: 'none', icon: '/static/images/input-icon.png', backgroundColor: '#eeedf4'}"/>
		</view>
		<!-- 点赞 -->
		<view class="praise">
			<image class="praise-img" src="/static/images/un-praise.png"></image>
			<text class="praise-text">点赞</text>
		</view>
		<!-- 收藏 -->
		<view class="collect">
			<image class="collect-img" src="/static/images/un-collect.png"></image>
			<text class="collect-text">收藏</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"CommentBottom",
		data() {
			return {
				
			};
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
