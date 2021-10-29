<template>
  <div class=" setting-view client-card">
    <div class="sub-view-box setting-password-view">
      <h1>订单详情</h1>
      <ul class="setting-list">
        <li class="item-view">
          <span class="title">订单编号</span>
          <span class="title">{{this.order.cid}}</span>
        </li>
        <li class="item-view">
          <span class="title">订单状态</span>
          <span class="title"><strong style="color:red">{{this.order.status}}</strong></span>
        </li>
        <li class="item-view">
          <span class="title">支付账号</span>
          <span class="title">{{this.order.realName}}</span>
        </li>
        <li class="item-view">
          <span class="title">购买会员类型</span>
          <span class="title">{{this.order.vip}}</span>
        </li>
        <li class="item-view">
          <span class="title">需支付金额</span>
          <span class="title"><strong style="color:red">{{this.order.money}}</strong></span>
        </li>
      </ul>
      <div class="footer-view">
        <button class="button button-save"
                @click="save">支付</button>
      </div>

    </div>
  </div>
</template>

<script>
import { cookie } from '../../../utils/cookie'
import {mapActions} from "vuex";
import strapi from "../../../utils/strapi";
export default {
  name: 'ResetPassword',
  metaInfo () {
    return {
      title: '个人设置-重置密码',
      htmlAttrs: {
        lang: 'zh'
      }
    }
  },
  data () {
    return {
      vip: 1,
      order: {
        cid: '',
        userId: '',
        realName:'',
        vip:'',
        vipId: '',
        status:'',
        money:0
      }
    }
  },
  created() {
    this.createOrder(this.$route.params.vip)
  },
  methods: {
    ...mapActions('user', [
      'addOrder'
    ]),
    createOrder(vip){
      this.addOrder({vip: vip}).then(res=>{
        if(res.code == 200){
          this.order = {
            ...res.data
          }
        }
      })
    },
    tapResetPassword () {
      this.$router.push({ name: 'resetPassword' })
    },
    save () {
       this.resetPw(this.formData).then(result=>{
         if (result.code === 200) {
           this.$message.warning('密码修改成功,已退出当前账户，请重新登录')
           strapi.clearToken()
           cookie.delete('islogin')
           cookie.delete('jwt')
           window.location.reload()
         } else {
           this.$message.warning(result.msg)
         }
       })
    }
  }
}
</script>

<style scoped lang="scss">
.setting-view {
  // box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.1);
  // border-radius: 5px;
  padding: 30px;
  background: #ffffff;
  .sub-view-box {
    > h1 {
      color: #333333;
      font-size: 20px;
      font-weight: bold;
      padding-bottom: 20px;
      border-bottom: 1px solid #f1f1f1;
    }
    .setting-list {
      .item-view {
        padding: 24px 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-bottom: 1px solid #f1f1f1;
        .title {
          font-size: 14px;
          color: #333;
          width: 120px;
        }
        .avatar-uploader {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
        }
        .input-box {
          flex: 1;
          input {
            width: 100%;
          }
        }
        .profile-radio {
          input {
            width: auto;
            display: inline-block;
          }
          span {
            margin: 0 20px 0 6px;
            font-size: 15px;
            vertical-align: middle;
          }
        }
        .input {
          display: block;
          border: none;
          outline: none;
          color: #909090;
          font-size: 14px;
        }
        .avatar {
          display: inline-block;
          position: relative;
          background-position: 50%;
          background-size: cover;
          background-repeat: no-repeat;
          background-color: #eee;
          -webkit-box-flex: 0;
          -ms-flex: 0 0 auto;
          flex: 0 0 auto;
          width: 72px;
          height: 72px;
          margin-right: 12px;
        }
        .hint {
          color: #909090;
          font-size: 12px;
          margin-bottom: 18px;
        }
        .button,
        button {
          font-size: 12px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-color: #007fff;
          color: #fff;
          border-radius: 2px;
          border: none;
          padding: 6px 15px;
          outline: none;
          transition: background-color 0.3s, color 0.3s;
          cursor: pointer;
        }
      }
    }
    .action-box,
    .footer-view {
      margin-left: 12px;
      .hint {
        color: #909090;
        font-size: 12px;
        margin-bottom: 18px;
      }
      .button,
      button {
        font-size: 12px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #007fff;
        color: #fff;
        border-radius: 2px;
        border: none;
        padding: 6px 15px;
        outline: none;
        transition: background-color 0.3s, color 0.3s;
        cursor: pointer;
      }
      .button-save {
        padding: 8px 30px;
        font-size: 14px;
        margin-top: 20px;
      }
      .upload-btn {
        position: relative;
        .file-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 80px;
          height: 30px;
          opacity: 0;
          cursor: pointer;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}

.setting-password-view {
  .password-input {
    input {
      display: inline-block !important;
      width: auto !important;
    }
    .reset-password {
      display: inline-block;
      font-size: 14px;
      color: #ffc107;
    }
  }
}
</style>
