<template>
  <ClientOnly>
    <section class="sign-lay layout-content">
      <div class="sign-view client-card">
        <div class="title">
          注册
        </div>
        <div class="js-sign-in-container">
          <form id="sign-up"
                accept-charset="UTF-8"
                method="post"
                ref="register">
            <div class="input-prepend restyle js-normal">
              <input v-model="formData.company"
                     type="text"
                     class="nickname"
                     placeholder="公司名称">
              <i class="el-icon-house"></i>
            </div>
            <div class="input-prepend restyle js-normal">
              <input v-model="formData.nickName"
                     type="text"
                     class="nickname"
                     placeholder="真实姓名">
              <i class="el-icon-user-solid"></i>
            </div>

            <div class="input-prepend email-view">
              <input v-model="formData.phone"
                     type="text"
                     class="send-email-input account"
                     placeholder="手机">
              <i class="el-icon-phone"></i>
              <send-code :isSend="isSendCodeSuccess"
                         v-model="isSendCode"
                         @click.native="sendCode"
                         storage-key="sendEmailCode"
                         class="btn-send-email-code" />
            </div>

            <div class="input-prepend email-view-code"
                 v-show="formData.phone">
              <input v-model="formData.code"
                     type="text"
                     class="send-email-code code"
                     placeholder="请输入验证码">
              <i class="el-icon-chat-round"></i>
            </div>

            <div class="input-prepend">
              <input v-model="formData.password"
                     type="password"
                     class="password"
                     placeholder="密码">
              <i class="el-icon-key"></i>
            </div>

            <div class="input-prepend">
              <input v-model="formData.confirm"
                     type="password"
                     class="double_password"
                     placeholder="重复密码">
              <i class="el-icon-key"></i>
            </div>

            <div class="footer-text">已有账户， <em @click="tapSign">登录</em></div>

            <button class="sign-up-button"
                    type="button"
                    @click="register">注册</button>
          </form>

        </div>
      </div>
    </section>
  </ClientOnly>
</template>

<script>
    import sendcode from 'core/sendCode/sendCode.vue'
    import ClientOnly from 'vue-client-only'
    import {mapActions} from 'vuex'
    export default {
        name: 'SignUp',
        data () {
            return {
                isSendCode: false,
                isSendCodeSuccess: false, // 验证码是否发送
                formData: {
                    company:'',
                    nickName: '',
                    phone: '',
                    code: '',
                    loginType: 'email',
                    password: '',
                    confirm: ''
                }
            }
        },
        methods: {
            ...mapActions('user', [
                'userRegister',
                'userSendCode'
            ]),
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
            async register () {
                this.userRegister(this.formData).then(data=> {
                   if(data.code === 200){
                       this.$refs.register.reset(),
                       this.$router.push({ name: 'login' })
                   }
                })
            },
            tapSign () {
                this.$router.push({ name: 'login' })
            }
        },
        components: {
            'send-code': sendcode,
            ClientOnly
        }
    }
</script>