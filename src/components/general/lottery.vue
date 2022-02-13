<template>
  <div :style="getStyle">
    <LuckyWheel
            ref="myLucky"
            :width="lwidth"
            :height="lheight"
            :prizes="prizes"
            :blocks="blocks"
            :buttons="buttons"
            @start="startCallback"
            @end="endCallback"
    />
    <div class="lotteryCon">每人每天抽奖<span>{{times}}</span>次</div>
  </div>

</template>

<script>
    export default {
        name: 'lottery',
        props: {
            component: {
                type: Object
            }
        },
        computed: {
            getStyle() {
                const ret = []
                this.component.style.slice(3,7).forEach((item) => {
                    const unit = item.unit || ''
                    item.val && ret.push(item.attr + ':' + item.val + unit)
                })
                return ret.join(';')
            }
        },
        data () {
            return {
                lwidth: this.component.base[2].val,
                lheight: this.component.base[3].val,
                times: this.component.base[1].val,
                blocks: [{
                    padding: this.component.style[1].val+'px',
                    background: this.component.style[0].val,
                    imgs: [{src: this.component.style[2].val}]
                }],
                prizes: this.component.action.config,
                buttons: [{
                    radius: this.component.other.config[0].buttons[0].radius,
                    background: this.component.other.config[0].buttons[0].background,
                    pointer: this.component.other.config[0].buttons[0].pointer.val,
                    fonts: this.component.other.config[0].buttons[0].fonts,
                }],
            }
        },
        watch: {
            component: {
                handler() {
                    console.log(this.component.base[2].val)
                    this.lwidth = this.component.base[2].val,
                    this.lheight = this.component.base[3].val,
                    this.times = this.component.base[1].val,
                    this.blocks = [{
                        padding: this.component.style[1].val+'px',
                        background: this.component.style[0].val,
                        imgs: [{src: this.component.style[2].val}]
                    }],                    this.prizes = this.component.action.config,
                    this.buttons = [{
                        radius: this.component.other.config[0].buttons[0].radius,
                        background: this.component.other.config[0].buttons[0].background,
                        pointer: this.component.other.config[0].buttons[0].pointer.val,
                        fonts: this.component.other.config[0].buttons[0].fonts,
                    }]
                },
                deep: true
            }
        },
        methods: {
            // 点击抽奖按钮会触发star回调
            startCallback () {
                // 调用抽奖组件的play方法开始游戏
                this.$refs.myLucky.play()
                // 模拟调用接口异步抽奖
                setTimeout(() => {
                    // 假设后端返回的中奖索引是0
                    const index = 0
                    // 调用stop停止旋转并传递中奖索引
                    this.$refs.myLucky.stop(index)
                }, 3000)
            },
            // 抽奖结束会触发end回调
            endCallback (prize) {
                console.log(prize)
            },
        }
    }
</script>
<style>
  .lotteryCon{
    text-align: center;
  }
</style>