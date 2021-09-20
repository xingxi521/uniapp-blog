<template>
	<view class="result-main">
		<!-- 空数据显示 -->
		<EmptyData v-if="isEmpty"/>
		<!-- 有内容显示 -->
		<mescroll-body v-else ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view v-for="(item, index) in searchData" :key="index" class="result-box">
				<SearchResultItem :data="item"/>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
	import { getSearchResultList } from '@/api/searchblog/index.js'
	export default {
		name:"SearchResult",
		mixins: [MescrollMixin],
		props: {
			queryStr: {
				type: String,
				default: '',
				required: true
			}
		},
		data() {
			return {
				// 搜索结果数据
				searchData: [],
				// 当前页数
				currentPage: 1,
				// 是否为初次加载
				isInit: true,
				// 是否为空数据
				isEmpty: false,
				// mescroll实例对象
				mescroll: null
			};
		},
		mounted() {
			this.mescroll = this.$refs.mescrollRef.mescroll
		},
		methods: {
			// 获取搜索结果数据
			async getSearchResultListRequest() {
				try{
					const res = await getSearchResultList({
						q: this.queryStr,
						p: this.currentPage
					})
					// 关键字高亮处理
					res.data.list.forEach(item => {
						item.title = item.title.replace(/<em>/g, '<em style="color: #f94d2a; margin: 0 2px;">')
						item.description = item.description.replace(/<em>/g, '<em style="color: #f94d2a; margin: 0 2px;">')
					})
					if (this.currentPage === 1) { // 下拉刷新
						this.searchData = res.data.list
					} else { // 上拉加载
						this.searchData = [...this.searchData, ...res.data.list]
					}
					// 判断是否为空数据
					if (this.searchData.length === 0) {
						this.isEmpty = true
					}
				}catch(e){
					console.log(e)
				}
			},
			// 首次加载mescroll
			async mescrollInit() {
				await this.getSearchResultListRequest()
				this.isInit = false
				this.mescroll.endSuccess()
			},
			// 下拉刷新
			async downCallback() {
				if (this.isInit) return
				this.currentPage = 1
				await this.getSearchResultListRequest()
				this.mescroll.endSuccess()
			},
			// 上拉加载
			async upCallback() {
				if (this.isInit) return
				this.currentPage += 1
				await this.getSearchResultListRequest()
				this.mescroll.endSuccess()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.result-main{
		.result-box{
			padding: $uni-spacing-col-lg $uni-spacing-row-lg;
		}
	}
</style>
