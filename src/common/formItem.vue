<template>
  <div>
    <el-form-item class="small"
                  v-if="item.type === 'base-text'"
                  :label="item.label + '：'">
      <el-input v-model="item.val"
                :maxlength="item.maxLength || 128"
                :placeholder="item.placeholder ? item.placeholder : item.isNecessary ? '必填' : '非必填'"
                @blur="item.rules ? inputBlur(item.rules, item) : null">
      </el-input>
    </el-form-item>

    <el-form-item class="small"
                  v-if="item.type === 'color-picker'"
                  :label="item.label + '：'">
      <el-color-picker v-model="item.val"></el-color-picker>
    </el-form-item>

    <el-form-item class="small" v-if="item.type === 'font'" :label="item.label + '：'">
      <div :class="['font-set', item.val[0] === '600' ? 'checked' : '']"
           @click="setFont(item, item.attr[0])"><i class="fa fa-bold"></i></div>
      <div :class="['font-set', item.val[1] === 'underline' ? 'checked' : '']"
           @click="setFont(item, item.attr[1])"><i class="fa fa-underline"></i></div>
      <div :class="['font-set', item.val[2] === 'italic' ? 'checked' : '']"
           @click="setFont(item, item.attr[2])"><i class="fa fa-italic"></i></div>
      <div :class="['font-set', item.val[3] === 'left' ? 'checked' : '']"
           @click="setAlign(item, 'left')"><i class="fa fa-align-left"></i></div>
      <div :class="['font-set', item.val[3] === 'center' ? 'checked' : '']"
           @click="setAlign(item, 'center')"><i class="fa fa-align-center"></i></div>
      <div :class="['font-set', item.val[3] === 'right' ? 'checked' : '']"
           @click="setAlign(item, 'right')"><i class="fa fa-align-right"></i></div>
    </el-form-item>

    <el-form-item class="small"
                  v-if="item.type === 'textarea'"
                  :label="item.label + '：'">
      <el-input type="textarea"
                v-model="item.val"
                :rows="4"
                :placeholder="item.placeholder"></el-input>
    </el-form-item>

    <el-form-item class="small"
                  v-if="item.type === 'rtextarea'"
                  :label="item.label + '：'">
      <el-input type="textarea"
                v-model="item.val"
                :rows="10"
                :placeholder="item.placeholder"></el-input>
    </el-form-item>

    <el-form-item class="small"
                  v-if="item.type === 'text'"
                  :label="item.label + '：'">
      <el-input v-model="item.val"
                :placeholder="item.placeholder"></el-input>
    </el-form-item>

    <el-form-item class="small"
                  v-if="item.type === 'disText'"
                  :label="item.label + '：'">
      <el-input v-model="item.val"
                :placeholder="item.placeholder"></el-input>
    </el-form-item>

    <el-form-item class="small"
                  v-if="item.type === 'button'"
                  :label="item.label + ': '"
                >
      <el-button icon="el-icon-search" type="primary" @click="toMap">添加</el-button>
    </el-form-item>

    <el-dialog title="我的地图" :visible.sync="mapVisible" width="495px">
      <el-row>
        <el-col :span="4">地址: </el-col>
        <el-col :span="12"><el-input id="mapInput" placeholder="输入门店地点" :span="12" v-model="address" @input="placeAutoInput('mapInput')"></el-input></el-col>
        <el-col :span="5"><el-button @click="geoCode">搜索</el-button></el-col>
      </el-row>
      <el-row>
        <el-col :span="4">经纬值: </el-col>
        <el-col :span="12"><el-input :span="12" placeholder="自动匹配经纬度" v-model="mylnglat"></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="12" style="text-align: center;width:450px;background-color:#f2f3f4;">
          <div id="map" style="width: 450px;height: 350px;"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-button @click="saveAddress" type="primary">提交地址</el-button>
      </el-row>
    </el-dialog>

    <el-form-item class="small"
                  v-if="item.type === 'input-number'"
                  :label="item.label + '：'">
      <el-input-number v-model="item.val"
                       :min="item.min"
                       :max="item.max"
                       :step="item.step">
      </el-input-number>
    </el-form-item>

    <el-dialog title="富文本编辑器" :visible.sync="richVisible" width="1200px" style="height: 700px">
      <el-row>
        <!--<quill-editor v-model="richtxt" ></quill-editor>-->
        <editor
                v-model="tinymceHtml"
                id="tinymce"
                api-key="no-api-key"
                :disabled="editorOptions.disabled"
                :init="editorOptions.editorInit"
                output-format="html"
                @onChange="handleChange"
        />
      </el-row>
      <el-row>
        <el-button @click="saveRich" type="primary">提交</el-button>
      </el-row>
    </el-dialog>

    <el-form-item class="small"
                  v-if="item.type === 'richtext'"
                  :label="item.label + '：'">
      <el-button type="primary" @click="toRich">填写内容</el-button>
    </el-form-item>

    <el-form-item class="small"
                  v-if="item.type === 'select'"
                  :label="item.label + '：'">
      <el-select v-model="item.val" placeholder="默认选项">
        <el-option v-for="opt in item.options"
                   :key="opt.val"
                   :label="opt.name"
                   :value="opt.val">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item class="small"
                  v-if="item.type === 'radio'"
                  :label="item.label + '：'">
      <template v-for="opt in item.options">
        <el-radio v-model="item.val" :label="opt.val">{{opt.name}}</el-radio>
      </template>
    </el-form-item>

    <el-form-item class="small"
                  v-if="item.type === 'popup-radio'"
                  :label="item.label + '：'">
      <template v-for="opt in item.options">
        <el-radio v-model="item.val" :label="opt.val">{{opt.name}}</el-radio>
      </template>
      <template v-if="item.val">
        <el-form-item v-for="(it, index) in item.others">
          <upload v-if="it.type === 'upload'"
                  :id="index"
                  :label="it.label"
                  :item="it"
                  v-on:uploadSuccess="uploadSuccess">
          </upload>
          <el-form-item v-if="it.attr === 'popupDesc'" :label="it.label + '：'">
            <el-input  v-model="it.val"
                      :placeholder="it.placeholder"></el-input>
          </el-form-item>
          <el-form-item v-if="it.attr === 'buttonDesc'" :label="it.label + '：'">
            <el-input v-model="it.val"
                      :placeholder="it.placeholder"></el-input>
          </el-form-item>
        </el-form-item>
      </template>

    </el-form-item>

    <el-form-item class="small"
                  v-if="item.type === 'image-radio'"
                  :label="item.label + '：'">
      <template v-for="opt in item.options">
        <el-radio v-model="item.val" :label="opt.val">{{opt.name}}</el-radio>
      </template>
      <el-select v-if="!item.val " v-model="item.click" placeholder="请选择客户">
        <el-option
                v-for="clt in clients"
                :key="clt.id"
                :label="clt.name"
                :value="clt.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item class="small" v-if="selected" label="跳转：">

    </el-form-item>

    <el-form-item class="small"
                  v-if="item.type === 'formRadio'"
                  :label="item.label + '：'">
      <el-radio-group v-model="item.val" @change="agree(item, item.val)">
        <template v-for="opt in item.options">
          <el-radio  :label="opt.val">{{opt.name}}</el-radio>
        </template>
      </el-radio-group>
    </el-form-item>

    <el-form-item class="small"
                  v-if="item.type === 'datetime'"
                  :label="item.label + '：'">
      <el-date-picker type="datetime"
                      v-model="item.val"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期"></el-date-picker>
    </el-form-item>

    <upload v-if="item.type === 'upload'"
            :id="index"
            :label="item.label"
            :item="item"
            v-on:uploadSuccess="uploadSuccess">
    </upload>

    <videoGallery v-if="item.type === 'uploadVideo'"
            :item="item"
            :visible="item.visible"
            v-on:change="change"
    >
    </videoGallery>

    <el-form-item class="small" v-if="item.type == 'desc'" :label="item.label + '：'">
      <span class="form-item-desc" v-html="item.val"></span>
    </el-form-item>
    <place-search class="place-wrap"
                  ref="placeSearch"
                  v-if="resultVisible"
                  :result="result"
                  :left="offsetLeft"
                  :top="offsetTop"
                  :width="inputWidth"
                  :height="inputHeight"
                  @getLocation="getPlaceLocation"></place-search>
  </div>
