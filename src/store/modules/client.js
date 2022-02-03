import strapi from "../../utils/strapi";
import { AxiosWrapper, handleError } from '@/utils/http.js'
import Client from 'core/models/client'

// initial state
const state = {
    clients:[],
    clientList: [],
    total:0,
    currentPage:0,
    client: new Client()
}

// getters
const getters = {

}

// actions
const actions = {
    fetchClient ({ commit, state },payload = {}) {
        console.log(payload)
        return strapi.getEntries('company/clients').then(entry => {
            commit('setClients', entry)
        }).catch(handleError)
    },
    getClient ({ commit, state },payload = {}) {
        return strapi.getEntries('company/client?page='+payload.page+'&pageSize='+payload.pageSize).then(entry => {
            console.log(entry)
            commit('setClient', entry)
        }).catch(handleError)
    },
    genWxQrCode ({ commit, state },payload = {}) {
        return strapi.getEntries('company/genQrCode/'+payload.id)
    },
    saveClient({commit, dispatch, state}) {
        return new AxiosWrapper({
            dispatch,
            commit,
            loading_name: 'saveWork_loading',
            successMsg : '保存成功',
            customRequest: strapi.updateEntry.bind(strapi)
        }).put('company/client','', state.client).catch(handleError)
    },
    fixClient({commit, dispatch, state}) {
        return new AxiosWrapper({
            dispatch,
            commit,
            loading_name: 'saveWork_loading',
            successMsg: '修改成功',
            customRequest: strapi.updateEntry.bind(strapi)
        }).post('company/client/update', '', state.client).catch(handleError)
    },
    deleteClient({commit, dispatch, state}){
        return strapi.deleteEntry('company/client',state.client.id).then(entry => {
            this.$message.info('删除成功')
            this.fetchClient
        }).catch(handleError)
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
         state.clientList = data.data.list;
         state.total = data['data']['total'];
         state.currentPage = data['data']['pageNum']
         console.log(state.clientList)
    },
    setClients(state, data){
        state.clients = data['data']
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
