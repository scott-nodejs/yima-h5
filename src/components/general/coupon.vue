<template>
  <div :class="['comp-content', component.active ? 'active' : '']">
    <div class="pd16_15">
      <div class="box over-hide">
        <div class="card-box-header">
          <div class="bg"></div>
          <div class="main pd16_30">
            <div class="flex space">
              <div class="font-15 cl-w">
                <span class="font-25">{{money}}</span>元优惠券
              </div>
              <div>
                <div class="tag-save">{{condition}}</div>
                <div class="cl-w">{{time}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="pd16_15">
          {{shop}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'coupon',
    props: {
      component: {
        type: Object
      }
    },
      data() {
          return {
              condition: this.component.base[0].val,
              money: this.component.base[1].val,
              time: this.component.base[2].val,
              shop: this.component.base[3].val
          }
      },
    watch: {
        component: {
            handler() {
                this.condition = this.component.base[0].val,
                this.money = this.component.base[1].val,
                this.time = this.component.base[2].val,
                this.shop = this.component.base[3].val
            },
            deep: true
        }
    },
    computed: {
      getText() {
        const arr = this.component.base[1].val.split('\n')
        if (arr.length) {
          return arr.join('<br/>')
        }
        return this.component.base[1].val
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .comp-content {
    background-repeat: no-repeat;
  }

  .pd16_15{
    padding: 10px 14px;
  }

  .pd16_30{
    padding: 30px 14px;
  }

  .over-hide{
    overflow: hidden;
  }

  .box {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 3px 19px 0px rgb(0 0 0 / 4%);
    border-radius: 15px;
  }

  .card-box-header{
    height: 91px;
    width: 100%;
    background: #E4A216;
    position: relative;
  }

  .card-box-header >>> main{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 91px;
  }

  .text-box >>> img {
    max-width: 100%;
    height: auto;
  }

  .font-25{
    font-size: 25px;
    font-weight: 600;
  }

  .font-15{
    font-size: 15px;
    font-weight: 600;
  }

  .cl-w{
    color: #FFFFFF;
  }

  .flex{
    display: flex;
  }

  .space{
    justify-content: space-between;
  }

  .tag-save{
    width: 106px;
    height: 23px;
    background: #FFFFFF;
    border-radius: 9px;
    font-size: 13px;
    text-align: center;
    line-height: 19px;
    color: #E4A216;
    font-weight: 500;
  }
</style>
