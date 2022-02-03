import QRCode from 'qrcode'
import QrCodeWithLogo from "qrcode-with-logos";
import CardCover from './card-cover'
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    isTemplate: {
      type: Boolean,
      default: false
    },
    work: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    qrcodeUrl: ''
  }),
  methods: {
      ...mapActions('client', [
          'genWxQrCode'
      ]),
    timeFmt (date) {
      const dateTime = new Date(date)
      const displayTime = `${dateTime.getFullYear()}-${dateTime.getMonth() +
        1}-${dateTime.getDate()}`
      return displayTime
    },
    genQRCodeUrl (work) {
      const url = `http://yima.hazer.top/h5/#/subpkg/pages/index/index?clientId=${work.clientId}`
      console.log(url)
      // QRCode.toDataURL(url, (err, url) => {
      //   if (err) console.log(err)
      //   this.qrcodeUrl = url
      // })
        let qrcode1 = new QrCodeWithLogo({
            content: url,
            width: 380,
            //   download: true,
            logo: {
                src: work.avatar
            }
        });
      qrcode1.getCanvas().then(canvas => {
            this. qrcodeUrl = canvas.toDataURL()
        });
    },
    downloadQRCodeUrl(work){
      const url = `http://yima.hazer.top/h5/#/subpkg/pages/index/index?clientId=${work.clientId}`
      // QRCode.toDataURL(url, (err, url) => {
      //   if (err) console.log(err)
      //   const imgUrl = url
      //   let a = document.createElement("a");
      //   a.href = imgUrl;
      //   a.setAttribute("download", work.title);
      //   a.click();
      // })
        let qrcode = new QrCodeWithLogo({
            content: url,
            width: 380,
            //   download: true,
            logo: {
                src: work.avatar
            }
        });
        qrcode.toCanvas().then(() => {
            qrcode.toImage().then(() => {
                setTimeout(() => {
                    qrcode.downloadImage(work.title);
                }, 100);
            });
        });
    },
    downloadWechatQrCode(work){
        this.genWxQrCode({'id': work.clientId}).then(entry=>{
            const url = 'https://img.hazer.top/qr/'+work.clientId+'.png';
            this.getUrlBase64(url).then(base64 => {
                let link = document.createElement('a')
                link.href = base64
                link.download = work.title
                link.click()
            })
        })
    },
      getUrlBase64(url) {
          return new Promise(resolve => {
              let canvas = document.createElement('canvas')
              let ctx = canvas.getContext('2d')
              let img = new Image()
              img.crossOrigin = 'Anonymous' //允许跨域
              img.src = url
              img.onload = function() {
                  canvas.height = 300
                  canvas.width = 300
                  ctx.drawImage(img, 0, 0, 300, 300)
                  let dataURL = canvas.toDataURL('image/png')
                  canvas = null
                  resolve(dataURL)
              }
          })
      },
  },
  render (h) {
    return (
      <a-card hoverable>
        <CardCover
          slot="cover"
          qrcodeUrl={this.qrcodeUrl}
          coverImageUrl={this.work.coverImage}
        />
        <template class="ant-card-actions" slot="actions">
          {
            // 编辑
            this.isTemplate
              ? <a-tooltip effect="dark" placement="bottom" title={this.$t('workCard.useNow')}>
                <a-icon
                  type="plus-square"
                  title={this.$t('workCard.useNow')}
                  onClick={() => this.$emit('useTemplate', this.work)}
                />
              </a-tooltip>
              : <a-tooltip effect="dark" placement="bottom" title={this.$t('workCard.edit')}>
                <router-link
                  to={{ name: 'editor', params: { workId: this.work.id } }}
                  target="_blank"
                >
                  <a-icon type="edit" title={this.$t('workCard.edit')}/>
                </router-link>
              </a-tooltip>
          }
          {/** 预览 */}
          <a-tooltip effect="dark" placement="bottom" title={this.$t('workCard.preview')}>
            <a-icon type="eye" title={this.$t('workCard.preview')} onClick={() => this.$emit('preview')} />
          </a-tooltip>
          {
            !this.isTemplate &&
            <a-tooltip effect="dark" placement="bottom" title={this.$t('workCard.delete')}>
              <a-icon type="delete" title={this.$t('workCard.delete')} onClick={() => this.$emit('delete') } />
            </a-tooltip>
          }
          {
            this.qrcodeUrl
              ? <a-icon type="close-circle" onClick={() => { this.qrcodeUrl = '' }} />
              : <a-icon type="qrcode" title={this.$t('workCard.qrCode')} onClick={() => this.genQRCodeUrl(this.work)} />
          }
          <a-icon type="download" title={this.$t('workCard.download')} onClick={() => this.downloadQRCodeUrl(this.work)} />
          <a-icon type="qrcode"  title={this.$t('workCard.wxQrCode')} onClick={() => this.downloadWechatQrCode(this.work)} />
        </template>
        <a-card-meta
        >
          <div slot="title" class="ant-card-meta-title" style="font-size: 14px;">
            {this.work.title}({this.work.id})
          </div>
          <div slot="description" style="font-size: 12px;">
            {/** 描述 时间 */}
            <div>{this.$t('workCard.description')}: {this.work.description}</div>
            <div>{this.$t('workCard.createTime')}: {this.timeFmt(this.work.createTime)}</div>
          </div>
        </a-card-meta>
      </a-card>
    )
  }
}

export const AddNewCard = {
  functional: true,
  render (h, { props, parent }) {
    return (
      <a-card hoverable>
        <div slot="cover" class="flex-center" style="height: 405px;background: #f7f5f557;" onClick={props.handleCreate}>
          <a-icon type="plus" />
        </div>
        <template class="ant-card-actions" slot="actions">
          {/** 创建新作品 */}
          {/** https://kazupon.github.io/vue-i18n/guide/component.html#translation-in-functional-component */}
          <span onClick={props.handleCreate}>{parent.$t('workCard.createNewWork')}</span>
        </template>
      </a-card>
    )
  }
}
