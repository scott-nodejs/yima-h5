<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  * {
    &:focus {
      outline: none;
    }
  }

  body {
    margin: 0;
    padding: 0;
  }

  .tox-tinymce-aux {
    z-index: 9999 !important;
  }
</style>
