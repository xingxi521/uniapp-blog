<template>
	<page-meta root-font-size="52px">
		<view class="details-main">
			<!-- 标题 -->
			<view class="details-title">{{ articleData.articleTitles }}</view>
			<!-- 文章内容区域 -->
			<block v-if="articleData">
				<view class="info-box">
					<view class="info-box-left">
						<view class="author-box">
							<image :src="articleData.avatar" class="circle-image"></image>
							<view class="author-container">
								<view class="author-name">
									{{ articleData.nickName }}
								</view>
								<view class="author-time">
									{{ articleData.date }}
								</view>
							</view>
						</view>
					</view>
					<view class="info-box-right">
						<button :type="articleData.isFollow ? 'primary' : 'default'" size="mini" @click="followHandler" :loading="followLoading">{{ articleData.isFollow ? '已关注' : '关注' }}</button>
					</view>
				</view>
				<!-- 文章主内容 -->
				<mp-html class="markdown_views" :content="addClassFromHTML(articleData.content)" scroll-table></mp-html>
				<!-- 评论数据 -->
				<CommentList ref="mescrollItem" :articleId="articleId"/>
			</block>
			<!-- 底部功能栏 -->
			<CommentBottom :articleData="articleData" @onComment="onComment" @onPraise="onPraise" @onCollect="onCollect"/>
			<!-- 评论弹出层 -->
			<uni-popup ref="popup" type="bottom" @change="popChangeHandler">
				<CommentPopUp v-if="showPopUp" :articleId="articleId" @onSend="onSendHandler"/>
			</uni-popup>
		</view>
	</page-meta>
</template>

<script>
	import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js'
	import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html'
	import { getArticleDetails } from '@/api/hot/index.js'
	import { follow, praise, collect } from '@/api/searchblog/index.js'
	import { mapActions } from 'vuex'
	export default {
		mixins: [MescrollCompMixin],
		components: {
			mpHtml
		},
		data() {
			return {
				// 文章数据
				articleData: null,
				// 文章ID
				articleId: null,
				// 文章作者
				author: '',
				// 关注按钮加载状态
				followLoading: false,
				// 评论弹出层显示
				showPopUp: false
			};
		},
		onLoad({ author, articleId }) {
			this.articleId = articleId
			this.author = author
			this.getArticleDetailsRequest(author, articleId)
		},
		methods: {
			...mapActions('user', ['checkLogin']),
			// 获取文章详情数据
			getArticleDetailsRequest(author, articleId) {
				uni.showLoading({
					title: '数据正在加载...',
					mask: true
				})
				getArticleDetails({
					author,
					articleId
				}).then(res => {
					this.articleData = res.data.data
				}).catch(error => {
					console.log(error)
				})
			},
			// 添加样式
			addClassFromHTML(info) {
				return info
					.replace(/<p>/gi, '<p class="p-cls">')
					.replace(/<a>/gi, '<a class="a-cls">')
					.replace(/<h1>/gi, '<h1 class="h1-cls">')
					.replace(/<h2>/gi, '<h2 class="h2-cls">')
					.replace(/<h3>/gi, '<h3 class="h3-cls">')
					.replace(/<h4>/gi, '<h4 class="h4-cls">')
					.replace(/<h5>/gi, '<h5 class="h5-cls">')
					.replace(/<h6>/gi, '<h6 class="h6-cls">')
					.replace(/<ul>/gi, '<ul class="ul-cls">')
					.replace(/<li>/gi, '<li class="li-cls">')
					.replace(/<ol>/gi, '<ol class="ol-cls">')
					.replace(/<td>/gi, '<td class="td-cls">')
					.replace(/<th>/gi, '<th class="th-cls">')
					.replace(/<tr>/gi, '<tr class="tr-cls">')
					.replace(/<dl>/gi, '<dl class="dl-cls">')
					.replace(/<dd>/gi, '<dd class="dd-cls">')
					.replace(/<hr>/gi, '<hr class="hr-cls">')
					.replace(/<pre>/gi, '<pre class="pre-cls">')
					.replace(/<strong>/gi, '<strong class="strong-cls">')
					.replace(/<input>/gi, '<input class="input-cls">')
					.replace(/<table>/gi, '<table class="table-cls">')
					.replace(/<details>/gi, '<details class="details-cls">')
					.replace(/<code>/gi, '<code class="code-cls">')
					.replace(/<kbd>/gi, '<kbd class="kbd-cls">')
					.replace(/<summary>/gi, '<summary class="summary-cls">')
					.replace(/<blockquote>/gi, '<blockquote class="blockquote-cls">')
					.replace(/<img/gi, '<img class="img-cls"');
			},
			// 关注按钮事件
			async followHandler() {
				const isLogin = await this.checkLogin()
				if (!isLogin) return
				this.followLoading = true
				await follow({
					author: this.author,
					isFollow: !this.articleData.isFollow
				})
				this.articleData.isFollow = !this.articleData.isFollow
				this.followLoading = false
			},
			// 点击评论框回调事件
			onComment() {
				this.$refs.popup.open()
			},
			// 评论弹出层改变事件
			popChangeHandler(e) {
				if (e.show) {
					this.showPopUp = e.show
				} else {
					setTimeout(() => {
						this.showPopUp = e.show
					}, 200)
				}
			},
			// 发表评论回调事件
			onSendHandler(data) {
				this.$refs.popup.close()
				this.showPopUp = false
				this.$refs.mescrollItem.addComment(data)
			},
			// 点赞事件
			async onPraise() {
				await praise({
					articleId: this.articleId,
					isPraise: !this.articleData.isPraise
				})
				this.articleData.isPraise = !this.articleData.isPraise
			},
			// 收藏事件
			async onCollect() {
				await collect({
					articleId: this.articleId,
					isCollect: !this.articleData.isCollect
				})
				this.articleData.isCollect = !this.articleData.isCollect
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/style/article-details.scss';
	.details-main{
		padding: $uni-spacing-col-base $uni-spacing-row-base;
		padding-bottom: 108px;
		.details-title{
			font-size: 20px;
			font-weight: 700;
			color: $uni-text-color;
		}
		.info-box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: $uni-spacing-col-base 0;
			.info-box-left{
				.author-box{
					display: flex;
					.author-container{
						margin-left: $uni-spacing-row-sm;
						.author-name{
							font-size: $uni-font-size-base;
							font-weight: bolder;
							color: $uni-text-color;
							font-size: $uni-font-size-base;
						}
						.author-time{
							font-size: $uni-font-size-sm;
							color: $uni-text-color-grey;
						}
					}
				}
			}
		}
	}
</style>
