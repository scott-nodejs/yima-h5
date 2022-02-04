<template>
  <div>
    <template v-if="items && items.length">
      <div class="form-list-panel" v-for="(item, idx) in items">
        <el-form-item class="small" label="导航文案：">
          <el-input v-model="item.text" :maxlength="500" placeholder="跳转项文案"></el-input>
        </el-form-item>
        <template v-if="item.click">
          <el-form-item class="small" label="跳转到：">
            <span style="word-break: break-all;">{{item.click.href}}</span>
          </el-form-item>
        </template>
        <template v-for="(it, index) in item.content">
          <div  class="form-list-panel" >
            <upload  :label="'图片' + (index + 1)"
                    :index="index"
                    :item="it">
            </upload>
            <el-form-item class="small" label="标题：">
              <el-input v-model="it.title" :maxlength="500"></el-input>
            </el-form-item>
            <div class="list-item-opt">
              <a href="javascript:;" v-if="index !== 0"
                 @click="upContent(idx,index)"><i class="el-icon-arrow-up"></i></a>
              <a href="javascript:;" v-if="index !== items.length - 1"
                 @click="downContent(idx, index)"><i class="el-icon-arrow-down"></i></a>
              <a href="javascript:;" v-if="index > 0"
                 @click="delContent(idx, index)"><i class="el-icon-delete"></i></a>
            </div>
          </div>
        </template>
        <el-button icon="el-icon-plus" style="margin-top:15px;" round @click="addContent(idx)">添加图片</el-button>
        <!--<el-form-item class="small" label="点击配置：">-->
          <!--<el-button icon="el-icon-edit" round @click="showClick(item, idx)">配置跳转</el-button>-->
        <!--</el-form-item>-->
        <div class="list-item-opt">
          <a href="javascript:;" v-if="idx !== 0"
             @click="upItem(idx)"><i class="el-icon-arrow-up"></i></a>
          <a href="javascript:;" v-if="idx !== items.length - 1"
             @click="downItem(idx)"><i class="el-icon-arrow-down"></i></a>
          <a href="javascript:;" v-if="idx > 0"
             @click="delItem(idx)"><i class="el-icon-delete"></i></a>
        </div>
      </div>
    </template>
    <el-button icon="el-icon-plus" style="margin-top:15px;" round @click="addItem">添加跳转项</el-button>
  </div>
</template>

<script>
  import util from '@/utils/util.js'
  import compConfig from '@/config/comp.config.js'
  import upload from '@/common/upload.vue'
  export default {
    data() {
      return {
        defaultConf: util.copyObj(compConfig['floor-menu']),
        items: this.menus
      }
    },
    props: {
      menus: {
        type: Array
      }
    },
    components: {
      upload
    },
    watch: {
      menus: {
        handler(val) {
          this.items = val
        },
        deep: true
      }
    },
    methods: {
      showClick(banner, idx) {
        this.$bus.$emit('click:show', idx, ['page'])
      },
      upItem(idx) {
        const tmp = util.copyObj(this.items[idx])
        this.items.splice(idx, 1)
        this.items.splice(idx - 1, 0, tmp)
      },
      downItem(idx) {
        const tmp = util.copyObj(this.items[idx])
        this.items.splice(idx, 1)
        this.items.splice(idx + 1, 0, tmp)
      },
      delItem(idx) {
        this.items.splice(idx, 1)
      },
      addItem() {
        const len = this.items.length;
        const obj = {
            text: '默认项'+(len+1),
            key: 'idx'+(len+1),
            content: [{
                val: 'https://img.hazer.top/logo1.png',
                title: '默认标题'+(len+1)
            }]
        };
        if (this.items.length < 18) {
          this.items.push(util.copyObj(obj))
        } else {
          this.$alert('最多添加18个导航项！')
        }
      },
      addContent(index) {
         const obj = {
             val: 'https://img.hazer.top/logo1.png',
             title: '默认标题1'
         };
         if (this.items[index].content.length < 5) {
            this.items[index].content.push(util.copyObj(obj))
         } else {
            this.$alert('最多添加5个内容项！')
         }
       },
        upContent(idx, index) {
            const tmp = util.copyObj(this.items[idx].content[index])
            this.items[idx].content.splice(index, 1)
            this.items[idx].content.splice(index - 1, 0, tmp)
        },
        downContent(idx, index) {
            const tmp = util.copyObj(this.items[idx].content[index])
            this.items[idx].content.splice(index, 1)
            this.items[idx].content.splice(index + 1, 0, tmp)
        },
        delContent(idx, index) {
            this.items[idx].content.splice(index, 1)
        },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
