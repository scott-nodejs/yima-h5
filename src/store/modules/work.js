import strapi from '@/utils/strapi'
import Element from 'core/models/element'
import Page from 'core/models/page'
import Work from 'core/models/work'
import Config from 'core/models/config'
import { AxiosWrapper, handleError } from '@/utils/http.js'
import router from '@/router.js'
import util from '@/utils/util.js'
import { takeScreenshot, downloadPoster } from '@/utils/canvas-helper.js'

function setLoading (commit, loadingName, isLoading) {
  commit('loading/update', { type: loadingName, payload: isLoading }, { root: true })
}

export const actions = {
  previewWork ({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  deployWork ({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  createWork ({ commit }, payload) {
    strapi.createEntry('works', new Work()).then(entry => {
      const routeData = router.resolve({ name: 'editor', params: { workId: entry.id } })
      window.open(routeData.href, '_blank')
      // 如果希望不打开新 tab，可以注释上面面两行，启用下面一行的代码即可，不过不推荐。将编辑器单独起一个页面更有利于 vuex 的数据管理
      // router.replace({ name: 'editor', params: { workId: entry.id } })
    }).catch(handleError)
  },
  deleteWork ({ commit, dispatch, state }, workId) {
    return new AxiosWrapper({
      dispatch,
      commit,
      loading_name: 'deleteWork_loading',
      successMsg: '删除作品成功',
      customRequest: strapi.deleteEntry.bind(strapi)
    }).delete('works', workId).catch(handleError)
  },
  updateWork ({ commit, state }, payload = {}) {
    // update work with strapi
    const work = {
      ...state.work,
      ...payload
    }
    commit('setWork', work)
  },
  updateData ({commit, state}, data = {}) {
    const config = {
      ...state.config,
      ...data
    }
    commit('setConfig', config)
  },
  updatePage ({commit, state}, data = {}) {
    let page = state.config.pageListConfig;
    let indx = -1;
    let del = false;
    for (let i = 0; i < page.length; i++) {
      if (page[i]['pageNum'] == data['pageNum']) {
        indx = i;
        del = true;
        break;
      }
    }
    if(del){
      page.splice(indx, 1);
      data['config'] = util.copyObj(state.config.configList);
      console.log("---: "+JSON.stringify(data))
      page.push(data)
      del = false
    }else{
      data['config'] = util.copyObj(state.config.configList);
      console.log("+++: "+JSON.stringify(data))
      page.push(data)
    }
    const config = {
      ...state.config,
      pageListConfig: page
    }
    commit('setPage', config)
  },
  setConfigList({commit, state}, index){
    let page = state.config.pageListConfig;
    for(let i = 0; i < page.length; i++){
        if(page[i]['pageNum'] == index){
          state.config.configList = page[i]['config'];
          console.log('setConfigList: =====>'+JSON.stringify(state.config))
          const config = {
            ...state.config
          }
          let conf = Object.assign({}, {coverImage: state.config.coverImage}, config)
          state.config = new Config(conf)
          break;
        }
    }
  },
  /**
  * isSaveCover {Boolean} 保存作品时，是否保存封面图
  * loadingName {String} saveWork_loading, previewWork_loading
  * 预览作品之前需要先保存，但希望 用户点击保存按钮 和 点击预览按钮 loading_name 能够不同（虽然都调用了 saveWork）
  * 因为 loading 效果要放在不同的按钮上
  */
  saveWork ({ commit, dispatch, state }, { isSaveCover = false, loadingName = 'saveWork_loading', successMsg = '保存作品成功' } = {}) {
    let data = {pageNum: state.config.currentPage, pageCode: 'card' + state.config.currentPage, config: ''};
    let page = state.config.pageListConfig;
    let indx = -1;
    let del = false;
    for (let i = 0; i < page.length; i++) {
      if (page[i]['pageNum'] == data['pageNum']) {
        indx = i;
        del = true;
        break;
      }
    }
    if(del){
      page.splice(indx, 1);
      data['config'] = util.copyObj(state.config.configList);
      console.log("---: "+JSON.stringify(data))
      page.push(data)
      del = false
    }else{
      data['config'] = util.copyObj(state.config.configList);
      console.log("+++: "+JSON.stringify(data))
      page.push(data)
    }
    const config = {
      ...state.config,
      pageListConfig: page
    }
    commit('setPage', config)

    const fn = (callback) => {
      new AxiosWrapper({
        dispatch,
        commit,
        loading_name: loadingName,
        successMsg,
        customRequest: strapi.updateEntry.bind(strapi)
      }).put('qrConfig/insert', state.config.id, state.config).then(callback)
    }
    return new Promise((resolve, reject) => {
      if (isSaveCover) {
        setLoading(commit, 'uploadWorkCover_loading', true)
        takeScreenshot().then(file => {
          dispatch('uploadCover', { file }).then(() => {
            setLoading(commit, 'uploadWorkCover_loading', false)
            localStorage.setItem('pageDateSet', '')
            fn(resolve)
          }) // uploadCover
        }) // takeScreenshot
      } else {
        fn(resolve)
      }
    })
  },
  preview ({ commit, dispatch, state }, {loadingName = 'saveWork_loading', successMsg = '' } = {}) {
       return new AxiosWrapper({
                dispatch,
                commit,
                loading_name: loadingName,
                successMsg,
                customRequest: strapi.updateEntry.bind(strapi)
       }).put('works/preview', '1', state.config).then(entry=>{
          localStorage.setItem('uid',entry.data.uid)
       }).catch(handleError)
  },
  fetchWork ({ commit, state }, workId) {
    return strapi.getEntry('works', workId)
    //     .then(entry => {
    //   commit('setWork', entry)
    //   //commit('setEditingPage')
    // })
        .catch(handleError)
  },
  fetchCount ({ commit, dispatch, state }, payload = { is_template: false }) {
    return new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/setWorksTotal',
      actionPayloadExtra: {
        isTemplate: payload.is_template
      },
      customRequest: strapi.getEntries.bind(strapi)
    }).get('works/count', payload).catch(handleError)
  },
  fetchWorks ({ commit, dispatch, state }, payload = { is_template: false, _limit: 10 }) {
    return new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/setWorks',
      loading_name: 'fetchWorks_loading',
      successMsg: '获取作品列表成功',
      customRequest: strapi.getEntries.bind(strapi)
    }).get('qrConfig/codes', payload).catch(handleError)
  },
  fetchWorksWithForms ({ commit, dispatch, state }, workId) {
    new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/setWorks',
      loading_name: 'fetchWorks_loading',
      successMsg: '获取作品表单列表成功',
      customRequest: strapi.getEntries.bind(strapi)
    }).get('works/has-forms', { is_template: false }).catch(handleError)
  },
  fetchWorkTemplates ({ commit, dispatch, state }, payload = { is_template: true, _limit: 10 }) {
    new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/setWorkTemplates',
      loading_name: 'fetchWorkTemplates_loading',
      successMsg: '获取模板列表成功',
      customRequest: strapi.getEntries.bind(strapi)
    }).get('works', payload).catch(handleError)
  },
  fetchFormsOfWork ({ commit, state, dispatch }, workId) {
    // 可以 return Promise
    new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/formDetailOfWork',
      loading_name: 'queryFormsOfWork_loading',
      successMsg: '表单查询完毕'
    }).get(`/works/form/query/${workId}`)
  },
  setWorkAsTemplate ({ commit, state, dispatch }, workId) {
    new AxiosWrapper({
      dispatch,
      commit,
      // name: 'editor/formDetailOfWork',
      loading_name: 'setWorkAsTemplate_loading',
      successMsg: '设置为模板成功'
    }).post(`/works/set-as-template/${workId || state.work.id}`)
  },
  useTemplate ({ commit, state, dispatch }, workId) {
    return new AxiosWrapper({
      dispatch,
      commit,
      // name: 'editor/formDetailOfWork',
      loading_name: 'useTemplate_loading',
      successMsg: '使用模板成功'
    }).post(`/works/use-template/${workId}`)
  },
  uploadCover ({ commit, state, dispatch }, { file } = {}) {
    const formData = new FormData()
    formData.append('files', file, `${+new Date()}.png`)
    formData.append('workId', state.work.id)
    return new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/setConfigCover',
      loading_name: 'uploadWorkCover_loading',
      successMsg: '上传封面图成功!',
    }).post(`/upload/`, formData)
  },
  uploadImg ({ commit, state, dispatch }, data) {
    let token = strapi.axios.defaults.headers.common
    return new AxiosWrapper({
      dispatch,
      commit,
      headers:{'content-type': 'application/json','Authorization': token['Authorization']},
      name: '',
      loading_name: 'uploadWorkCover_loading',
      successMsg: '上传图片成功!',
    }).post(`/uploadImg/`, JSON.stringify(data))
  }
}

