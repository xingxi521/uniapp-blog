<template>
	<view class="search-list-container">
		<!-- 标题 -->
		<view class="list-title">
			文章热搜列表
		</view>
		<!-- 列表项 -->
		<block v-for="(item, idx) in hotList" :key="item.id">
			<view class="item-list" @click="clickHandler(item)">
				<HotListIcon :index="idx + 1"/>
				<text class="item-list-title">{{ item.label }}</text>
				<image class="item-list-icon" v-if="idx <= 2" src="/static/images/hot-icon.png"></image>
			</view>
		</block>
	</view>
</template>

<script>
	import { getSearchHotList } from '@/api/searchblog/index.js'
	export default {
		name:"SearchList",
		data() {
			return {
				// 热搜列表数据
				hotList: []
			};
		},
		created() {
			this.getSearchHotListRequest()
		},
		methods: {
			// 获取热搜列表数据
			getSearchHotListRequest() {
				getSearchHotList().then(res => {
					this.hotList = res.data.list
				})
			},
			// 点击列表项事件
			clickHandler(item) {
				this.$emit('onClick', item)
			}
		}
	}
</script>

<style lang="scss">
	.search-list-container{
		.list-title{
			font-weight: bold;
			font-size: 14px;
			color: #f94d2a;
			padding: 0 12px 12px 12px;
			margin: 0 -12px 12px -12px;
			box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
		}
		.item-list{
			display: flex;
			align-items: center;
			padding: 12px 12px 12px 0;
			.item-list-title{
				font-size: 14px;
				margin: 0 10px;
			}
			.item-list-icon{
				width: 14px;
				height: 14px;
			}
		}
	}
</style>
