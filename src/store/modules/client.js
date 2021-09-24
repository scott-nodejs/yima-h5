import strapi from "../../utils/strapi";
import { AxiosWrapper, handleError } from '@/utils/http.js'
import Client from 'core/models/client'

// initial state
const state = {
    clientList: [],
    client: new Client()
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
    },
    getClient ({ commit, state }) {
        return strapi.getEntries('company/client').then(entry => {
            console.log(entry)
            commit('setClient', entry['data']['list'])
        }).catch(handleError)
    },
    saveClient({commit, dispatch, state}) {
        return new AxiosWrapper({
            dispatch,
            commit,
            loading_name: 'saveWork_loading',
            successMsg : '保存成功',
            customRequest: strapi.updateEntry.bind(strapi)
        }).put('company/client','', state.client)
    },
    deleteClient({commit, dispatch, state}){
        return new AxiosWrapper({
            dispatch,
            commit,
            loading_name: 'saveWork_loading',
            successMsg : '删除成功',
            customRequest: strapi.updateEntry.bind(strapi)
        }).delete('company/client'+state.client.id)
    },
    updateClient ({ commit, state }, payload = {}) {
        // update work with strapi
        const client = {
            ...state.client,
            ...payload
        }
        commit('addClient', client)
    },
}

// mutations
const mutations = {
    setClient(state, data){
         state.clientList = data['data'];
         console.log(state.clientList)
    },
    addClient(state, data){
        state.client = new Client(data)
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
