import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.css'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
Vue.use(ElementUI)
Vue.use(VueCookies)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')