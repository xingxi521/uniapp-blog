import Vue from 'vue'
import App from './App'
import './style/global.scss'
import * as filters from './filters/index.js'
import store from './store/index.js'
Vue.config.productionTip = false
Object.keys(filters).forEach(item => {
	Vue.filter(item, filters[item])
})
App.mpType = 'app'
const app = new Vue({
    ...App,
		store
})
app.$mount()
