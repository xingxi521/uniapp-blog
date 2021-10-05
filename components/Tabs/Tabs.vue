<template>
	<view class="tabs-main">
		<view class="tabs-box">
			<scroll-view scroll-x class="tabs-scoll" scroll-with-animation :scroll-left="scrollLeft">
				<view class="scoll-content">
					<view class="item-box">
						<block v-for="(item, index) in tabData" :key="index">
							<view 
							:id="'tab-item-' + index" class="tabs-item" 
							:class="{'selected': index === currentIndex}" 
							:style="{ color: index === currentIndex ? defaultConfig.activeTextColor : defaultConfig.textColor }"
							@click="setIndexHandler(index)"
							>
								{{item.label}}
							</view>
						</block>
					</view>
					<!-- 滑块 -->
					<view 
					class="underLine"
					:style="{transform: 'translateX('+ slder.left + 'px)', width: defaultConfig.underLineWidth + 'px', height: defaultConfig.underLineHeight + 'px', backgroundColor: defaultConfig.underLineColor}"
					></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Tabs",
		props: {
			// 配置项
			config: {
				type: Object,
				default: function() {
					return {}
				}
			},
			// 数据
			tabData: {
				type: Array,
				default: function() {
					return []
				}
			},
			// 当前选择索引
			currentIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				// 滑块位置
				slder: {
					left: 0
				},
				// 内部tab数据维护
				tabList: [],
				// tabs样式默认配置
				defaultConfig: {
					// 文字颜色
					textColor: '#333',
					// 选中文字颜色
					activeTextColor: '#f94d2a',
					// 滑块的宽度
					underLineWidth: 25,
					// 滑块的高度
					underLineHeight: 2,
					// 滑块的颜色
					underLineColor: '#f94d2a'
				},
				// 滚动位置
				scrollLeft: 0
			};
		},
		watch:{
			// 监听数据变化
			tabData: {
				handler(val) {
					this.tabList = val
					setTimeout(() => {
						this.updatePostion()
					}, 0)
				},
				immediate: true
			},
			// 监听当前索引改变
			currentIndex: {
				handler(val) {
					this.setPosition()
				},
				immediate: true
			},
			// 监听配置项变化
			config: {
				handler(val) {
					this.defaultConfig = { ...this.defaultConfig, ...val }
				},
				immediate: true
			}
		},
		methods: {
			// 改变选中项
			setIndexHandler(index) {
				this.$emit('onChange', index)
			},
			// 更新滑块位置属性
			updatePostion() {
				// 创建一个DOM节点查询对象
				if (this.tabList.length === 0) return
				const doc = uni.createSelectorQuery().in(this)
				this.tabList.forEach((item, index) => {
					// 获取每个item项的离左边的多长
					doc
					.select(`#tab-item-${index}`)
					.boundingClientRect((res) => {
						item.slider = {
							left: res.left + (res.width - this.defaultConfig.underLineWidth) / 2
						}
						if (index === this.tabList.length - 1) { // 索引等于长度-1就是证明已经循环到最后一个了
							this.setPosition()
						}
					})
					.exec()
				})
			},
			// 设置滑块位置
			setPosition() {
				if (this.tabList.length === 0) return
				this.slder = {
					left: this.tabList[this.currentIndex].slider.left
				}
				// 设置滚动条位置
				this.scrollLeft = this.currentIndex * this.defaultConfig.underLineWidth
			}
		}
	}
</script>

<style lang="scss">
	.tabs-main{
		width: 100%;
		background-color: #fff;
		.tabs-box{
			width: 100%;
			height: 45px;
			line-height: 45px;
			.tabs-scoll{
				width: 100%;
				height: 100%;
				white-space: nowrap;
				.scoll-content{
					width: 100%;
					height: 100%;
					position: relative;
					.item-box{
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						.tabs-item{
							padding: 0 14px;
							display: inline-block;
							font-size: $uni-spacing-row-lg;
							color: $uni-text-color;
						}
						.selected{
							color: rgb(240, 20, 20);
							font-weight: 700;
						}
					}
					.underLine{
						height: 2px;
						width: 25px;
						background-color: #f01414;
						border-radius: 3px;
						position: absolute;
						bottom: 0;
						transition: .5s;
					}
				}
			}
		}
	}
	// 隐藏滚动条
	/* #ifdef H5 */
	  /deep/.uni-scroll-view::-webkit-scrollbar {
	    display: none;
	  }
	  /deep/.uni-scroll-view {
	    scrollbar-width: none;
	  }
	/* #endif */
</style>
