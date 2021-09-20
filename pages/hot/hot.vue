<template>
  <view>
		<view class="header-container">
			<image
				class="logo"
				src="@/static/images/logo.png"
				mode="aspectFit"
			/>
			<!-- 搜索栏 -->
			<view class="search-box" @click="jumpSearch">
				<Search placeHolder="123"/>
			</view>
			<!-- tab栏 -->
			<view class="tabs-view">
				<Tabs
				:tabData="tabData"
				:currentIndex="currentIndex"
				@onChange="changeIndexHandler" />
			</view>
			<!-- list列表 -->
			<swiper :current="currentIndex" :style="{height: currentHeight + 'px'}" @animationfinish="finishHandler" @change="changeSwiperHandler">
				<swiper-item v-for="(tabItem, tabIndex) in tabData" :key="tabIndex">
					<uni-load-more status="loading" v-if="dataLoading"></uni-load-more>
					<block v-else>
						<HotList v-for="(item, index) in cacheListData[tabIndex]" :key="index" :item="item" :index="index + 1" :class="'list-item-height-' + tabIndex"/>
					</block>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import { getHotTabsList, getHotList } from '@/api/hot/index.js'
export default {
  data() {
    return {
			// tab数据
			tabData: [],
			// tab当前选中索引
			currentIndex: 0,
			// 数据加载状态
			dataLoading: false,
			// 数据缓存
			cacheListData: [],
			// 当前list高度
			currentHeight: 0,
			// list的高度缓存
			cacheHeight: {},
			// 当前滚动条位置
			currentScroll: 0
		};
  },
	created() {
		this.getHotTabsListRequest()
	},
	// 监听页面滚动事件
	onPageScroll(e) {
		this.currentScroll = e.scrollTop
	},
	methods: {
		// 获取tabs数据
		getHotTabsListRequest() {
			getHotTabsList().then(res => {
				this.tabData = res.data.list
				this.getHotListRequest()
			}).catch(error => {
				console.log(error)
			})
		},
		// 获取热搜文章列表数据
		getHotListRequest() {
			this.dataLoading = true
			const id = this.tabData[this.currentIndex].id
			getHotList(id).then(res => {
				this.cacheListData[this.currentIndex] = res.data.list
				this.dataLoading = false
				// 设置list总高度
				setTimeout(async() => {
					this.currentHeight = await this.computedListHeight()
					this.cacheHeight[this.currentIndex] = this.currentHeight
				}, 0)
			}).catch(error => {
				console.log(error)
				this.dataLoading = false
			})
		},
		// tab点击改变索引事件
		changeIndexHandler(index) {
			if (this.currentScroll > 123) {
				uni.pageScrollTo({
					scrollTop: 123
				})
			}
			this.currentIndex = index
		},
		// 改变swiper触发事件
		changeSwiperHandler(e) {
			// 解决官方swiper在change里改变current值无限左右抖动BUG
			if (e.detail.source === 'touch') {
				if (this.currentScroll > 123) {
					uni.pageScrollTo({
						scrollTop: 123
					})
				}
				this.currentIndex = e.detail.current
			}
		},
		// 计算list高度
		computedListHeight() {
			return new Promise((resolve, reject) => {
				if (this.cacheHeight[this.currentIndex]) {
					resolve(this.cacheHeight[this.currentIndex])
				} else {
					// 创建查询器
					const query = uni.createSelectorQuery().in(this)
					let sum = 0
					// 查询dom节点
					query
						.selectAll('.list-item-height-' + this.currentIndex)
						.boundingClientRect(res => {
							res.forEach((item, idx) => {
								sum += item.height
							})
							// 下面是处理每个list有一个12像素的bottom
							sum += res.length * 12
							resolve(sum)
						})
						.exec()
				}
			})
		},
		// swiper动画完成事件-解决切换swiper切换卡顿
		finishHandler(e) {
			if (!this.cacheListData[this.currentIndex]) {
				this.currentIndex = e.detail.current
				this.getHotListRequest()
				return
			}
			this.currentHeight = this.cacheHeight[this.currentIndex]
		},
		// 跳转到搜索主页面
		jumpSearch() {
			uni.navigateTo({
				url: '/subpkg/pages/SearchBlog/SearchBlog'
			})
		}
	}
};
</script>

<style lang="scss">
	.header-container {
		background: $uni-bg-color;
		.logo {
			width: 100%;
			height: 80px;
		}
		.search-box{
			padding: 0 $uni-spacing-row-lg;
		}
	}
	.tabs-view{
		position: sticky;
		z-index: 9999;
		top: 0;
	}
</style>
