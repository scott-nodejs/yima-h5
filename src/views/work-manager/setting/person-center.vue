<template>
    <div class="view setting-view client-card">
        <div class="sub-view-box setting-profile-view">
            <h1>个人资料</h1>

            <ul class="setting-list">
                <li class="item-view">
                    <span class="title">真实姓名</span>
                    <div class="input-box profile-input profile-input">
                        <input
                                v-model="formData.nickName"
                                placeholder="填写你的昵称"
                                class="input"
                        />
                    </div>
                </li>

                <li class="item-view">
                    <span class="title">手机</span>
                    <div class="input-box profile-input profile-input">
                        <input
                                v-model="formData.phone"
                                placeholder="填写手机"
                                class="input"
                        />
                    </div>
                </li>

                <li class="item-view">
                    <span class="title">性别</span>
                    <div class="input-box profile-radio">
                        <input
                                type="radio"
                                name="sex"
                                value="1"
                                v-model="formData.sex"
                        /><span>男</span>
                        <input
                                type="radio"
                                name="sex"
                                value="2"
                                v-model="formData.sex"
                        /><span>女</span>
                        <input
                                type="radio"
                                name="sex"
                                value="0"
                                v-model="formData.sex"
                        /><span>保密</span>
                    </div>
                </li>

                <li class="item-view">
                    <span class="title">公司行业</span>
                    <div class="input-box profile-input profile-input">
                        <input
                                placeholder="填写你的行业"
                                v-model="formData.industry"
                                class="input"
                        />
                    </div>
                </li>
                <li class="item-view">
                    <span class="title">公司</span>
                    <div class="input-box profile-input profile-input">
                        <input
                                placeholder="填写你的公司"
                                v-model="formData.company"
                                class="input"
                        />
                    </div>
                </li>
                <li class="item-view">
                    <span class="title">公司介绍</span>
                    <div class="input-box profile-input profile-input">
                        <input
                                v-model="formData.intro"
                                placeholder="填写公司简介"
                                class="input"
                        />
                    </div>
                </li>
                <li class="item-view">
                    <span class="title">公司网址</span>
                    <div class="input-box profile-input profile-input">
                        <input
                                placeholder="填写公司主页"
                                v-model="formData.website"
                                class="input"
                        />
                    </div>
                </li>
                <li class="item-view">
                    <span class="title">地址</span>
                    <div class="input-box profile-input profile-input">
                        <input
                                placeholder="填写公司地址"
                                v-model="formData.address"
                                class="input"
                        />
                    </div>
                </li>
            </ul>

            <div class="footer-view">
                <button class="button button-save" @click="updateUserInfo">保存</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "person-center",
        data() {
            return {
                user_info: '',
                formData: {
                    nickName: '',
                    sex: '',
                    company: '',
                    intro: '',
                    website: '',
                    address: '',
                    phone: '',
                    industry: '',
                },
                file: {}
            }
        },
        created() {
            this.getUserInfo()
        },
        methods:{
            ...mapActions('user', [
                'updateUser',
                'getUser'
            ]),
            updateUserInfo() {
                this.updateUser(this.formData)
            },
            getUserInfo(){
                this.getUser().then(result=>{
                    if(result.code == 200){
                        this.formData ={
                            ...result.data
                        }
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
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        width: 72px;
        height: 72px;
        margin-right: 12px;
    .box-image {
        width: 72px;
        height: 72px;
        border-radius: 4px;
        overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        border-radius: 80px;
    }
    }
    }
    .hint {
        color: #909090;
        font-size: 12px;
        margin-bottom: 18px;
    .hint-review {
        color: #ff4d4f;
        font-size: 12px;
    }
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
        display: inline-block;
        padding: 6px 15px;
        outline: none;
        transition: background-color 0.3s, color 0.3s;
        cursor: pointer;
    }
    .upload-image {
        border-radius: 2px;
        border: none;
        display: inline-block;
        padding: 6px 15px;
    }
    .button-save {
        padding: 8px 30px;
        font-size: 14px;
        margin-top: 20px;
    }
    }
    }
    }
</style>