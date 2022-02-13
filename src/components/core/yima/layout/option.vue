<template>
  <div class="app-option">
    <el-form ref="options-form" label-width="80px" size="mini">

      <h2>【{{option.title}}】</h2>
      <el-form-item class="small" label="组件编号：">
        <span>{{option.domId}}</span>
      </el-form-item>
      <el-form-item class="small" label="组件名称：">
        <el-input v-model="option.domName"
                  maxlength="30"
                  placeholder="非必填，页内跳转配置使用"></el-input>
      </el-form-item>

      <template v-if="option.base && option.base.length">
        <template v-for="(item, idx) in option.base">
          <form-item :item="item" :option="option" :index="idx"></form-item>
        </template>
      </template>

      <template v-if="option.style && option.style.length">
        <h3><i class="el-icon-setting"></i> 样式配置</h3>
        <template v-for="(item, idx) in option.style">
          <form-item :item="item" :index="idx"></form-item>
        </template>
      </template>

      <template v-if="option.others && option.others.config.length">
        <h3><i class="el-icon-setting"></i> {{option.others.title}}</h3>
        <template v-for="(item, idx) in option.others.config">
          <form-item :item="item" :index="idx"></form-item>
        </template>
      </template>

      <template v-if="option.other && option.other.config.length">
        <h3><i class="el-icon-setting"></i> {{option.other.title}}</h3>
        <template>
          <lottery-button :lottery="option.other.config[0].buttons"></lottery-button>
        </template>
      </template>

      <template v-if="option.action">
        <h3><i class="el-icon-setting"></i> {{option.action.title}}</h3>

        <template v-if="option.action.type === 'image-click'">
          <image-click :show.sync="imageClickShow"
                       :img="option.style[1].val"
                       :clicks="option.action.config"></image-click>
          <el-button icon="el-icon-plus" :disabled="!option.style[1].val" round
                     @click="imageClickShow = true">点击区域配置</el-button>
        </template>

        <template v-if="option.action.type === 'swiper-click'">
          <banner-item :banners="option.action.config"></banner-item>
        </template>

        <template v-if="option.action.type === 'bottom-menu-click'">
          <bottom-menu-item :items="option.action.config"></bottom-menu-item>
        </template>

        <template v-if="option.action.type === 'floor-menu-click'">
          <floor-menu-item :menus="option.action.config"></floor-menu-item>
        </template>

        <template v-if="option.action.type === 'left-scroll-click'">
          <scroll-item :scrolls="option.action.config"></scroll-item>
        </template>

        <template v-if="option.action.type === 'horizontal-item-click'">
          <horizontal-item :items="option.action.config"></horizontal-item>
        </template>

        <template v-if="option.action.type === 'adjump-item-click'">
          <adJump-item :items="option.action.config"></adJump-item>
        </template>

        <template v-if="option.action.type === 'vertical-item-click'">
          <vertical-item :items="option.action.config"></vertical-item>
        </template>

        <template v-if="option.action.type === 'form-submit'">
          <input-item :forms="option.action.config"></input-item>
        </template>

        <template v-if="option.action.type === 'timeout-click'">
          <timeout-item :show.sync="timeoutClickShow"
                        :end="option.style[0].val"
                        :img="option.style[1].val"
                        :times="option.action.config"></timeout-item>
          <el-button icon="el-icon-plus" :disabled="!option.style[1].val" round
                     @click="timeoutClickShow = true">时间项配置</el-button>
        </template>

        <template v-if="option.action.type === 'grid-menu-click'">
          <grid-menu-item :grids="option.action.config"></grid-menu-item>
        </template>

        <template v-if="option.action.type === 'marquee-click'">
          <marquee-item :marquees="option.action.config"></marquee-item>
        </template>

        <template v-if="option.action.type === 'lottery-click'">
          <lottery-item :lotteryArr="option.action.config"></lottery-item>
        </template>

        <template v-if="option.action.type === 'page-paragraph-list'">
          <page-paragraph-item :paragraphs="option.action.config"></page-paragraph-item>
        </template>

        <template v-if="option.action.type === 'page-faq-list'">
          <page-faq-item :paragraphs="option.action.config"></page-faq-item>
        </template>

      </template>

    </el-form>
  </div>
