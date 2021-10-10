<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="getStyle">
    <div class="image-box">
        <a-card hoverable style="width: 100%">
          <img
                  slot="cover"
                  alt="无图片"
                  :src="imgUrl"
          />
          <a-card-meta :title="company">
            <template slot="description">
              <a-form>
                <a-form-item label="联系人" :label-col="{ span: 5 }" :wrapper-col="{ span: 7 }">{{userName}}</a-form-item>
                <a-form-item label="电  话" :label-col="{ span: 5 }" :wrapper-col="{ span: 7 }">{{phone}}</a-form-item>
                <a-form-item label="微  信" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">{{weixin}}</a-form-item>
                <a-form-item label="地  址" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">{{address}}</a-form-item>
              </a-form>
            </template>
          </a-card-meta>
        </a-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header1',
    props: {
      component: {
        type: Object
      }
    },
    data() {
      return {
        imgUrl: this.component.style[0].val,
        userName: this.component.base[0].val,
        phone: this.component.base[1].val,
        address: this.component.base[5].val,
        company: this.component.base[2].val,
        weixin: this.component.base[3].val
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
          this.imgUrl = this.component.style[0].val,
          this.userName = this.component.base[0].val,
          this.phone = this.component.base[1].val,
          this.address = this.component.base[5].val,
          this.company = this.component.base[2].val,
          this.weixin = this.component.base[3].val
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .image-box {
    position: relative;
    overflow: hidden;

    .image-placeholder {
      width: 100%;
      height: 100px;
      line-height: 100px;
      text-align: center;

      > .fa {
        color: #83c0ff;
        font-size: 40px;
      }
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      margin: 0;
      border: 0;
      -webkit-user-drag: none;
    }
  }
</style>
