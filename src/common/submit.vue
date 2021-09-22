<template>
    <el-dialog id="submitConfig"
               :close-on-click-modal="false"
               :append-to-body="false"
               :visible.sync="visible"
               @close="$emit('update:show', false)"
               title="配置保存"
               width="395px">
        <el-form>
            <el-form-item label="选择客户">
                <el-select v-model="clientId" placeholder="请选择客户" @change="changeClient">
                    <el-option
                       v-for="clt in clientList"
                       :key="clt.id"
                       :label="clt.name"
                       :value="clt.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handle">立即创建</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>


<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "submitConfig",
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        created() {
            this.getClient()
        },
        watch:{
            show(){
                this.visible = this.show
            }
        },
        data() {
            return {
                clientId: '',
                visible: this.show
            };
        },
        computed:{
            ...mapState('client',["clientList"])
        },
        methods: {
            ...mapActions('client',[
                'fetchClient'
            ]),
            cancel() {
                this.visible = false
            },
            getClient(){
                this.fetchClient()
            },
            handle(){
                this.$emit("submitConfig",{"clientId": this.clientId})
            },
            changeClient(data){
                this.clientId = data;
            }
        }
    }
</script>

<style scoped>

</style>