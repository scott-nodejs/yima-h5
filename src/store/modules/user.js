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
    }
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
