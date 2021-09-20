<template>
	<view class="search-main">
		<uni-search-bar 
			v-if="showInput"
			class="search-bar-box"
			:placeholder="placeHolder"
			radius="100"
			:value="value"
			:bgColor="config.backgroundColor"
			@confirm="confirmHandler"
			@input="inputHandler"
			@cancel="cancelHandler"
			@clear="clearHandler"
			@focus="focusHandler"
			@blur="blurHandler"
		>
			<uni-icons slot="searchIcon" color="#999999" type="search" />
		  <uni-icons slot="clearIcon" color="#999999" type="clear" />
		</uni-search-bar>
		<view v-else class="search_box">
			<image class="search-icon" src="@/static/images/search.png"></image>
			<text class="placeholder-text">{{ placeHolder }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Search",
		props:{
			placeHolder: {
				type: String,
				default: '搜索'
			},
			// 输入框绑定值
			value: {
				type: [String, Number],
				default: ''
			},
			// 搜索框的基本配置
			config: {
				type: Object,
				default: () => {
					return {
						backgroundColor: '#F8F8F8',
						type: 'clear'
					}
				}
			},
			// 是否为可输入的搜索框
			showInput: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			// 点击搜索按钮事件
			confirmHandler(val) {
				this.$emit('onConfirm', val)
			},
			// 输入事件
			inputHandler(val) {
				this.$emit('input', val)
			},
			// 取消按钮事件
			cancelHandler(val) {
				this.$emit('onCancel', val)
			},
			// 清空按钮事件
			clearHandler(val) {
				this.$emit('onClear', val)
			},
			// 获取焦点事件
			focusHandler(val) {
				this.$emit('onFocus', val)
			},
			// 失去焦点事件
			blurHandler(val) {
				this.$emit('onBlur', val)
			}
		}
	}
</script>

<style lang="scss">
	.search-main{
		display: flex;
		background-color: $uni-bg-color;
		align-items: center;
		.search_box{
			width: 100%;
			height: 36px;
			display: flex;
			align-items: center;
			border-radius: 15px;
			border: 1px solid #c9c9c9;
			padding: 0 $uni-spacing-row-base;
			.search-icon{
				width: $uni-img-size-sm;
				height: $uni-img-size-sm;
			}
			.placeholder-text{
				margin-left: $uni-spacing-row-sm;
				color: $uni-text-color-grey;
			}
		}
		.search-bar-box{
			width: 100%;
		}
	}
</style>
