<template>
    <div>
        <el-select v-model="status" placeholder="请选择客户" @change="changeClient">
            <el-option
                    v-for="clt in companys"
                    :key="clt.id"
                    :label="clt.company"
                    :value="clt.id"
            />
        </el-select>
        <el-table :data="tables" ref="multipleTable" tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="45px"></el-table-column>
            <el-table-column type="index" label="序号" width="62px"></el-table-column>
            <template v-for='(col) in tableData'>
                <el-table-column
                  :prop="col.dataItem"
                  :label="col.dataName"
                  :key="col.dataItem"
                >
                </el-table-column>
            </template>
            <el-table-column label="操作" width="80" align="center">
                <template>
                    <el-button size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "formTable",
        components: {},
        data(){
            return {
                tables: [],
                tableData: [],
                companys:[],
                status: ''
            }
        },
        computed(){

        },
        created() {
            this.fetchForm(0)
        },
        methods: {
            ...mapActions('form', [
                'fetchForms'
            ]),
            fetchForm(id){
                this.fetchForms({'id':id}).then((res)=>{
                    if(res.code === 200){
                        this.tables = res.data.tables;
                        this.tableData = res.data.tableData;
                        this.companys = res.data.companys;
                        if(id === 0) {
                            this.status = this.companys[0].id;
                        }else{
                            this.status = id;
                        }
                    }
                })
            },
            changeClient(data){
                this.fetchForm(data)
            }
        }
    }
</script>

<style scoped>

</style>