</template>

<script>
  import upload from '@/common/upload.vue'
  import compConfig from '@/config/comp.config.js'
  import videoGallery from '@/common/video-gallery/gallery.js'
  import TEditor from '@/common/TEditor.vue'
  import placeSearch from './placeSearch.vue'
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/icons/default/icons' // 解决了icons.js 报错Unexpected token '<'
  // 引入富文本编辑器主题的js和css
  import 'tinymce/themes/silver/theme.min.js'
  import 'tinymce/skins/ui/oxide/skin.min.css'
  // 扩展插件
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/wordcount'
  import {mapActions, mapState} from "vuex";
  let map = null;
  let geocoder = new AMap.Geocoder({
      city: "010", //城市设为北京，默认：“全国”
  });
  export default {
    data() {
      return{
        formItem : this.item,
        mapVisible: false,
        richVisible: false,
        address: '',
        tinymceHtml: '',
        mylnglat: '',
        selected: false,
        inputId: '', // 地址搜索input对应的id
        result: [], // 地址搜索结果
        resultVisible: false, // 地址搜索结果显示标识
        inputWidth: 0, // 搜索框宽度
        inputHeight: 0, // 搜索框高度
        offsetLeft: 0, // 搜索框的左偏移值
        offsetTop: 0, // 搜索框的上偏移值
        snameMap: null,  // 上车地点地图选址
        snameMapShow: false,  // 上车地点地图选址显
          editorOptions: {
              disabled: false, // 编辑器是否只读
              editorInit: {
                  selector: '#tinymce', // 容器
                  language_url: '/tinymce/langs/zh_CN.js',
                  language: 'zh_CN',
                  skin_url: '/tinymce/skins/ui/oxide', // 主题
                  height: 300,
                  plugins: 'link lists image code table wordcount', // 用到的插件：链接、列表、图片、代码块、表格、字数
                  toolbar: 'undo redo | bold italic underline strikethrough | formatselect fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | link unlink table image | removeformat', // 工具栏
                  images_upload_handler: (blobInfo, success, failure) => { // 图片上传
                      console.log(blobInfo, success, failure, '上传图片====--==-')
                      //const img = 'data:image/jpeg;base64,' + blobInfo.base64()
                      // success(img)
                      this.handleImgUpload(blobInfo, success, failure)
                  },
                  statusbar: false, // 底部的状态栏
                  menubar: false, // 最上方的菜单
                  branding: false, // 水印“Powered by TinyMCE
                  max_height: 500,
                  min_height: 300
              }
          }
      }
    },
    props: {
      item: {
        type: Object
      },
      index: {
        type: Number
      },
      option: {
        type: Object
      }
    },
    components: {
      upload,
      videoGallery,
      placeSearch,
      Editor
    },
    created() {
      this.fetchClient()
    },
    computed:{
      ...mapState('client',["clients"])
    },
      mounted () {
          tinymce.init({})
      },
      watch: {
          item: {
              handler(val) {
                  this.formItem = val
              },
              deep: true
          }
      },
    methods: {
      ...mapActions('editor,client', [
        'uploadImg',
        'fetchClient'
      ]),
      setFont(item, attr) {
        if (attr === 'font-weight') {
          this.$set(item.val, 0, item.val[0] === '600' ? '400' : '600')
        }
        if (attr === 'text-decoration') {
          this.$set(item.val, 1, item.val[1] === 'underline' ? 'none' : 'underline')
        }
        if (attr === 'font-style') {
          this.$set(item.val, 2, item.val[2] === 'italic' ? 'inherit' : 'italic')
        }
      },
      setAlign(item, align) {
        this.$set(item.val, 3, align)
      },
      inputBlur(rule, item) {
        const reg = new RegExp(rule.regex)
        if (!item.val.match(reg)) {
          this.$alert(rule.tips, '提示')
          item.val = ''
          return false
        }
      },
      uploadSuccess(item, img) {
        console.log('uploadSuccess', item)
      },
      change(url){

      },
      getRichTxt(){
          console.log(this.richtxt)
      },
      getMap(){
        this.address = '';
        this.mylnglat = '';
        let _this = this;
         map = new AMap.Map("map",{
           resizeEnable: true,
           zoom: 13
         });
         map.on("click", showInfoClick);
         function showInfoClick(e) {
             map.clearMap();
             let lng = e.lnglat.getLng();
             let lat = e.lnglat.getLat();
             let marker = new AMap.Marker({
               position: [lng, lat]
             });
             _this.mylnglat = lng +","+lat;
             geocoder.getAddress([lng,lat], function(status, result) {
                 if (status === 'complete'&&result.regeocode) {
                     var address = result.regeocode.formattedAddress;
                     _this.address = address;
                 }else{
                     this.$alert('根据经纬度查询地址失败')
                 }
             });
             map.add(marker);
             map.setFitView(marker);
         }
      },
      toMap(){
        this.mapVisible = true
        setTimeout(()=>{
          this.getMap()
        }, 0);
      },
        toRich(){
            this.richVisible = true
            setTimeout(()=>{
                this.getMap()
            }, 0);
        },
      geoCode() {
          let _this = this;
          var marker = new AMap.Marker();
          console.log(geocoder);
          geocoder.getLocation(this.address, function(status, result){
              if (status === 'complete'&& result.geocodes.length) {
                  var lnglat = result.geocodes[0].location
                  _this.mylnglat = lnglat.lng+","+lnglat.lat;
                  marker.setPosition(lnglat);
                  map.add(marker);
                  map.setFitView(marker);
              }else{
                  this.$alert('根据地址查询位置失败');
              }
          });
      },
        placeAutoInput(inputId) {
            let currentDom = document.getElementById(inputId);// 获取input对象
            let keywords = currentDom.value;
            if(keywords.trim().length === 0) {
                this.resultVisible = false;
            }
            AMap.plugin('AMap.Autocomplete', () => {
                // 实例化Autocomplete
                let autoOptions = {
                    city: '全国'
                };
                let autoComplete = new AMap.Autocomplete(autoOptions); // 初始化autocomplete
                // 开始搜索
                autoComplete.search(keywords, (status, result) => {
                    // 搜索成功时，result即是对应的匹配数据
                    if(result.info === 'OK') {
                        let sizeObj = currentDom.getBoundingClientRect(); // 取得元素距离窗口的绝对位置
                        this.inputWidth = currentDom.clientWidth;// input的宽度
                        this.inputHeight = currentDom.clientHeight + 2;// input的高度，2是上下border的宽
                        // input元素相对于页面的绝对位置 = 元素相对于窗口的绝对位置
                        this.offsetTop = sizeObj.top + this.inputHeight; // 距顶部
                        this.offsetLeft = sizeObj.left; // 距左侧
                        this.result = result.tips;
                        this.inputId = inputId;
                        this.resultVisible = true;
                    }
                })
            })
        },
        getPlaceLocation(item) {
            if(item) {
                let _this = this;
                this.resultVisible = false;
                console.log(item)
                let lat = item.location.lat;
                let lng = item.location.lng;
                let marker = new AMap.Marker({
                    position: [lng, lat]
                });
                _this.mylnglat = lng +","+lat;
                geocoder.getAddress([lng,lat], function(status, result) {
                    if (status === 'complete'&&result.regeocode) {
                        var address = result.regeocode.formattedAddress;
                        _this.address = address;
                    }else{
                        this.$alert('根据经纬度查询地址失败')
                    }
                });
                map.add(marker);
                map.setFitView(marker);
            }
        },
      saveAddress(){
          let base = this.option.base
          console.log(base)
          for(let i = 0; i < base.length; i++){
              let item = base[i]
              if(item['type'] === 'disText' && item['attr'] === 'address'){
                  console.log(item['val'])
                  item['val'] = this.address;
                  console.log(item['val'])
              }
              if(item['type'] === 'disText' && item['attr'] === 'lnglat'){
                  item['val'] = this.mylnglat;
              }
          }
          this.mapVisible = false;
      },
      saveRich(){
          let base = this.option.base
          console.log(base)
          for(let i = 0; i < base.length; i++){
              let item = base[i]
              if(item['type'] === 'rtextarea'){
                  console.log(this.tinymceHtml)
                  item['val'] = this.tinymceHtml.replaceAll("<img","<img style=\"max-width: 100%;height:auto\" ");
              }
          }
          this.richVisible = false;
      },
        handleChange (e, editor) {
            console.log(e, editor, '===change事件')
        },
        // 图片上传
        handleImgUpload (blobInfo, success, failure) {
          this.baseUrl = 'http://img.hazer.top'
          const imgBase64 = `data:${blobInfo.blob().type};base64,${blobInfo.base64()}`
          const data = { img: imgBase64 }
          this.uploadImg (data).then(res => {
            // 传入success回调里的数据就是富文本编辑器里插入图片的src的值
            success(`${this.baseUrl}/${res.msg}`)
          }).catch(() => { failure('error') })
        },
        agree(item, val) {
          console.log(val)
          //this.$set(item.val, 2, val)
        },
        changeClient(data){
          this.list[0].click = data;
        }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  span.form-item-desc {
    font-size: 12px;
    color: #666;
    line-height: 1.2;
  }
</style>
