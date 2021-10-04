<template>
	<view class="video-item-main">
		<video :src="item.play_url" controls danmu-btn enable-danmu class="item-video"></video>
		<view @click="gotoDetail()">
			<VideoItemInfo :item="item"/>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		name:"VideoListItem",
		props: {
			// 数据集
			item: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		methods: {
			...mapMutations('video', ['setVideoData']),
			// 跳转详情
			gotoDetail() {
				this.setVideoData(this.item)
				uni.navigateTo({
					url: '/subpkg/pages/VideoDetails/VideoDetails'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video-item-main{
		position: relative;
		margin-bottom: 10px;
		.item-video{
			width: 100%;
		}
	}
</style>