</template>

<script>
  import formItem from '@/common/formItem.vue'
  import imageClick from 'core/yima/itemOption/imageClick.vue'
  import timeoutItem from 'core/yima/itemOption/timeoutItem.vue'
  import bannerItem from 'core/yima/itemOption/bannerItem.vue'
  import bottomMenuItem from 'core/yima/itemOption/bottomMenuItem.vue'
  import floorMenuItem from 'core/yima/itemOption/floorMenuItem.vue'
  import horizontalItem from 'core/yima/itemOption/horizontalItem.vue'
  import adJumpItem from 'core/yima/itemOption/adJumpItem.vue'
  import verticalItem from 'core/yima/itemOption/verticalItem.vue'
  import scrollItem from 'core/yima/itemOption/scrollItem.vue'
  import inputItem from 'core/yima/itemOption/inputItem.vue'
  import gridMenuItem from 'core/yima/itemOption/gridMenuItem.vue'
  import marqueeItem from 'core/yima/itemOption/marqueeItem.vue'
  import pageParagraphItem from 'core/yima/itemOption/pageParagraphItem.vue'
  import pageFaqItem from 'core/yima/itemOption/pageFaqItem.vue'
  import lotteryItem from 'core/yima/itemOption/lotteryItem.vue'
  import lotteryButton from 'core/yima/itemOption/lotterybutton.vue'
  import {mapState} from "vuex";

  export default {
    name: 'AppOption',
    data() {
      return {
        imageClickShow: false,
        timeoutClickShow: false
      }
    },
    computed: {
       ...mapState('editor', ['config']),
       config(){
          return this.config.pageListConfig;
       }
    },
    components: {
      formItem,
      imageClick,
      timeoutItem,
      bannerItem,
      bottomMenuItem,
      floorMenuItem,
      scrollItem,
      horizontalItem,
      verticalItem,
      inputItem,
      gridMenuItem,
      marqueeItem,
      pageParagraphItem,
      pageFaqItem,
      adJumpItem,
      lotteryItem,
      lotteryButton
    },
    props: {
      option: {
        type: Object
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
.app-option {
  width: 360px;
  padding: 0 10px 0 5px;
  overflow: auto;
  border-left: 1px solid #e8e8e8;

  h2 {
    margin: 13px 0;
    font-size: 14px;
  }

  .el-form {
    padding-bottom: 30px;

    > h3 {
      background-color: #f2f3f4;
      padding: 5px 10px;
      font-size: 14px;
    }

    .el-form-item.small {
      margin-bottom: 5px;

      .font-set {
        display: inline-block;
        width: 28px;
        height: 28px;
        text-align: center;
        cursor: pointer;
        &.checked {
          color: #fff;
          background-color: #333;
        }
      }

      .el-date-editor.el-input {
        width: 186px;
        .el-input__inner {
          padding-left: 30px !important;
        }
      }

      .el-input__inner {
        padding: 0 10px;
      }

      .el-textarea__inner {
        padding: 5px 10px;
      }

      .el-form-item__label {
        padding-right: 0;
        font-size: 13px;
      }
    }

    .form-list-panel {
      margin-top: 15px;
      border: 1px solid #e8e8e8;
      padding: 10px 10px 5px 5px;

      &:first-child {
        margin-top: 0;
      }

      .list-item-opt {
        text-align: right;

        > a {
          margin-left: 10px;
          color: #2aa7ff;
          font-size: 12px;
        }
      }

      .list-option-opt {
        text-align: left;

        > a {
          margin-left: 10px;
          color: #2aa7ff;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
