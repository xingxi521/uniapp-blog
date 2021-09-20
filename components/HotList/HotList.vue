<template>
	<view class="list-container">
		<view class="list-box">
			<view class="list-box-left">
				<HotListIcon :index="index" />
			</view>
			<view class="list-box-right">
				<view class="right-title line-clamp-2">
					{{ item.title }}
				</view>
				<view class="right-desc line-clamp-2">
					{{ item.desc }}
				</view>
				<view class="right-bottom-box">
					<text class="bottom-author">{{ item.nickname }}</text>
					<view class="bottom-hot">
						<image class="hot-icon" src="@/static/images/hot-icon.png"></image>
						<text class="hot-text">{{ item.views | hotNum }} 热度</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"HotList",
		props: {
			// 项数据
			item: {
				type: Object,
				default: function() {
					return {}
				}
			},
			// 索引
			index: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.list-container{
		margin-bottom: $uni-spacing-col-lg;
		.list-box{
			display: flex;
			border-radius: $uni-border-radius-lg;
			background-color: $uni-bg-color;
			box-shadow: 2px 2px 2px 1px rgba(143,143,143,0.1);
			margin: 0 8px;
			padding: 15px 8px;
			.list-box-left{
				margin-right: 5px;
			}
			.list-box-right{
				width: 100%;
				.right-title{
					font-size: $uni-font-size-lg;
					font-weight: bold;
					color: #000;
				}
				.right-desc{
					margin-top: 5px;
					font-size: $uni-font-size-base;
					color: $uni-text-color;
				}
				.right-bottom-box{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: $uni-spacing-col-sm;
					.bottom-author{
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
					}
					.bottom-hot{
						display: block;
						.hot-icon{
							vertical-align: top;
							width: 20px;
							height: 20px;
						}
						.hot-text{
							margin-left: $uni-spacing-row-sm;
							font-size: $uni-font-size-sm;
							color: #f94d2a;
						}
					}
				}
			}
		}
	}
</style>
