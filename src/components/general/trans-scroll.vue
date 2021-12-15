<template>
  <div class="lateral-sliding">
    <div class="lateral-sliding-item" v-for="(item,index) in list" :key="index">
      <div class="each-img">
        <div class="bg"><div class="img" :style="{backgroundImage: 'url(' + item.val + ')'}"></div></div>
        <div class="title">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'tscroll',
        props: {
            component: {
                type: Object
            }
        },
        data () {
            return {
                list: this.component.action.config
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .lateral-sliding {
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
  }
  .lateral-sliding-item {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    margin-right: 8px;
  }
  .each-img {
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