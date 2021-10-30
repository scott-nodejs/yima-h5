import strapi from "../../utils/strapi";
import { AxiosWrapper, handleError } from '@/utils/http.js'
import User from 'core/models/user'
import Auth from 'core/models/auth'

// initial state
const state = {
   user: new User(),
   auth: new Auth()
}

// getters
const getters = {

}

// actions
const actions = {
    userLogin({commit,dispatch, state}, data = {}){
        return new AxiosWrapper({
            dispatch,
            commit,
            loading_name: 'deleteWork_loading',
            successMsg: '登录成功'
        }).post('login', data)
    },
    userRegister({commit,dispatch, state}, data = {}){
        return new AxiosWrapper({
            dispatch,
            commit,
            loading_name: 'deleteWork_loading',
            successMsg: '注册成功'
        }).put('register', data)
    },
    resetPassword({commit,dispatch, state}, data = {}){
        return new AxiosWrapper({
            dispatch,
            commit,
            loading_name: 'deleteWork_loading',
            successMsg: '重置成功'
        }).post('findPassword', data)
    },
    userSendCode({commit,dispatch, state}, data = {}){
        return new AxiosWrapper({
            dispatch,
            commit,
            loading_name: 'deleteWork_loading',
            successMsg: '发送成功'
        }).get('send/code?phone=' + data.phone, data)
    },
    updateUser({commit,dispatch, state}, data = {}) {
        return new AxiosWrapper({
            dispatch,
            commit,
            loading_name: 'deleteWork_loading',
            successMsg: '修改成功',
            customRequest: strapi.updateEntry.bind(strapi)
        }).post('user',data.uid, data)
    },
    resetPw({commit,dispatch, state}, data = {}) {
        return new AxiosWrapper({
            dispatch,
            commit,
            loading_name: 'deleteWork_loading',
            successMsg: '修改成功',
            customRequest: strapi.updateEntry.bind(strapi)
        }).post('user/updatePassword','', data)
    },
    getUser ({ commit, state }) {
        return strapi.getEntries('user/get')
    },
    getVipInfo ({ commit, state }) {
        return strapi.getEntries('user/vip')
    },
    genUser ({ commit, state }, payload = {}) {
        // update work with strapi
        const user = {
            ...state.user,
            ...payload
        }
        commit('setUser', user)
    },
    setAuth({ commit, state }, payload = {}) {
        // update work with strapi
        const auth = {
            ...state.auth,
            ...payload
        }
        commit('setPermision', auth)
    },
    addOrder({ commit,dispatch, state }, vip = {}){
        let token = strapi.axios.defaults.headers.common
        return new AxiosWrapper({
            dispatch,
            commit,
            headers:{'content-type': 'application/json','Authorization': token['Authorization']},
            loading_name: 'deleteWork_loading',
            successMsg: '创建成功',
        }).put('order/create', JSON.stringify(vip))
    },
    getOrder({ commit,dispatch, state }, id = {}){
        return strapi.getEntries('order/getOrder/'+id)
    }
}

// mutations
const mutations = {
    setUser(state, data){
        state.user = data
    },
    setPermision(state, data){
        state.auth = new Auth(data)
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
