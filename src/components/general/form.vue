<template>
  <div :class="['comp-content', component.active ? 'active' : '']"
       :style="style">
    <div class="form-box">
      <div :class="[method == 0 ? 'form-box-item' : 'form-box-item1']"
           :style="{marginTop: component.others.config[4].val + 'px'}"
           v-if="inputs.length" v-for="input in inputs">
        <label :style="labelStyle">{{input.desc}}</label>
        <div v-if="input.type === 'radio'">
          <div v-for="(item,ix) in input.options">
            <!--<label>{{item.val}}<input class="item-input"-->
                   <!--:style="inputStyle"-->
                   <!--:type="input.type"-->
                   <!--:placeholder="input.placeholder ? input.placeholder : input.isNecessary ? '必填' : '非必填'">-->
            <!--</label>-->
            <el-radio style="display: flex" v-model="radio" label="1">{{item.val}}</el-radio>
          </div>
        </div>
        <div v-else-if="input.type === 'checkbox'">
          <div v-for="(item,ix) in input.options" style="display: flex;">
            <el-checkbox v-model="checked">{{item.val}}</el-checkbox>
          </div>
        </div>
        <input class="item-input" v-else-if="input.type !== 'select'"
               :style="inputStyle"
               :type="input.type"
               :placeholder="input.placeholder ? input.placeholder : input.isNecessary ? '必填' : '非必填'">
        <el-select v-model="value" placeholder="请选择" v-else>
          <el-option
                  v-for="item in input.options"
                  :key="item.name"
                  :label="item.val"
                  :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div v-else class="image-placeholder"><i class="fa fa-list"></i></div>
      <div class="form-btn" :style="buttonStyle">提 交</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BaseForm',
    props: {
      component: {
        type: Object
      }
    },
    data() {
      return {
        style: this.getStyle(),
        labelStyle: this.getLabelStyle(),
        inputStyle: this.getInputStyle(),
        buttonStyle: this.getButtonStyle(),
        inputs: this.component.action.config,
        method: this.component.dirWay
      }
    },
    methods: {
      getStyle() {
        const ret = []
        this.component.style.forEach((item) => {
          if (item.val) {
            if (item.attr === 'background-image') {
              ret.push(item.attr + ':url(' + item.val + ')')
            } else {
              const unit = item.unit || ''
              ret.push(item.attr + ':' + item.val + unit)
            }
          }
        })
        return ret.join(';')
      },
      getLabelStyle() {
        console.log(this.component.base[2].val)
        const ret = []
        if(this.component.base[2].val !== 0){
            ret.push(
                'width: 300px',
                'height: 24px',
                'line-height:' + this.component.others.config[1].val + 'px'
            )
        }else{
            ret.push('width:' + this.component.others.config[0].val + 'px',
                'height:' + this.component.others.config[1].val + 'px',
                'line-height:' + this.component.others.config[1].val + 'px')
        }
        return ret.join(';')
      },
      getInputStyle() {
        const ret = []
        this.component.others.config.forEach((item) => {
          const isInput = item.attr.indexOf('form-input_')
          const idx = item.attr.indexOf('_')
          if (isInput === 0) {
            const unit = item.unit || ''
            item.val && ret.push(item.attr.substring(idx + 1, item.attr.length) + ':' + item.val + unit)
          }
        })
        return ret.join(';')
      },
      getButtonStyle() {
        const ret = []
        this.component.others.config.forEach((item) => {
          const isInput = item.attr.indexOf('form-btn_')
          const idx = item.attr.indexOf('_')
          if (isInput === 0) {
            const unit = item.unit || ''
            const attr = item.attr.substring(idx + 1, item.attr.length)
            item.val && ret.push(attr + ':' + item.val + unit)
            attr === 'height' && ret.push('line-height:' + (parseInt(item.val) - 2 + unit))
          }
        })
        return ret.join(';')
      }
    },
    watch: {
      component: {
        handler() {
          console.log("aaa=>"+this.component.base[2].val)
          this.style = this.getStyle()
          this.labelStyle = this.getLabelStyle()
          this.inputStyle = this.getInputStyle()
          this.buttonStyle = this.getButtonStyle()
          this.inputs = this.component.action.config,
          this.method = this.component.base[2].val
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .form-box {
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

    .form-box-item {
      display: flex;

      > label {
        display: block;
      }

      .item-input {
        flex: 1;
        padding: 5px 10px;
        box-sizing: border-box;
        border: 1px solid;
        outline: 0;
      }
    }

    .form-box-item1 {

      > label {
        display: block;
      }

      .item-input {
        flex: 1;
        padding: 5px 10px;
        box-sizing: border-box;
        border: 1px solid;
        outline: 0;
      }
    }

    .form-btn {
      box-sizing: border-box;
      border: 1px solid;
      text-align: center;
    }
  }
</style>
