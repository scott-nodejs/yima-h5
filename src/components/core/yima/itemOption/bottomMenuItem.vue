<template>
  <div>
    <template v-if="menus && menus.length">
      <div class="form-list-panel" v-for="(menu, idx) in menus">
        <template v-if="menu.click">
          <el-form-item class="small" label="跳转到：">
            <span style="word-break: break-all;">{{menu.click.href}}</span>
          </el-form-item>
        </template>
        <el-form-item class="small" label="导航图标：">
          <div class="menu-group-list">
            <div v-for="(v,key) in icons" class="menu-item" @click="handleClick(v,key,idx)" :class="{'buttom-active': activeKey === key}"><div class="item-icon-box iconfont" :class="v"></div></div>
          </div>
        </el-form-item>
        <el-form-item class="small" label="图标文本： ">
          <el-input v-model="menu.name" :maxlength="128" placeholder="图标文本"></el-input>
        </el-form-item>
        <!--<el-form-item class="small" label="表单类型：">-->
          <!--<el-input v-model="menu.model" :maxlength="128" placeholder="code"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item class="small" label="点击配置：">
          <el-button icon="el-icon-edit" round @click="showClick(menu, idx)">配置跳转</el-button>
        </el-form-item>
        <el-form-item class="small"
                      label="会员页面：">
          <template v-for="opt in menu.isVip.options">
            <el-radio v-model="menu.vip" :label="opt.val">{{opt.name}}</el-radio>
          </template>
        </el-form-item>
        <upload :label="'图片' + (idx + 1)"
                :index="idx"
                :item="menu"
                v-on:uploadSuccess="uploadSuccess">
        </upload>
        <div class="list-item-opt">
          <a href="javascript:;" v-if="idx !== 0"
             @click="upItem(idx)"><i class="el-icon-arrow-up"></i></a>
          <a href="javascript:;" v-if="idx !== menus.length - 1"
             @click="downItem(idx)"><i class="el-icon-arrow-down"></i></a>
          <a href="javascript:;" v-if="idx > 0"
             @click="delItem(idx)"><i class="el-icon-delete"></i></a>
        </div>
      </div>
    </template>
    <el-button icon="el-icon-plus" style="margin-top:15px;" round @click="addItem">添加导航项</el-button>
  </div>
</template>

<script>
  import util from '@/utils/util.js'
  import compConfig from '@/config/comp.config.js'
  import upload from '@/common/upload.vue'
  import {mapState} from "vuex";

  export default {
    data() {
      return {
        defaultConf: util.copyObj(compConfig['bottom-menu']),
        menus: this.items,
        selects: ['card1', 'card2'],
        icons: ['icontabbar01','icontabbar02','icontabbar03','icontabbar04','icontabbar05',
               'iconicon_more','iconicon_clock','iconicon_filter','iconicon_rank','iconicon_detail'
        ],
        activeKey: 0,
        val: ''
      }
    },
    components: {
      upload
    },
    props: {
      items: {
        type: Array
      }
    },
    watch: {
      items: {
        handler(val) {
          this.menus = val
        },
        deep: true
      }
    },
    methods: {
      showClick(banner, idx) {
        // 底部导航只可配置外链
        this.$bus.$emit('click:show', idx, ['outside'])
      },
      upItem(idx) {
        const tmp = util.copyObj(this.menus[idx])
        this.menus.splice(idx, 1)
        this.menus.splice(idx - 1, 0, tmp)
      },
      downItem(idx) {
        const tmp = util.copyObj(this.slides[idx])
        this.menus.splice(idx, 1)
        this.menus.splice(idx + 1, 0, tmp)
      },
      delItem(idx) {
        this.menus.splice(idx, 1)
      },
      addItem() {
        if (this.menus.length < 10) {
          this.menus.push(util.copyObj(this.defaultConf.action.config[0]))
        } else {
          this.$alert('最多添加5个导航项！')
        }
      },
      uploadSuccess(item, img, idx) {
        console.log('uploadSuccess', item)
      },
      handleClick(v,key,idx){
          this.val = v;
          this.menus[idx]['icon'] = v;
          this.activeKey = key;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .buttom-active {
    background: #1593ff;
  }
  .menu-group-list {
    overflow: hidden;

    .menu-item {
      position: relative;
      box-sizing: content-box;
      float: left;
      width: 40px;
      height: 40px;
      /*background: #f4f5f6;*/
      border-right: 1px solid #fff;
      border-bottom: 1px solid #fff;
      cursor: pointer;
      z-index: 0;

      &:hover {
        opacity: .6;
      }

      /* &:nth-child(2n) {
        border-right: 0;
      }*/

      .item-icon-box {
        text-align: center;
        margin-top: 6px;
        height: 32px;

        > .fa {
          font-size: 24px;
          color: #409eff;
        }
      }

      .item-text-box {
        text-align: center;
        height: 20px;
        line-height: 20px;
        margin: 0;
        font-size: 12px;
      }
    }
  }
</style>
