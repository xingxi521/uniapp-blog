<template>
	<view class="details-main">
		<!-- 视频区域 -->
		<video id="myVideo" :src="videoData.play_url" controls danmu-btn enable-danmu :danmu-list="danmuList" class="item-video"></video>
		<VideoItemInfo :item="videoData"/>
		<!-- 弹幕列表 -->
		<VideoDanmuList ref="mescrollItem" :videoId="videoData.id"/>
		<!-- 底部功能栏 -->
		<CommentBottom placeHolder="发条弹幕,开心一下..." :articleData="videoData" @onComment="onComment" @onPraise="onPraise" @onCollect="onCollect"/>
		<!-- 弹幕出层 -->
		<uni-popup ref="popup" type="bottom" @change="popChangeHandler">
			<CommentPopUp v-if="showPopUp" :articleId="videoData.id" @onSend="onSendHandler"/>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { getDanmuAllList } from '@/api/video/video.js'
	import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js'
	export default {
		mixins: [MescrollCompMixin],
		data() {
			return {
				// 弹幕列表
				danmuList: [],
				// 发表弹幕弹窗
				showPopUp: false,
				videoContext: null
			};
		},
		computed: {
			...mapState('video', ['videoData']),
		},
		onReady: function(res) {
			console.log(this.videoData)
			this.videoContext = uni.createVideoContext('myVideo')
		},
		methods: {
			// 获取文章弹幕数据
			async getDanmuListRequest() {
				const { data: res } = await getDanmuAllList({
					videoId: this.videoData.id,
				})
				this.danmuList = res.list
				this.isLoading = false
			},
			// 点击评论框事件
			onComment() {
				this.$refs.popup.open()
			},
			// 弹幕弹出层改变事件
			popChangeHandler(e) {
				if (e.show) {
					this.showPopUp = e.show
				} else {
					setTimeout(() => {
						this.showPopUp = e.show
					}, 200)
				}
			},
			// 发送弹幕回调事件
			onSendHandler(data) {
				this.videoContext.sendDanmu({
					text: data.info.content,
					color: this.getRandomColor()
				});
				this.$refs.popup.close()
				this.showPopUp = false
				this.$refs.mescrollItem.addDanmu(data.info)
			},
			// 取随机颜色
			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
						let color = Math.floor(Math.random() * 256).toString(16)
						color = color.length == 1 ? '0' + color : color
						rgb.push(color)
				}
				return '#' + rgb.join('')
			}
		}
	}
</script>

<style lang="scss" scoped>
.details-main{
	.item-video{
		width: 100%;
	}
}
</style>
