<template>
	<view class="danmu-main">
		<!-- 全部评论 -->
		<!-- <mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" :down="{ use: false }" :up="{ textNoMore: '已加载完所有数据！！！' }"> -->
			<uni-load-more v-if="isLoading" :status="loading"/>
			<EmptyData v-else-if="danmuList.length === 0"/>
			<view v-else>
				<view class="danmu-title">全部弹幕</view>
				<view style="padding-left: 10px;margin-bottom: 70px;">
					<block v-for="(item, index) in danmuList" :key="index">
						<CommentItem :item="item"/>
					</block>
				</view>
			</view>
		<!-- </mescroll-body> -->
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
	import { getDanmuAllList } from '@/api/video/video.js'
	export default {
		name:"VideoDanmuList",
		mixins: [MescrollMixin],
		props: {
			videoId: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				// 是否初次加载
				isInit: true,
				mescroll: null,
				// 当前页数
				pageNum: 1,
				// 每页数据长度
				pageSize: 5,
				total: 0,
				danmuList: [],
				// 弹幕加载状态
				isLoading: true
			};
		},
		created() {
			this.getDanmuListRequest()
		},
		methods: {
			// 获取文章弹幕数据
			async getDanmuListRequest() {
				const { data: res } = await getDanmuAllList({
					videoId: this.videoId
				})
				// this.total = parseInt(res.comment_count)
				// if (this.pageNum === 1) {
					this.danmuList = res.list
					this.isLoading = false
				// } else {
				// 	this.danmuList = [...this.danmuList, ...res.list]
				// }
			},
			// 首次加载mescroll
			async mescrollInit() {
				await this.getDanmuListRequest()
				this.isInit = false
				this.$refs.mescrollRef.mescroll.endSuccess()
				this.mescroll.endBySize(this.danmuList.length, this.total)
			},
			// 上拉加载
			async upCallback() {
				if (this.isInit) return
				this.pageNum += 1
				await this.getDanmuListRequest()
				this.$refs.mescrollRef.mescroll.endSuccess()
				this.mescroll.endBySize(this.danmuList.length, this.total)
			},
			// 获取实例
			getMescroll() {
				if (!this.mescroll) {
					this.mescroll = this.$refs.mescrollRef.mescroll;
				}
				return this.mescroll;
			},
			// 添加一条弹幕
			addDanmu(data) {
				this.danmuList.unshift(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
.danmu-main{
	.danmu-title{
		padding-left: 10px;
		font-weight: 700;
		color: #000;
		font-size: $uni-font-size-lg;
		margin: $uni-spacing-col-lg 0;
	}
}
</style>