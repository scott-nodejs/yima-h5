/*
 * @Author: ly525
 * @Date: 2020-01-12 20:42:09
 * @LastEditors: ly525
 * @LastEditTime: 2020-10-11 00:01:40
 * @FilePath: /luban-h5/front-end/h5/src/components/core/support/video-gallery/tabs/personal.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
import axios from 'axios'
import VideoItem from '@/common/video-gallery/components/video-item.js'
import ImageItem from '@/common/video-gallery/components/image-item.js'
import Uploader from '@/common/video-gallery/components//uploader.js'

export default {
  data: () => ({
    items: [],
    cachedItems: [],
    loading: false
  }),
  props:{
     mType: {
       type: String
     }
  },
  methods: {
    uploadSuccess ({ file, fileList }) {
      const response = file.response
      this.items = [{ name: response.data, url: 'http://img.hazer.top/'+response.data }, ...this.cachedItems]
    },
    beforeUpload (file) {
      this.items.unshift({
        loading: true
      })
      return file
    }
  },
  render (h) {
    return (
      <div>
        <a-spin tip="Loading..." spinning={this.loading}>
          <a-card>
            <Uploader
              slot="extra"
              beforeUpload={file => this.beforeUpload(file)}
              uploadSuccess={info => this.uploadSuccess(info)}
            />
            <a-list
              style="height: 400px; overflow: auto;"
              grid={{ gutter: 12, column: 3 }}
              dataSource={this.items}
              renderItem={(item, index) => (
                <a-list-item onClick={() => {
                  this.$emit('changeItem', item)
                }}>
                  <ImageItem item={item} />
                </a-list-item>
              )}
            >
            </a-list>
          </a-card>
        </a-spin>
      </div>
    )
  },
  mounted () {
    // demo code
    axios
      .get('/upload/files', {
        params: {
          'pageSize': 10,
          'page': 0,
          'type': this.mType,
          mime: 'video/mp4'
        }
      })
      .then(res => {
        this.items = res.data.data.list
        this.cachedItems = []
        // this.cachedItems = res.data.hits.slice(0)
      })
  }
}
