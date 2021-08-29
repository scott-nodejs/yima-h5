import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import './plugins/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import Components from './components'

Vue.use(ElementUI, {
    size: 'small'
})

const eventBus = {
    install(Vue) {
        Vue.prototype.$bus = new Vue()
    }
}
Vue.use(eventBus)
Vue.use(Components)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
