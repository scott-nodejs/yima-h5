<template>
    <el-tabs :tab-position="dire" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(item,ix) in list" :label="item.text" :name="item.key">
            <div class="each-img" v-for="(it, i) in item.content">
                <div class="bg"><div class="img" :style="{backgroundImage: 'url(' + it.val + ')'}"></div></div>
                <div class="title">{{it.title}}</div>
            </div>

        </el-tab-pane>
    </el-tabs>
</template>
<script>
    export default {
        name: 'mytebs',
        props: {
            component: {
                type: Object
            }
        },
        data() {
            return {
                dire: this.component.base[0].val,
                activeName: 'idx1',
                list: this.component.action.config
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        watch: {
            component: {
                handler() {
                    this.dire = this.component.base[0].val
                },
                deep: true
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .each-img {
        margin-left: 10px;
        width: 120px;
        height: 158px;
    .bg {
        height: 120px;
        margin-right: .8em;
        text-align: center;
    .img {
        margin: 0 auto;
        height: 100%;
        background-color: #e9e9eb;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    }
    .title{
        margin-top: 5px;
        font-size: 14px;
        text-align: center;
    }
    }
</style>