<template>
    <el-dialog :title="this.title" :visible.sync="dialogVisible" :before-close="cancelDialog" >
        <el-form class="form" label-width="80px" :model="dialogInfo">
            <el-form-item label="客户头像">
                <el-upload
                        ref="upload"
                        action="/upload"
                        accept="image/png,image/gif,image/jpg,image/jpeg"
                        list-type="picture-card"
                        :file-list="fileList"
                        :http-request="uploadImage"
                        :on-success="handleAvatarSuccess"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="门店名称 : ">
                <el-input v-model="dialogInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="手机 : ">
                <el-input v-model="dialogInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="联系人 : ">
                <el-input v-model="dialogInfo.nickname"></el-input>
            </el-form-item>
            <el-form-item label="地址 : ">
                <el-input v-model="dialogInfo.address"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelDialog">取 消</el-button>
            <el-button type="primary" @click="submitDialog">{{flag== 0 ? '新建':'编辑'}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { mapActions } from 'vuex'
    import axios from 'axios'
    export default {//父组件 传 过来的 值
        props: {
            dialogVisible: {
                type: Boolean,
                default: false
            },
            dialogInfo: {
                type: Object,
                default: {}
            },
            flag: {
                default: 0
            }
        },
        computed:{
            title(){
                return this.flag === 0 ? '新增': '编辑';
            }
        },
        watch: {
            dialogVisible: function(newVal, oldVal) {
                if (newVal) {
                    console.log(newVal);
                }
            }
        },
        components: {},
        name: "componentDialog",
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                formLabelWidth: '80px',
                limitNum: 2,
                fileList: [],
                form: {}
            };
        },
        created() {},
        mounted() {
            console.log(this.dialogInfo.avatar)
            this.fileList.put(this.dialogInfo.avatar)
        },
        methods: {   //修改父组件传过来的值
            ...mapActions('client', [
                'saveClient',
                'updateClient',
                'getClient',
                'fixClient'
            ]),
            cancelDialog() {
                this.$emit("update:dialogVisible", false);
            },
            submitDialog() {
                console.log(this.flag)
                this.updateClient(this.dialogInfo)
                if(this.flag === 0) {
                    this.saveClient().then(res => {
                        this.cancelDialog()
                        this.getClient({'page':1, 'pageSize': 10})
                    })
                }else{
                    this.fixClient().then(res => {
                        this.cancelDialog()
                        this.getClient({'page':1, 'pageSize': 10})
                    })
                }
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            handleBeforeUpload(file){
                if(!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
                    this.$notify.warning({
                        title: '警告',
                        message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
                    })
                }
                let size = file.size / 1024 / 1024 / 2
                if(size > 2) {
                    this.$notify.warning({
                        title: '警告',
                        message: '图片大小必须小于2M'
                    })
                }
                this.$refs.upload.submit()
            },
            // 文件超出个数限制时的钩子
            handleExceed(files, fileList) {

            },
            // 文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            // 点击文件列表中已上传的文件时的钩子
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            uploadImage(param){
                console.log(param)
                var formData = new FormData();
                formData.append("files", param.file);
                axios.post(param.action,formData,
                    { headers: { "Content-Type": "multipart/form-data" } }).then(response => {
                    console.log('上传图片成功')
                    this.dialogInfo.avatar = 'http://img.hazer.top/'+response.data.data
                    param.onSuccess()  // 上传成功的图片会显示绿色的对勾
                }).catch(response => {
                    console.log('图片上传失败')
                    param.onError()
                })
            },
            uploadFile() {
                this.$refs.upload.submit()
            }
        }
    };
</script>
<style lang='scss' scoped>
    .form{
        background: #eee;
        padding: 0 10px;
    }
    .dialog-footer{
        text-align: center;
    }
</style>