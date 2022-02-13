<template>
    <div>
        <template v-if="items && items.length">
            <div class="form-list-panel" v-for="(item, idx) in items">
                <template>
                    <el-form-item class="small" label="文字：">
                        <el-input v-model="item.fonts[0].text" :maxlength="128"></el-input>
                    </el-form-item>
                    <el-form-item class="small" label="字体大小：">
                        <el-input-number v-model="item.fonts[0].fontSize"
                                         :min="10"
                                         :max="30"
                                         :step="1">
                        </el-input-number>
                    </el-form-item>
                    <el-form-item>
                        <el-radio-group v-model="item.pointer.val">
                            <template v-for="opt in item.pointer.options">
                                <el-radio  :label="opt.val">{{opt.name}}</el-radio>
                            </template>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item class="small" label="半径大小：">
                        <el-input-number v-model="item.radius"
                                         :min="30"
                                         :max="60"
                                         :step="1">
                        </el-input-number>
                    </el-form-item>
                    <el-form-item class="small" label="字体颜色：">
                        <el-color-picker v-model="item.fonts[0].fontColor"></el-color-picker>
                    </el-form-item>
                    <el-form-item class="small" label="背景色：">
                        <el-color-picker v-model="item.background"></el-color-picker>
                    </el-form-item>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: this.lottery
            }
        },
        props: {
            lottery: {
                type: Array
            }
        },
        watch: {
            lottery: {
                handler(val) {
                    this.items = val
                },
                deep: true
            }
        },
        methods: {

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
