<template>
	<view class="search-blog-main">
		<view class="search-top-box">
			<Search 
				v-model="searchText" 
				:placeHolder="placeHolder"
				:showInput="true"
				:config="{ backgroundColor: '#F1F1F3' }"
				@onConfirm="confirmHandler"
				@input="inputHandler"
				@onCancel="cancelHandler"
				@onClear="clearHandler"
				@onFocus="focusHandler"
				@onBlur="blurHandler"
			/>
		</view>
		<!-- 搜索列表 -->
		<view v-if="showType === SEARCH_STATUS.SEARCH_LIST" class="search-list-box card">
			<SearchList @onClick="clickItemHandler"/>
		</view>
		<!-- 搜索历史 -->
		<view v-else-if="showType === SEARCH_STATUS.SEARCH_HISTORY" class="search-history-box">
			<SearchHistory @onTagClick="onTagClick"/>
		</view>
		<!-- 搜索结果 -->
		<view v-else class="search-result-box">
			<SearchResult ref="mescrollItem" :queryStr="searchText"/>
		</view>
	</view>
</template>

<script>
	import { getDefaultText } from '@/api/searchblog/index.js'
	import { SEARCH_STATUS } from '@/utils/const/searchblog.js'
	import { mapState, mapMutations } from 'vuex'
	import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js'
	export default {
		mixins: [MescrollCompMixin],
		data() {
			return {
				// 搜索内容
				searchText: '',
				placeHolder: '',
				// 展示枚举
				SEARCH_STATUS,
				// 展示状态
				showType: 1
			};
		},
		mounted() {
			this.getDefaultTextRequest()
		},
		methods: {
			...mapMutations('search', ['saveHistoryData']),
			// 获取默认搜索文字
			getDefaultTextRequest() {
				getDefaultText().then(res => {
					this.placeHolder = res.data.defaultText
				})
			},
			// 搜索按钮事件
			confirmHandler(val) {
				this.searchText = val.value ? val.value : this.placeHolder
				this.saveHistoryData(this.searchText)
				if (this.searchText) {
					this.showType = SEARCH_STATUS.SEARCH_RESULT
				}
			},
			// 输入事件
			inputHandler(val) {
				this.searchText = val
			},
			// 取消按钮事件
			cancelHandler(val) {
				this.showType = SEARCH_STATUS.SEARCH_LIST
			},
			// 清空按钮事件
			clearHandler(val) {
				this.showType = SEARCH_STATUS.SEARCH_HISTORY
			},
			// 获取焦点事件
			focusHandler(val) {
				this.showType = SEARCH_STATUS.SEARCH_HISTORY
			},
			// 失去焦点事件
			blurHandler(val) {
				
			},
			// 点击热搜列表项事件
			clickItemHandler(item) {
				this.showType = SEARCH_STATUS.SEARCH_RESULT
				this.searchText = item.label
			},
			// 解决微信小程序里的toJSON报错
			toJSON() {
				return this
			},
			// 点击标签事件
			onTagClick(item) {
				this.searchText = item
				this.saveHistoryData(item)
				if (item) {
					this.showType = SEARCH_STATUS.SEARCH_RESULT
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
