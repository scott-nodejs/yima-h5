import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import editor from './modules/editor'
import client from './modules/client'
import user from './modules/user'
import form from './modules/form'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    editor,
    loading,
    client,
    user,
    form
  }
})
