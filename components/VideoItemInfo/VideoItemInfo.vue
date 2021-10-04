<template>
	<view class="video-item-info-main">
		<view class="info-title">
			{{ item.title }}
		</view>
		<view class="info-left">
			<image class="circle-image" :src="item.poster_small" />
			<text class="left-text">{{ item.source_name }}</text>
		</view>
		<view class="info-right">
			<uni-icons type="videocam"></uni-icons>
			<text class="right-num">{{ item.fmplaycnt }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"VideoItemInfo",
		props: {
			// 数据集
			item: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.video-item-info-main{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: $uni-spacing-col-sm 13px;
		.info-title{
			position: absolute;
			left: 15px;
			top: 20px;
			color: rgba(255,255,255,.5);
		}
		.info-left{
			display: flex;
			align-items: center;
			.left-text{
				margin-left: $uni-spacing-row-sm;
				font-size: $uni-font-size-base;
				color: $uni-text-color;
				font-weight: 700;
			}
		}
		.info-right{
			display: flex;
			align-items: center;
			.right-num{
				margin-left: $uni-spacing-row-sm;
				font-size: $uni-font-size-sm;
				color: $uni-text-color;
			}
		}
	}
</style>
