<template>
	<view class="video-list-main">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<block v-for="(item, index) in videoList" :key="index">
				<VideoListItem :item="item"/>
			</block>
		</mescroll-body>
	</view>
</template>

<script>
	import { getVideoList } from '@/api/video/video.js'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
	export default {
		name:"VideoList",
		mixins: [MescrollMixin],
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				videoList: [],
				// 是否初次加载
				isInit: true,
				mescroll: null
			};
		},
		mounted() {
			this.mescroll = this.$refs.mescrollRef.mescroll
		},
		methods: {
			async getVideoListRequest() {
				const { data: res } = await getVideoList({
					page: this.pageNum,
					size: this.pageSize
				})
				if (this.pageNum === 1) {
					this.videoList = res.list
				} else {
					this.videoList = [...this.videoList, ...res.list]
				}
			},
			// 首次加载mescroll
			async mescrollInit() {
				await this.getVideoListRequest()
				this.isInit = false
				this.mescroll.endSuccess()
			},
			// 下拉刷新
			async downCallback() {
				if (this.isInit) return
				this.pageNum = 1
				await this.getVideoListRequest()
				this.mescroll.endSuccess()
			},
			// 上拉加载
			async upCallback() {
				if (this.isInit) return
				this.pageNum += 1
				await this.getVideoListRequest()
				this.mescroll.endSuccess()
			}
		}
	}
</script>

<style lang="scss">

</style>
