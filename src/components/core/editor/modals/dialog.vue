<template>
    <el-dialog :title="this.title" :visible.sync="dialogVisible" :before-close="cancelDialog" >
        <el-form class="form" label-width="80px" :model="dialogInfo">
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
        watch: {　　//监听 弹窗显示， 可以用来写 请求接口
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
            };
        },
        created() {},
        mounted() {},
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