import Vue from 'vue'
import util from '../utils/util'
Vue.prototype.$myInjectedFunction = (string) => console.log('This is an example', string)
/**
 * 分享文章
 */
Vue.prototype.$share = function (message) {
  if (!message) {
    message = window.location
  } else {
    // let arr = (window.location + '').split('#')
    // message = arr[0] + '#' + message
    message = window.location.origin + message
  }
  if (util.copy(message)) {
    Vue.prototype.$confirm('链接已复制,去分享给好友吧!!', '分享', {
      showCancelButton: false,
      showClose: false,
      type: 'success'
    })
  } else {
    Vue.prototype.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
      showCancelButton: false,
      showClose: false,
      type: 'warning'
    })
  }
}
