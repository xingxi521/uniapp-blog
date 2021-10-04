import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search.js'
import user from './modules/user.js'
import video from './modules/video.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		search,
		user,
		video
	}
})
export default store