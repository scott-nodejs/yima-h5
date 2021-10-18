<template>
  <div :class="['comp-content', component.active ? 'active' : '']">
    <div class="text-box" v-html="getText"></div>
  </div>
</template>

<script>
  export default {
    name: 'RichText',
    props: {
      component: {
        type: Object
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
  .text-box {
    display: block;
    p img {
      max-width: 100%;
      height: auto;
    }
  }
  .text-box >>> img {
    max-width: 100%;
    height: auto;
  }
</style>
