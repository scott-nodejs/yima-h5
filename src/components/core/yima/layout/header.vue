<template>
  <header class="app-header">
    <img class="header-logo" src="https://img.hazer.top/logo.png">亿空间
  </header>
</template>

<script>
  export default {
    name: 'AppHeader'
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-header {
    position: relative;
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    background: rgba(38, 38, 38, 1);
    font-size: 16px;
    color: #fff;

    .header-logo {
      display: inline-block;
      width: 25px;
      height: 25px;
      vertical-align: middle;
      margin-right: 15px;
    }
  }
</style>
