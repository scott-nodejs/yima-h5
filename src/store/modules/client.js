import strapi from "../../utils/strapi";
import { AxiosWrapper, handleError } from '@/utils/http.js'

// initial state
const state = {
    clientList: []
}

// getters
const getters = {

}

// actions
const actions = {
    fetchClient ({ commit, state }) {
        return strapi.getEntries('company/clients').then(entry => {
            commit('setClient', entry)
        }).catch(handleError)
    }
}

// mutations
const mutations = {
    setClient(state, data){
         state.clientList = data['data'];
         console.log(state.clientList)
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
