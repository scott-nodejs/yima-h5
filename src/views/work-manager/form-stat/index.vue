<!--
 * @Author: ly525
 * @Date: 2019-11-24 18:51:58
 * @LastEditors  : ly525
 * @LastEditTime : 2019-12-21 19:19:38
 * @FilePath: /luban-h5/front-end/h5/src/views/work-manager/form-stat/index.vue
 * @Github: https://github.com/ly525/luban-h5
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 * @Description:
    #!zh: [基础数据页面](/work-manager/form-stat) 对应的页面
    #!en: [basic data page](/work-manager/form-stat)
 -->

<script>
import { mapState, mapActions } from 'vuex'
import { columns } from './column'
import CreateClient from 'core/editor/modals/client.vue'

export default {
  components: {
  },
  data: () => ({
      visible: false,
      confirmLoading: false,
  }),
  computed: {
    ...mapState('client', ['clientList']),
    computedWorks () {
      return this.clientList.map(w => ({
        id: w.id,
        company: w.name,
        phone: w.phone || '',
        nickname: w.nickname || '',
        address: w.address || ''
      }))
    }
  },
  methods: {
    ...mapActions('client', [
      'fetchClient'
    ]),
      handleOk(e) {
        this.confirmLoading = true;
          setTimeout(() => {
              this.visible = false;
              this.confirmLoading = false;
          }, 2000);
      },
      handleCancel(e) {
          console.log('Clicked cancel button');
          this.visible = false;
      },
  },
  render (h) {
    const that = this
    return (
      <div class="works-wrapper" style="background-color:white;padding: 12px;margin-top: 24px;">
          <a-button onClick={() => {
                this.visible = true
          }}>新建客户</a-button>
          <CreateClient
              visible={this.visible}
              handleClose={() => { this.visible = false }}
          />
        <a-table size="middle" columns={columns} dataSource={this.computedWorks} row-key="id" scopedSlots={{
          id: (props) => {
            return (
              <router-link to={{ name: 'editor', params: { workId: props.id } }} target="_blank" title={this.$t('workCard.view')}>
                {props.id}
                <a-icon type="link" title={this.$t('workCard.view')} class="ml-3" />
              </router-link>
            )
          },
          action: (props) => {
            // 查看数据
            return [<router-link to={{ name: 'stat-detail', params: { id: props.id } }} >{that.$t('basicData.viewData')}</router-link>]
          }
        }}>
        </a-table>
      </div>
    )
  },
  created () {
    this.fetchClient()
  }
}
</script>
