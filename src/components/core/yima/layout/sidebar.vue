<template>
  <div class="app-sidebar">
    <div class="sidebar-menu-group" v-for="(menu, index) in menuData">
      <div class="menu-group-title" @click="menu.collapse = !menu.collapse">
        {{menu.title}}
        <i :class="[!menu.collapse ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline']"></i>
      </div>
      <el-collapse-transition>
        <div v-show="!menu.collapse" class="menu-group-list">
          <div class="menu-item"
               :data-key="item.key"
               :draggable= 'menu.isDrag'
               @dragstart="menuDrag($event, item.key)"
               v-for="item in menu.items">
            <div v-if="menu.isDrag" class="item-icon-box">
              <i :class="['fa', item.icon]" aria-hidden="true"></i>
            </div>
            <div v-else class="item-icon-box" >
              <i v-if="item.type === 'btn'" class="fa fa-plus" @click="addPage" aria-hidden="true"></i>
              <i v-else class="fa fa-file-text-o" :class="{'buttom-active': currentIndex === item.key}" aria-hidden="true" @click="lookPage(item.key)"></i>
            </div>
            <p v-if="menu.isDrag" class="item-text-box">{{item.text}}</p>
            <p v-else class="item-text-box">{{item.type == 'txt' ? item.key+item.text : item.text}}</p>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
      <span>切换页面后会自动保存当前页面</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="handleClose">切换页面</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
  // 左侧菜单配置
  import menuConfig from '@/config/menu.config.js'
  import {mapActions} from "vuex";
  import util from '@/utils/util.js'
  export default {
    name: 'AppSide',
    data() {
      return {
        menuData: menuConfig,
        dialogVisible: false,
        index: 0,
        currentIndex: 1
      }
    },
    props:{
      pages:{
          type: Array
      }
    },
    watch: {
        pages() {
            const obj = {
                key: '1',
                text: '页',
                type: 'txt',
                icon: 'fa-file-text-o'
            };
            let menus = []
            for(let i = 0; i < menuConfig.length; i++){
                if(!menuConfig[i]['isDrag']){
                    let menu = menuConfig[i]
                    console.log('BBB==>'+this.pages.length)
                    for(let j = 0; j < this.pages.length; j++){
                        let index = this.pages[j]
                        if(index == 1){
                            menu.items.splice(0, 1, obj);
                        }else {
                            let oj = util.copyObj(obj);
                            oj.key = index;
                            menu.items.splice(index - 1, 0, oj)
                        }
                        console.log('AAA===>'+JSON.stringify(menu));
                    }
                    //console.log('AAA===>'+JSON.stringify(menu));
                    menus.push(menu);
                }else{
                    menus.push(menuConfig[i])
                }
            }
            this.menuData = menus;
       }
    },
    methods: {
      ...mapActions('editor', [
        'updatePage',
        'setConfigList',
        'updateData'
      ]),
      menuDrag(e, key) {
        e.dataTransfer.setData('cmp-type', key)
      },
      addPage() {
        const obj = {
          key: '1',
          text: '页',
          type: 'txt',
          icon: 'fa-file-text-o'
        };
        for(let i = 0; i < menuConfig.length; i++){
          if(!menuConfig[i].isDrag){
            let index = menuConfig[i].items.length;
            this.currentIndex = index;
            this.updateData({currentPage: this.currentIndex});
            let page = {pageNum: index-1, pageCode: 'card'+(index-1), config: ''};
            this.updatePage(page);
            obj.key = index;
            menuConfig[i].items.splice(index -1, 0, obj)
            this.$emit('clearComp')
          }
        }
      },
      lookPage(i){
        this.dialogVisible = true
        this.index = i
      },
      handleClose() {
        console.log(this.index)
        this.dialogVisible = false
        let page = {pageNum: this.currentIndex, pageCode: 'card' + this.currentIndex, config: ''};
        this.updatePage(page);
        this.setConfigList(this.index)
        this.$emit('changeComp')
        this.currentIndex = this.index;
        this.updateData({currentPage: this.currentIndex});
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.buttom-active {
  background: #868484;
}

.app-sidebar {
  width: 290px;
  border-right: 1px solid #e8e8e8;
  padding-left: 14px;
  padding-bottom: 20px;
  box-sizing: border-box;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    background: rgba(0, 0, 0, 0.1);
  }

  .sidebar-menu-group {
    position: relative;

    .menu-group-title {
      position: relative;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      font-size: 14px;

      > i {
        position: absolute;
        right: 12px;
        top: 14px;
        color: #999;
      }
    }
    .menu-group-list {
      overflow: hidden;

      .menu-item {
        position: relative;
        box-sizing: content-box;
        float: left;
        width: 85px;
        height: 85px;
        background: #f4f5f6;
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
          margin-top: 18px;
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
  }
}
/* @media screen and (max-width: 1440px) {
  .app-sidebar {
    width: 100px;
    padding: 10px;

    .sidebar-menu-group {
      width: 80px;

      .menu-group-title i {
        right: 0;
      }
      .menu-group-list {
        .menu-item {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
} */
</style>
