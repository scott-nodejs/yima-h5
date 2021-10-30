<template>
  <div class=" setting-view client-card">
    <div class="sub-view-box setting-password-view">
      <h1>会员升级</h1>
      <ul class="setting-list">
      <a-radio-group v-model="vip" @change="onChange">
          <li class="item-view">
            <a-radio :value="0">
              访客人员
            </a-radio>
            <ul style="list-style: disc">
              <li style="line-height: 30px">最多可以创建<strong style="color:red">1</strong>个客户</li>
              <li style="line-height: 30px">最多可以上传<strong style="color:red">10</strong>张图片</li>
              <li style="line-height: 30px">最多可以上传<strong style="color:red">1</strong>个视频</li>
              <li style="line-height: 30px">上传视频大小最大<strong style="color:red">5</strong>M</li>
              <li style="line-height: 30px">注册后默认是访客身份,仅<strong style="color:red">免费</strong>享受<strong style="color:red">基础组件</strong>服务</li>
            </ul>
          </li>
          <li class="item-view">
            <a-radio :value="1">
              普通会员
            </a-radio>
            <ul style="list-style: disc">
              <li style="line-height: 30px">会员费用<strong style="color:red">128</strong>元</li>
              <li style="line-height: 30px">最多可以创建<strong style="color:red">10</strong>个客户</li>
              <li style="line-height: 30px">最多可以上传<strong style="color:red">100</strong>张图片</li>
              <li style="line-height: 30px">最多可以上传<strong style="color:red">10</strong>个视频</li>
              <li style="line-height: 30px">上传视频大小最大<strong style="color:red">20</strong>M</li>
              <li style="line-height: 30px">不可享受<strong style="color:red">定制组件</strong>服务</li>
              <li style="line-height: 30px">可享受除<strong style="color:red">底部导航</strong>外所有组件,但表单组件上传的数据需收费</li>
            </ul>
          </li>
          <li class="item-view">
            <div>
              <a-radio :value="2">
                荣耀会员
              </a-radio>
            </div>
            <div>
              <ul style="list-style: disc">
                <li style="line-height: 30px">会员费用<strong style="color:red">512</strong>元</li>
                <li style="line-height: 30px">最多可以创建<strong style="color:red">100</strong>个客户</li>
                <li style="line-height: 30px">最多可以上传<strong style="color:red">1000</strong>张图片</li>
                <li style="line-height: 30px">最多可以上传<strong style="color:red">50</strong>个视频</li>
                <li style="line-height: 30px">上传视频大小最大<strong style="color:red">20</strong>M</li>
                <li style="line-height: 30px">可享受<strong style="color:red">定制组件</strong>服务，但是需要另外收费</li>
                <li style="line-height: 30px">可享受所有组件，可<strong style="color:red">免费</strong>下载表单组件上传的数据</li>
              </ul>
            </div>
          </li>
        <li class="item-view">
          <a-radio :value="3">
            超级会员
          </a-radio>
          <ul style="list-style: disc">
            <li style="line-height: 30px">会员费用<strong style="color:red">1024</strong>元</li>
            <li style="line-height: 30px">最多可以创建<strong style="color:red">1000</strong>个客户</li>
            <li style="line-height: 30px">最多可以上传<strong style="color:red">50000</strong>张图片</li>
            <li style="line-height: 30px">最多可以上传<strong style="color:red">1000</strong>个视频</li>
            <li style="line-height: 30px">上传视频大小最大<strong style="color:red">100</strong>M</li>
            <li style="line-height: 30px">可<strong style="color:red">免费</strong>享受<strong style="color:red">定制组件</strong>服务</li>
            <li style="line-height: 30px">可享受所有组件，可<strong style="color:red">免费</strong>下载表单组件上传的数据</li>
          </ul>
        </li>
      </a-radio-group>
        </ul>


      <div class="footer-view">
        <button class="button button-save"
                @click="save">升级</button>
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
      formData: {
        oldPassword: '',
        password: '',
        confirm: '',
      }
    }
  },
  created() {
    this.getVip()
  },
  methods: {
    ...mapActions('user', [
      'getVipInfo',
      'addOrder'
    ]),
    save () {
        this.addOrder({vip: this.vip}).then(res=>{
            if(res.code == 200){
                this.$router.push({ path: `order/${res.msg}` })
            }
        })
    },
    getVip(){
      this.getVipInfo().then(res=>{
        if(res.code == 200){
          this.vip = res.data.vipId
        }
      })
    },
    onChange(e){
      this.vip = e.target.value;
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
