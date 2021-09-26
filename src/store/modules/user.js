import strapi from "../../utils/strapi";
import { AxiosWrapper, handleError } from '@/utils/http.js'
import User from 'core/models/user'

// initial state
const state = {
   user: new User()
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
    genUser ({ commit, state }, payload = {}) {
        // update work with strapi
        const user = {
            ...state.user,
            ...payload
        }
        commit('setUser', user)
    },
}

// mutations
const mutations = {
    setUser(state, data){
        state.user = data
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
