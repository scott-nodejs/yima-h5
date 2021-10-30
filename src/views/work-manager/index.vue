<script>
// import PreView from '@/pages/preview';
// import Sidebar from './components/sidebar.vue'
import strapi from '../../utils/strapi'
import 'core/styles/index.scss'
import LogoOfHeader from '@/components/common/header/logo.js'
import Header from '@/components/common/header/index'
import Links from '@/components/common/header/links.js'
import LangSelect from '@/components/common/header/LangSelect.vue'
import {mapState,mapActions} from 'vuex'
import {cookie} from "../../utils/cookie";

const sidebarMenus = [
  {
    label: '我的作品',
    i18nLabel: 'sidebar.myWorks',
    value: 'workManager',
    antIcon: 'bars',
    key: '1',
    routerName: 'work-manager-list'
  },
    {
        label: '我的客户',
        i18nLabel: 'sidebar.dataCenter',
        value: 'dataCenter',
        antIcon: 'snippets',
        key: '2',
        children: [
            {
                label: '客户数据',
                i18nLabel: 'sidebar.basicData',
                value: 'basicData',
                antIcon: 'snippets',
                key: '2-1',
                routerName: 'form-stat'
            }
        ]
    },
    {
        label: '账号中心',
        i18nLabel: 'sidebar.accountCenter',
        value: 'personCenter',
        antIcon: 'appstore',
        key: '3',
        routerName: 'setting'
    },
    {
        label: 'form数据',
        i18nLabel: 'sidebar.formTable',
        value: 'formData',
        antIcon: 'snippets',
        key: '4',
        routerName: 'form-table'
    }
]

export default {
  components: {
    // PreView,
    // Sidebar
    LogoOfHeader,
    Links,
    LangSelect
  },
  computed:{
      ...mapState('user',['user','auth']),
      getUserName(){
         return this.user.userName
      },
      getMenus(){
          return sidebarMenus.filter(router=>{
              return sessionStorage.getItem("homeMenu").split(",").some(menu=>menu === router.value)
          })
      }
  },
  methods: {
    ...mapActions('user', ['logout']),
    renderSidebar (menus) {
      // const renderLabel = menu => menu.routerName ? <router-link class="default-router-link" to={{ name: menu.routerName }}>{menu.label}</router-link> : menu.label
      const renderLabel = menu =>
        menu.routerName ? (
          <router-link
            class="default-router-link"
            to={{ name: menu.routerName }}
          >
            {this.$t(menu.i18nLabel)}
          </router-link>
        ) : (
          this.$t(menu.i18nLabel)
        )

      return menus.map(menu =>
        menu.children ? (
          <a-sub-menu key={menu.key}>
            {/** <span slot="title"><a-icon type={menu.antIcon} />{menu.label}</span> */}
            <span slot="title">
              <a-icon type={menu.antIcon} />
              {this.$t(menu.i18nLabel)}
            </span>
            {menu.children.map(submenu => (
              <a-menu-item key={submenu.key}>
                {renderLabel(submenu)}
              </a-menu-item>
            ))}
          </a-sub-menu>
        ) : (
          <a-menu-item key={menu.key}>
            <a-icon type={menu.antIcon}></a-icon>
            {/** 这边有个疑惑，不知是否为 antd-vue 的 bug，需要用 span 包裹，否则不会显示 label */}
            <span>{renderLabel(menu)}</span>
          </a-menu-item>
        )
      )
    }
  },
  render () {
    return (
      <a-layout style={{ height: '100vh' }}>
        <Header>
          <a-dropdown slot="action-menu" style="margin-right: 12px;">
            <a-menu
              slot="overlay"
              onClick={e => {
                if (!e.key === 3) {
                  this.$router.push(`/login`)
                }
              }}
            >
              <a-menu-item key="1">
                <span>{this.getUserName}</span>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3" onClick={e=>{
                  strapi.clearToken()
                  cookie.delete('islogin')
                  cookie.delete('jwt')
                  sessionStorage.removeItem("homeMenu")
                  sessionStorage.removeItem("editorMenu")
                  this.$router.push({ name : 'login'})
              }}>
                <a-icon type="logout" />
                  退出登录
              </a-menu-item>
            </a-menu>
            <a class="user-avatar-activator" href="#">
              <a-icon type="user" />
            </a>
          </a-dropdown>
        </Header>
        <a-layout>
          <a-layout-sider width="160" style="background: #fff">
            <a-menu
              mode="inline"
              // defaultSelectedKeys={['1']}
              defaultOpenKeys={['1', '2', '3']}
              style="height: 100%"
            >
              {this.renderSidebar(this.getMenus)}
            </a-menu>
          </a-layout-sider>
          <a-layout style="padding: 0 0 24px">
            <a-layout-content style={{ padding: '24px', minHeight: '280px' }}>
              <router-view />
            </a-layout-content>
          </a-layout>
        </a-layout>
        {/** <PreviewDialog visible={this.previewVisible} handleClose={() => { this.previewVisible = false }} /> */}
      </a-layout>
    )
  }
}
</script>
