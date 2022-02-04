<template>
  <div>
    <template v-if="list && list.length">
      <div class="form-list-panel" v-for="(item, idx) in list">
        <upload :label="'图片' + (idx + 1)"
                  :index="idx"
                  :item="item">
        </upload>
        <el-form-item class="small" label="标题：">
          <el-input v-model="item.title" :maxlength="128" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item class="small" label="描述：">
          <el-input v-model="item.desc" :maxlength="128" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item class="small" label="跳转：">
          <el-select v-model="item.click" placeholder="请选择客户" @change="changeClient">
            <el-option
                    v-for="clt in clients"
                    :key="clt.id"
                    :label="clt.name"
                    :value="clt.id"
            />
          </el-select>
        </el-form-item>
      </div>
    </template>
  </div>
</template>

<script>
  import util from '@/utils/util.js'
  import upload from '@/common/upload.vue'
  import compConfig from '@/config/comp.config.js'
  import { mapState, mapActions } from 'vuex'
  export default {
    components: {
      upload
    },
    data() {
      return {
        clientId: '',
        list: this.items,
        defaultConf: util.copyObj(compConfig['horizontal-list'])
      }
    },
    created() {
          this.fetchClient()
    },
    props: {
      items: {
        type: Array
      }
    },
    computed:{
          ...mapState('client',["clients"])
    },
    methods: {
      ...mapActions('client',[
          'fetchClient'
      ]),
      upItem(idx) {
        const tmp = util.copyObj(this.list[idx])
        this.list.splice(idx, 1)
        this.list.splice(idx - 1, 0, tmp)
      },
      downItem(idx) {
        const tmp = util.copyObj(this.list[idx])
        this.list.splice(idx, 1)
        this.list.splice(idx + 1, 0, tmp)
      },
      delItem(idx) {
        this.list.splice(idx, 1)
      },
      addItem() {
        if (this.list.length < 20) {
          this.list.push(util.copyObj(this.defaultConf.action.config[0]))
        } else {
          this.$alert('最多添加20个列表项！')
        }
      },
      changeClient(data){
         this.list[0].click = data;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
