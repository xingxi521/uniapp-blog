<template>
	<Login @onBack="onBack"/>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			// 登录成功回调事件
			onBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
