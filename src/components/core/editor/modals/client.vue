<script>
import { mapActions } from 'vuex'
import ClientCreate from './create-client'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    handleClose: {
      type: Function,
      default: () => {}
    },
    client: {
      type: Object,
      default: () => ({})
    },
    editType:{
        default: 0
    }
  },
  computed: {
    // ...mapState('editor', {
    //   work: state => state.work
    // }),
    previewUrl () {
      return `${window.location.origin}/works/preview/${this.work.id}?view_mode=preview`
    }
  },
  data: () => ({
    confirmLoading: false
  }),
  methods: {
    ...mapActions('client', [
      'saveClient',
        'updateClient'
    ]),
    handleOk (e) {
      this.updateClient(this.client)
      this.confirmLoading = true
      this.saveClient().then(res => {
        this.handleClose()
        this.confirmLoading = false
      })
    },
      autoSave (info) {
          this.updateClient(info)
          this.debounceSave()
      },
    handleCancel (e) {
        console.log('Clicked cancel button')
        this.handleClose()
    }
  },
  render (h) {
    return (
      <a-modal
        title="创建客户"
        visible={this.visible}
        confirmLoading={this.confirmLoading}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width="35%"
        okText="保存"
      >
          <a-form class="preview-wrapper" label-col={{ span: 5 }} wrapper-col={{ span: 12 }} onSubmit={this.handleSubmit}>
              <a-form-item label="门店名称">
                  <a-input
                      onChange={e => this.autoSave({ company: e.target.value })}
                      v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                  />
              </a-form-item>
              <a-form-item label="客户电话">
                  <a-input
                      onChange={e => this.autoSave({ phone: e.target.value })}
                      v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                  />
              </a-form-item>
              <a-form-item label="联系人">
                  <a-input
                      onChange={e => this.autoSave({ nickname: e.target.value })}
                      v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                  />
              </a-form-item>
              <a-form-item label="公司地址">
                  <a-input
                      onChange={e => this.autoSave({ address: e.target.value })}
                      v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                  />
              </a-form-item>
              <a-form-item label="微信">
                  <a-input
                      onChange={e => this.autoSave({ wx: e.target.value })}
                      v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                  />
              </a-form-item>
          </a-form>
      </a-modal>
    )
  }
}
</script>

<style lang="scss">
.preview-wrapper {
  position: relative;
  min-height: 320px;
}

</style>
