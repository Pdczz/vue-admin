import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      username: window.localStorage.getItem('username') == null ? '' : JSON.parse(window.localStorage.getItem('username' || '[]')),
      name: ''
    },
    adminMenus: []
  },
  mutations: {
    initAdminMenu (state, menus) {
      state.adminMenus = menus
    },
    login (state, data) {
      state.user.username = data.username
      state.user.name=data.name
      window.localStorage.setItem('username', JSON.stringify(data))
    },
    logout (state) {
      // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
      state.username = ''
      window.localStorage.removeItem('username')
      state.adminMenus = []
    }
  },
  actions: {
  }
})
