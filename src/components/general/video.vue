<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="getStyle">
    <div class="video-box">
      <video v-if="videoUrl" :src="videoUrl"></video>
      <div v-else class="video-placeholder"><i class="fa fa-video-camera"></i></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BaseVideo',
    props: {
      component: {
        type: Object
      }
    },
    data() {
      return {
        videoUrl: this.component.style[1].val
      }
    },
    computed: {
      getStyle() {
        const ret = []
        this.component.style.forEach((item) => {
          const unit = item.unit || ''
          item.val && ret.push(item.attr + ':' + item.val + unit)
        })
        return ret.join(';')
      }
    },
    watch: {
      component: {
        handler() {
          this.videoUrl = this.component.style[1].val
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .video-box {
    position: relative;
    overflow: hidden;

    .video-placeholder {
      width: 100%;
      height: 100px;
      line-height: 100px;
      text-align: center;

      > .fa {
        color: #83c0ff;
        font-size: 40px;
      }
    }

    video {
      display: block;
      width: 100%;
      height: auto;
      margin: 0;
      border: 0;
      -webkit-user-drag: none;
    }
  }
</style>
