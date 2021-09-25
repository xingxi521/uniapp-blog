<template>
	<view class="comment-main">
		<!-- 精简评论 -->
		<view v-if="!isAll">
			<view class="comment-title">精简评论</view>
			<block v-for="(item, index) in commentData.slice(0, 2)" :key="index">
				<CommentItem :item="item.info"/>
			</block>
			<view class="comment-bottom" @click="onMoreHandler">
				查看更多评论
			</view>
		</view>
		<!-- 全部评论 -->
		<view v-else>
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" :down="{ use: false }" :up="{ textNoMore: '已加载完所有数据！！！' }">
				<view class="comment-title">全部评论</view>
					<block v-for="(item, index) in commentData" :key="index">
						<CommentItem :item="item.info"/>
					</block>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	/**
	 * 文章评论组件
	 */
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
	import { getCommentList } from '@/api/hot/index.js'
	export default {
		name:"CommentList",
		mixins: [MescrollMixin],
		props: {
			// 文章ID
			articleId: {
				type: [String, Number],
				required: true
			}
		},
		data() {
			return {
				// 当前页数
				pageNum: 1,
				// 每页数据长度
				pageSize: 5,
				// 评论数据
				commentData: [],
				// 是否显示全部评论
				isAll: false,
				// 是否初次加载
				isInit: true,
				mescroll: null,
				total: 0
			};
		},
		created() {
			this.getCommentListRequest()
		},
		methods: {
			// 获取文章评论数据
			async getCommentListRequest() {
				try{
					const res = await getCommentList({
						articleId: this.articleId,
						page: this.pageNum,
						size: this.pageSize
					})
					this.total = res.data.count
					if (this.pageNum === 1) {
						this.commentData = res.data.list
					} else {
						this.commentData = [...this.commentData, ...res.data.list]
					}
				}catch(e){
					console.log(e)
				}
			},
			// 查看更多按钮
			onMoreHandler() {
				this.isAll = true
			},
			// 首次加载mescroll
			async mescrollInit() {
				await this.getCommentListRequest()
				this.isInit = false
				this.getMescroll().endSuccess()
				this.mescroll.endBySize(this.commentData.length, this.total)
			},
			// 上拉加载
			async upCallback() {
				if (this.isInit) return
				this.pageNum += 1
				await this.getCommentListRequest()
				this.getMescroll().endSuccess()
				this.mescroll.endBySize(this.commentData.length, this.total)
			},
			// 获取实例
			getMescroll() {
				if (!this.mescroll) {
					this.mescroll = this.$refs.mescrollRef.mescroll;
				}
				return this.mescroll;
			}
		}
	}
</script>

<style lang="scss" scoped>
.comment-main{
	.comment-title{
		font-weight: 700;
		color: #000;
		font-size: $uni-font-size-lg;
		margin: $uni-spacing-col-lg 0;
	}
	.comment-bottom{
		margin: $uni-spacing-col-lg;
		text-align: center;
		color: #5d83a8;
		font-size: $uni-font-size-base;
	}
}
</style>
