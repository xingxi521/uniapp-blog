<template>
	<view class="icon-container">
		<image class="icon-style" :src="getRankingBg"></image>
		<text class="icon-text" :class="{ 'icon-while': index <= 3 }">{{ index }}</text>
	</view>
</template>

<script>
	export default {
		name:"HotListIcon",
		props:{
			index: {
				type: [String, Number],
				default: 1
			}
		},
		computed:{
			getRankingBg() {
				if (this.index <= 3) {
					return require(`@/static/images/ranking-${this.index}.png`);
				}
				return require('@/static/images/ranking-other.png');
			}
		}
	}
</script>

<style lang="scss">
	.icon-container{
		width: 18px;
		height: 20px;
		text-align: center;
		position: relative;
		.icon-style{
			width: 100%;
			height: 100%;
		}
		.icon-text{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-55%, -55%);
			font-size: 12px;
			font-weight: bold;
		}
		.icon-while{
			color: #fff;
		}
	}
</style>
