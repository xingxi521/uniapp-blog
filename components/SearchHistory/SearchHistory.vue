<template>
	<view class="history-main">
		<view class="history-title-box">
			<text class="head-title">搜索历史</text>
			<uni-icons v-if="!isDelete" type="trash" @click="isDelete = true"></uni-icons>
			<view v-else>		
				<text class="delte" @click="allDelteHandler">全部删除</text>
				<text class="complite" @click="isDelete = false">完成</text>
			</view>
		</view>
		<block v-for="item in historyData" :key="item">
			<view class="history-list-box" @click="itemClick(item)">
				<view class="list-item">
					<text class="list-text line-clamp">{{item}}</text>
					<uni-icons v-if="isDelete" type="clear" class="list-icon" @click="deleteHandler(item)"></uni-icons>
				</view>
			</view>
		</block>
		<uni-popup ref="popup" type="dialog">
		   <uni-popup-dialog mode="base" title="提示" content="确定要删除所有历史搜索记录吗？" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		name:"SearchHistory",
		data() {
			return {
				// 是否删除状态
				isDelete: false
			};
		},
		methods: {
			...mapMutations('search', ['removeHistory', 'removeAll']),
			// 删除按钮事件
			deleteHandler(item) {
				this.removeHistory(item)
			},
			// 弹窗关闭按钮
			close() {
				this.$refs.popup.close()
			},
			// 弹窗确定按钮
			confirm() {
				this.removeAll()
				this.$refs.popup.close()
			},
			// 删除所有按钮事件
			allDelteHandler() {
				this.$refs.popup.open()
			},
			// 点击标签
			itemClick(item) {
				this.$emit('onTagClick', item)
			}
		},
		computed:{
			...mapState('search', ['historyData'])
		}
	}
</script>

<style lang="scss">
	.history-main{
		padding: $uni-spacing-col-lg;
		.history-title-box{
			display: flex;
			justify-content: space-between;
			height: 21px;
			.head-title{
				font-size: $uni-font-size-sm;
			}
			.delte{
				color: $uni-text-color-grey;
				font-size: $uni-font-size-sm;
			}
			.complite{
				color: $uni-text-color-grey;
				font-size: $uni-font-size-sm;
				margin-left: $uni-spacing-row-sm;
			}
		}
		.history-list-box{
			width: 44%;
			padding: 10px;
			display: inline-block;
			position: relative;
			.list-item{
				display: flex;
				.list-text{
					width: 85%;
					font-size: $uni-font-size-base;
				}
				.list-icon{
					line-height: 21px;
				}
			}
		}
		.history-list-box:nth-child(odd):before {
			content: ' ';
			border-left: 1px solid $uni-text-color-grey;
			display: inline-block;
			height: 10px;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 0;
		}
	}
</style>
