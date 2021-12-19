<template>
    <div class="myComponent">
        <el-button @click="handleClick(0)" type="primary" size="small">创建客户</el-button>
    <el-table
            v-loading="loading"
            :data="this.computedWorks"
            stripe
            style="width: 100%">
        <el-table-column
                prop="avatar"
                label="logo头像"
                width="180">
            <template   slot-scope="scope">
                <img :src="scope.row.avatar"  min-width="40" height="40" />
            </template>
        </el-table-column>
        <el-table-column
                prop="name"
                label="门店名称"
                width="180">
        </el-table-column>
        <el-table-column
                prop="phone"
                label="电话"
                width="180">
        </el-table-column>
        <el-table-column
                prop="nickname"
                label="联系人"
                width="180">
        </el-table-column>
        <el-table-column
                prop="address"
                label="地址">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="100">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="deleteClick(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
        <div class="paginationClass">
            <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1" :current-page="this.currentPage"
                    :page-sizes="[10,20,30,40]"
                    :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
                    :total="this.total">
            </el-pagination>

        </div>

    <component-dialog :dialogVisible="dialogVisible" :flag="flag" :dialogInfo="dialogInfo" @update:dialogVisible="dialogVisibles"></component-dialog>
    </div>
</template>
<script>
    import componentDialog from 'core/editor/modals/dialog'
    import { mapState, mapActions } from 'vuex'
    import { message } from 'ant-design-vue'

    export default {
        components: {
            componentDialog,
            message
        },
        data() {
            return {
                dialogVisible: false,
                dialogInfo:{},
                flag: 0,
                loading: true,
                pageSize:10
            }
        },
        methods: {
            ...mapActions('client', [
                'getClient',
                'deleteClient',
                'updateClient'
            ]),
            handleClick(info) {
                console.log(info)
                this.dialogVisible = true;
                if(info == 0){
                    this.flag = 0
                    this.dialogInfo = {}
                }else {
                    this.flag = 1
                    this.dialogInfo = info
                }
            },
            deleteClick(id){
                this.updateClient({'id':id})
                this.deleteClient().then(
                    this.getClient({'page':1, 'pageSize': 10}),
                    message.success("删除成功"),
                )
            },
            dialogVisibles(v){
                this.dialogVisible = v
            },
            handleSizeChange1: function(pageSize) { // 每页条数切换
                console.log(pageSize)
                this.pageSize = pageSize
                this.handleCurrentChange1(this.currentPage);
            },
            handleCurrentChange1: function(currentPage) {//页码切换
                console.log(currentPage)
                this.currentPage = currentPage
                this.currentChangePage()
            },
            //分页方法（重点）
            currentChangePage() {
                let from = this.currentPage;
                let to = this.pageSize;
                this.getClient({'page':from,'pageSize':to});
            },
        },
        computed: {
            ...mapState('client', ['clientList','total','currentPage']),
            computedWorks () {
                return this.clientList.map(w => ({
                    id: w.id,
                    name: w.name,
                    phone: w.phone || '',
                    nickname: w.nickname || '',
                    address: w.address || '',
                    avatar: w.avatar || ''
                }))
            }
        },
        created () {
            this.getClient({'page':this.currentPage, 'pageSize': this.pageSize}).then(this.loading = false)
        }
    }
</script>