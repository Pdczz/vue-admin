import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'video.js/dist/video-js.css'
import uploader from 'vue-simple-uploader'

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
let axios = require('axios')
axios.defaults.baseURL = 'http://admin.pdczz.com/api'
// axios.defaults.baseURL = 'http://localhost:9090/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false
axios.defaults.withCredentials = true

// eslint-disable-next-line no-undef
Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.use(uploader)

router.beforeEach((to, from, next) => {
    if (store.state.user.username && to.path.startsWith('/admin')) {
      axios.get('/authen').then(resp => {
        initAdminMenu(router, store)
      })

    }
    if (to.meta.requireAuth) {
      if (store.state.user.username) {
        axios.get('/authen').then(resp => {
          if (resp) next()
        })
        // 就是这里多写了一个
        // next()
      } else {
        next({
          path: 'login',
          query: {redirect: to.fullPath}
        })
      }
    } else {
      next()
    }
  }
)
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error) {
      store.commit('logout')
      router.replace('/login')
    }
    // 返回接口返回的错误信息
    return Promise.reject(error)
  })

const initAdminMenu = (router, store) => {
  // 防止重复触发加载菜单操作
  if (store.state.adminMenus.length > 0) {
    return
  }
  axios.get('/menu').then(resp => {
    if (resp && resp.status === 200) {
      var fmtRoutes = formatRoutes(resp.data)
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}

const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      meta: {
        requireAuth: true
      },
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
