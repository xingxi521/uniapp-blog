import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // import locale
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // use locale
dayjs.extend(relativeTime)
// 数值转1K 2K
export function hotNum(val) {
	if (val < 1000) {
		return val
	} else {
		let result = Math.floor((val) / 1000) + 'k'
		return result
	}
}
// 格式化事件 xxx以前
export function timeFomatter(val) {
	return dayjs().to(dayjs(val))
}