// mutations
export const mutations = {
  setWorkCover (state, { type, value }) {
    const [cover] = value
    console.log(value)
    this.updateData({coverImage: cover.data})
  },
  setConfigCover (state, { type, value }) {
    console.log(value.data)
    state.config.coverImage = value.data
  },
  setWorksTotal (state, { type, value, ...other }) {
    const { isTemplate } = other
    state.total[isTemplate ? 'templates' : 'works'] = value
  },
  /**
   * payload: {
   *  type:   @params {String} "editor/setWorks",
   *  value:  @params {Array}  work list
   * }
   */
  setWorks (state, { type, value }) {
    let v = value['data']['data']
    //v.sort((a, b) => b.id - a.id)
    state.works = v
    state.total['works'] = value['data']['count']
  },
  /**
   * payload: {
   *  type:   @params {String} "editor/setWorks",
   *  value:  @params {Array}  work list
   * }
   */
  setWorkTemplates (state, { type, value }) {
    value.sort((a, b) => b.id - a.id)
    state.workTemplates = value
  },
  setConfig (state, data){
    let conf = Object.assign({}, {coverImage: state.config.coverImage}, data)
    state.config = new Config(conf)
    console.log('setConfig==>'+JSON.stringify(state.config))
  },
  setPage (state, data){
    let conf = Object.assign({}, {coverImage: state.config.coverImage}, data)
    console.log("111=>"+JSON.stringify(conf))
    state.config = new Config(conf)
    console.log('00000==>'+JSON.stringify(state.config))
  },
  setWork (state, work){
    window.__work = work
    // work.pages = work.pages.map(page => {
    //   page.elements = page.elements.map(element => new Element(element))
    //   return new Page(page)
    // })
    state.work = new Work(work)
  },
  previewWork (state, { type, value }) {},
  deployWork (state, { type, value }) {},
  formDetailOfWork (state, { type, value }) {
    state.formDetailOfWork = value
  }
}
