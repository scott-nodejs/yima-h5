<template>
  <div>
    <template v-if="inputs && inputs.length">
      <div class="form-list-panel" v-for="(input, idx) in inputs">
        <el-form-item class="small" label="字段描述：">
          <el-input v-model="input.desc" :maxlength="60" placeholder="label名称"></el-input>
        </el-form-item>
        <el-form-item class="small" label="字段名称：">
          <el-input v-model="input.name" :maxlength="128" placeholder="接口对应的参数名"></el-input>
        </el-form-item>
        <el-form-item class="small" label="表单类型：">
          <el-select v-model="input.type" placeholder="默认选项">
          <el-option v-for="opt in inputTypes"
                     :key="opt.val"
                     :label="opt.name"
                     :value="opt.val">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item class="small" label="选项：" v-if="input.type === 'radio' || input.type === 'checkbox' || input.type === 'select'">
          <div v-for="(item,ix) in input.options">
            <div class="list-option-opt">
             <el-input v-model="item.val" :maxlength="50" style="width: 80px" placeholder="填写选项文案"></el-input>
              <a href="javascript:;" v-if="ix > 0"
                 @click="delOption(idx)"><i class="el-icon-delete"></i></a>
            </div>
          </div>
          <el-button icon="el-icon-plus" @click="addOption(idx)">添加选项</el-button>
        </el-form-item>
        <el-form-item class="small" label="是否必填：">
          <el-radio v-model="input.isNecessary" :label="1">是</el-radio>
          <el-radio v-model="input.isNecessary" :label="0">否</el-radio>
        </el-form-item>
        <el-form-item class="small" label="为空提示：">
          <el-input v-model="input.placeholder" :maxlength="128" placeholder="为空提示文案"></el-input>
        </el-form-item>
        <div class="list-item-opt">
          <a href="javascript:;" v-if="idx !== 0"
             @click="upInput(idx)"><i class="el-icon-arrow-up"></i></a>
          <a href="javascript:;" v-if="idx !== inputs.length - 1"
             @click="downInput(idx)"><i class="el-icon-arrow-down"></i></a>
          <a href="javascript:;" v-if="idx > 0"
             @click="delInput(idx)"><i class="el-icon-delete"></i></a>
        </div>
      </div>
    </template>
    <el-button icon="el-icon-plus" style="margin-top:15px;" round @click="addInput">添加表单项</el-button>
  </div>
</template>

<script>
  import util from '@/utils/util.js'
  import compConfig from '@/config/comp.config.js'
  export default {
    data() {
      return {
        inputs: this.forms,
        defaultConf: util.copyObj(compConfig['base-form']),
        inputTypes: [
          {
            name: '文本',
            val: 'text'
          }, {
            name: '数字',
            val: 'number'
          }, {
            name: '日期选择',
            val: 'date'
          }, {
            name: '下拉选择',
            val: 'select'
          }, {
            name: 'radio单选',
            val: 'radio'
          }, {
            name: 'checkbox多选',
            val: 'checkbox'
          }
        ]
      }
    },
    props: {
      forms: {
        type: Array
      }
    },
    watch: {
          forms: {
              handler(val) {
                  this.inputs = val
              },
              deep: true
          }
      },
    methods: {
      upInput(idx) {
        const tmp = util.copyObj(this.inputs[idx])
        this.inputs.splice(idx, 1)
        this.inputs.splice(idx - 1, 0, tmp)
      },
      downInput(idx) {
        const tmp = util.copyObj(this.inputs[idx])
        this.inputs.splice(idx, 1)
        this.inputs.splice(idx + 1, 0, tmp)
      },
      delInput(idx) {
        this.inputs.splice(idx, 1)
      },
      addInput() {
        if (this.inputs.length < 10) {
          let item = util.copyObj(this.defaultConf.action.config[0]);
          let name = this.defaultConf.action.config[0].name;
          item.name = name + this.inputs.length;
          this.inputs.push(item)
        } else {
          this.$alert('最多添加10个表单项！')
        }
      },
      addOption(idx){
          if (this.inputs[idx].options.length < 6) {
              let item = util.copyObj(this.defaultConf.action.config[0].options[0]);
              let name = this.defaultConf.action.config[0].options[0].name;
              item.name = name + this.inputs[idx].options.length;
              item.is_default = 0;
              this.inputs[idx].options.push(item)
          } else {
              this.$alert('最多添加6个选项！')
          }
      },
      delOption(idx) {
         this.inputs[idx].options.splice(idx, 1)
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
