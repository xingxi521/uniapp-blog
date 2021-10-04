<template>
	<view class="hot-video-main">
		<VideoList ref="mescrollItem"/>
	</view>
</template>

<script>
	import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js'
	export default {
		mixins: [MescrollCompMixin]
	}
</script>

<style lang="scss">

</style>
