<template>
	<view class="item-main">
		<!-- 标题 -->
		<rich-text :nodes="data.title" class="item-title"></rich-text>
		<!-- 没有图片模式 -->
		<block v-if="!data.pic_list || data.pic_list.length === 0">
			<!-- 内容 -->
			<rich-text :nodes="data.description" class="item-desc line-clamp-2"></rich-text>
			<!-- 底部 -->
			<view class="item-bottom">
				<view class="item-bottom-author">
					{{ data.author }}
				</view>
				<view class="item-botom-time">
					<uni-icons type="compose" class="tiem-icon"></uni-icons>
					{{ data.updateTime | timeFomatter }}
				</view>
			</view>
		</block>
		<!-- 有一张图片 -->
		<block v-else-if="data.pic_list.length === 1">
			<view class="item-info-box">
				<view class="item-desc-box">
					<rich-text :nodes="data.description" class="line-clamp-2 item-desc"></rich-text>
					<view class="item-bottom-desc">
						<view class="item-desc-author">
							{{ data.author }}
						</view>
						<view class="item-desc-time">
							<uni-icons type="compose" class="tiem-icon"></uni-icons>
							{{ data.updateTime | timeFomatter }}
						</view>
					</view>
				</view>
				<image :src="data.pic_list[0]" class="info-image"></image>
			</view>
		</block>
		<!-- 三张图 -->
		<block v-else>
			<view class="item-info-img-box">
				<image :src="data.pic_list[0]" class="item-img"></image>
				<image :src="data.pic_list[1]" class="item-img"></image>
				<image :src="data.pic_list[2]" class="item-img"></image>
			</view>
			<view class="item-bottom">
				<view class="item-bottom-author">
					{{ data.author }}
				</view>
				<view class="item-botom-time">
					<uni-icons type="compose" class="tiem-icon"></uni-icons>
					{{ data.updateTime | timeFomatter }}
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name:"SearchResultItem",
		props: {
			data: {
				type: Object,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item-main{
		margin-bottom: 24px;
		// 没有图片的形式
		.item-title{
			font-size: $uni-font-size-base;
			font-weight: 700;
			color: #000;
		}
		.item-desc{
			margin-top: $uni-spacing-col-base;
			font-size: $uni-font-size-base;
			color: #555;
		}
		.item-bottom{
			display: flex;
			color: $uni-text-color-grey;
			font-size: $uni-font-size-sm;
			margin-top: $uni-spacing-col-base;
			.item-bottom-author{
				margin-right: $uni-spacing-row-lg;
			}
			.item-botom-time{
				color: $uni-text-color-grey;
			}
		}
		// 有一张图片情况的样式
		.item-info-box{
			display: flex;
			margin-top: $uni-spacing-col-base;
			.item-desc-box{
				width: 65%;
				.item-desc{
					margin-top: $uni-spacing-col-base;
					font-size: $uni-font-size-base;
					color: #555;
				}
				.item-bottom-desc{
					display: flex;
					color: $uni-text-color-grey;
					font-size: $uni-font-size-sm;
					margin-top: $uni-spacing-col-base;
					.item-desc-author{
						margin-right: $uni-spacing-row-lg;
					}
					.item-desc-time{
						color: $uni-text-color-grey;
					}
				}
			}
			.info-image{
				width: 33%;
				height: 70px;
			}
		}
		// 三张图情况
		.item-info-img-box{
			display: flex;
			margin-top: $uni-spacing-col-base;
			.item-img{
				margin-right: $uni-spacing-row-sm;
				width: 33%;
				height: 70px;
				box-sizing: border-box;
			}
		}
	}
</style>
