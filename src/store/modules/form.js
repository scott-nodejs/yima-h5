import strapi from "../../utils/strapi";
import { AxiosWrapper, handleError } from '@/utils/http.js'

// initial state
const state = {
}

// getters
const getters = {
}

// actions
const actions = {
    fetchForms ({ commit, state }, data = {}) {
        return strapi.getEntry('qrConfig/form/data', data.id).catch(handleError)
    },
}

// mutations
const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
