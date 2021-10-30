<template>
  <ClientOnly>
    <section class="sign-lay layout-content">
      <div class="sign-view client-card">
        <div class="title">
          登录
        </div>
        <div class="js-sign-in-container">
          <form id="new_session"
                ref="login">
            <!-- 正常登录登录名输入框 -->
            <div class="input-prepend restyle js-normal">
              <input placeholder="手机号"
                     type="text"
                     v-model="formData.username"
                     @keyup.enter="login"
                     value="">
              <i class="el-icon-user-solid"></i>
            </div>

            <div class="input-prepend">
              <input placeholder="密码"
                     type="password"
                     v-model="formData.password"
                     name="password"
                     @keyup.enter="login"
                     value="">
              <i class="el-icon-key"></i>
            </div>

            <div class="remember-btn clearfix">
              <div class="pull-left">
                没有账号？ <em class="reg-btn"
                    @click="tapRegister">注册</em>
              </div>
              <div class="pull-right">
                <a href="javascript:;"
                   @click="tapResetPassword">忘记密码</a>
              </div>
            </div>

            <div class="footer-text"></div>

            <button class="sign-in-button"
                    id="sign-in-form-submit-btn"
                    type="button"
                    @click="login">
              登录
            </button>
          </form>

        </div>
      </div>
    </section>
    <!--home-lay layout-content end-->
  </ClientOnly>
</template>

<script>

import ClientOnly from 'vue-client-only'
import {cookie} from "../utils/cookie";
import { mapState, mapActions } from 'vuex'
import strapi from '../utils/strapi'

export default {
  name: 'SignIn',
  data () {
    return {
      formData: {
        username: '',
        phone: '',
        type: 'email',
        password: '',
      }
    }
  },
  methods: {
      ...mapActions("user",['userLogin','genUser','setAuth']),
      login () {
          this.userLogin(this.formData).then(res=>{
              if(res.code == 200){
                  this.genUser({'userName': this.formData.username})
                  strapi.setToken(res['data']['token'])
                  let homeMenu = res['data']['homeAuth'];
                  let editorMenu = res['data']['editorMenu'];
                  // this.setAuth({homeMenu: homeMenu})
                  window.sessionStorage.setItem("homeMenu", homeMenu);
                  window.sessionStorage.setItem("editorMenu", editorMenu);
                  cookie.set('islogin', '1', 7)
                  this.$refs.login.reset()
                  this.$router.push({ name: 'home'})
              }else{
                  this.$message.warning(res.msg)
              }
          })
      },
      tapRegister () {
          this.$router.push({ name: 'register' })
      },
      tapResetPassword () {
          this.$router.push({ name: 'resetPassword' })
      }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
/*sign-in start*/
.reg-btn {
  color: #3194d0;
  cursor: pointer;
}
.return-home {
  font-size: 14px;
  display: inline-block;
  padding-top: 20px;
}
</style>
