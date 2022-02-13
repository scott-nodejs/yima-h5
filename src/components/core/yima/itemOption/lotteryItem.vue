<template>
    <div>
        <template v-if="items && items.length">
            <div class="form-list-panel" v-for="(item, idx) in items">
                <upload :label="'图片' + (idx + 1)"
                        :index="idx"
                        :item="item">
                </upload>
                <template v-if="item.fonts[0]">
                    <el-form-item class="small" label="标题：">
                        <el-input v-model="item.fonts[0].text" :maxlength="128"></el-input>
                    </el-form-item>
                    <el-form-item class="small" label="字体大小：">
                        <el-input-number v-model="item.fonts[0].fontSize"
                                         :min="10"
                                         :max="30"
                                         :step="1">
                        </el-input-number>
                    </el-form-item>
                    <el-form-item class="small" label="字体颜色：">
                        <el-color-picker v-model="item.fonts[0].fontColor"></el-color-picker>
                    </el-form-item>
                    <el-form-item class="small" label="背景色：">
                        <el-color-picker v-model="item.background"></el-color-picker>
                    </el-form-item>
                    <el-form-item class="small" label="中奖概率：">
                        <el-input-number v-model="item.range"
                                         :min="0"
                                         :max="100"
                                         :step="1">
                        </el-input-number>
                    </el-form-item>
                </template>
                <div class="list-item-opt">
                    <a href="javascript:;" v-if="idx !== 0"
                       @click="upItem(idx)"><i class="el-icon-arrow-up"></i></a>
                    <a href="javascript:;" v-if="idx !== items.length - 1"
                       @click="downItem(idx)"><i class="el-icon-arrow-down"></i></a>
                    <a href="javascript:;" v-if="idx > 0"
                       @click="delItem(idx)"><i class="el-icon-delete"></i></a>
                </div>
            </div>
        </template>
        <el-button icon="el-icon-plus" style="margin-top:15px;" round @click="addItem">添加奖品项</el-button>
    </div>
</template>

<script>
    import util from '@/utils/util.js'
    import compConfig from '@/config/comp.config.js'
    import upload from '@/common/upload1.vue'
    export default {
        data() {
            return {
                defaultConf: util.copyObj(compConfig['lottery']),
                items: this.lotteryArr
            }
        },
        components: {
            upload
        },
        props: {
            lotteryArr: {
                type: Array
            }
        },
        watch: {
            lotteryArr: {
                handler(val) {
                    this.items = val
                },
                deep: true
            }
        },
        methods: {
            showClick(banner, idx) {
                this.$bus.$emit('click:show', idx, ['outside'])
            },
            upItem(idx) {
                const tmp = util.copyObj(this.items[idx])
                this.items.splice(idx, 1)
                this.items.splice(idx - 1, 0, tmp)
            },
            downItem(idx) {
                const tmp = util.copyObj(this.items[idx])
                this.items.splice(idx, 1)
                this.items.splice(idx + 1, 0, tmp)
            },
            delItem(idx) {
                this.items.splice(idx, 1)
            },
            addItem() {
                if (this.items.length < 8) {
                    this.items.push(util.copyObj(this.defaultConf.action.config[0]))
                } else {
                    this.$alert('最多添加8个图片项！')
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
