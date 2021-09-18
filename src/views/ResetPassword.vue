<template>
  <ClientOnly>
    <section class="sign-lay layout-content"
             id="reset-password">

      <div class="sign-view client-card">
        <div class="title">
          重置密码
        </div>
        <div class="js-sign-in-container">
          <form>

            <div class="input-prepend email-view">
              <input placeholder="手机号"
                     type="text"
                     class="send-email-input account"
                     v-model="formData.phone">
              <i class="el-icon-message"></i>
              <send-code :isSend="isSendCodeSuccess"
                         v-model="isSendCode"
                         @click.native="sendCode"
                         storage-key="reset-sendEmailCode"
                         class="btn-send-email-code btn" />
            </div>

            <div class="input-prepend">
              <input placeholder="请输入验证码"
                     type="text"
                     v-model="formData.code"
                     class="send-email-code code">
              <i class="el-icon-chat-round"></i>
            </div>

            <div class="input-prepend">
              <input placeholder="新密码"
                     type="password"
                     class="password"
                     v-model="formData.password">
              <i class="el-icon-key"></i>
            </div>

            <div class="input-prepend">
              <input placeholder="重复新密码"
                     type="password"
                     class="double_password"
                     v-model="formData.confirm">
              <i class="el-icon-key"></i>
            </div>

            <button @click="resetSubmit"
                    class="sign-in-button"
                    type="button">
              重置密码
            </button>
          </form>
          <!-- 更多登录方式 -->
          <div class="sign-footer">
            <a class="return-btn"
               href="javascript:;"
               @click="tapSign">返回登录</a>
          </div>
        </div>
      </div>
    </section>
  </ClientOnly>
  <!--home-lay layout-content end-->
</template>

<script>
import sendCode from 'core/sendCode/sendCode.vue'
import ClientOnly from 'vue-client-only'
import {mapActions} from "vuex";
export default {
    name: 'ResetPassword',
    data () {
      return {
        isSendCode: false,
        isSendCodeSuccess: false,
        formData: {
          phone: '',
          code: '',
          loginType: 'phone',
          password: '',
          confirm: ''
        }
      }
    },
    methods: {
        ...mapActions('user', [
          'resetPassword',
          'userSendCode'
        ]),
        tapRegister () {
            this.$router.push({ name: 'signUp' })
        },
        tapSign () {
            this.$router.push({ name: 'signUp' })
        },
        sendCode () { // 发送注册验证码
          var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
          if(this.formData.phone === ''){
            this.$message.warning("手机号不能为空")
          }else if(!reg.test(this.formData.phone)){
            this.$message.warning("手机号格式不正确")
          }else {
            this.isSendCodeSuccess = true
            this.userSendCode({phone: this.formData.phone, type: 1}).then(
                    this.isSendCodeSuccess = false,
                    this.isSendCode = true
            )
          }
        },
        resetSubmit () {
          this.resetPassword(this.formData).then(data=> {
            if(data.code === 200){
              this.$refs.resetSubmit.reset()
            }
          })
        }
    },
  components: {
    'send-code': sendCode,
    ClientOnly
  }
}
</script>

<style scoped lang="scss">
/*sign-in start*/
</style>
