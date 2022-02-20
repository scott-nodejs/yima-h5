module.exports = {
  title: '页面配置',
  base: [
    {
      type: 'text',
      label: '页面名称',
      attr: 'pageName',
      placeholder: '例：双十一专题主页',
      val: '',
      isNecessary: true
    }, {
      type: 'radio',
      label: '回到顶部',
      attr: 'gotop',
      val: true,
      options: [
        {
          name: '显示',
          val: true
        }, {
          name: '不显示',
          val: false
        }
      ],
      isNecessary: false
    },{
          type: 'radio',
          label: '背景音乐',
          attr: 'bgMusic',
          val: false,
          options: [
              {
                  name: '开启',
                  val: true
              }, {
                  name: '不开启',
                  val: false
              }
          ],
          isNecessary: false
      }
    // {
    //   type: 'text',
    //   label: '文件名称',
    //   attr: 'page-name',
    //   rules: {
    //     regex: '^[0-9a-zA-Z_]{1,}$',
    //     tips: '只能输入字母、数字或者下划线'
    //   },
    //   placeholder: '生成的html文件名称',
    //   val: '',
    //   isNecessary: true
    // }
  ],
  style: [
    {
      type: 'color-picker',
      label: '背景颜色',
      attr: 'backgroundColor',
      val: '#ffffff'
    }, {
      type: 'upload',
      label: '背景图片',
      attr: 'backgroundImage',
      val: ''
    }, {
      type: 'select',
      label: '背景效果',
      attr: 'backgroundRepeat',
      val: '',
      options: [
        {
          name: '无',
          val: 'no-repeat'
        }, {
          name: '水平重复',
          val: 'repeat-x'
        }, {
          name: '垂直重复',
          val: 'repeat-y'
        }, {
          name: '水平+垂直重复',
          val: 'repeat'
        }
      ]
    }
  ],
  weixin: [
    // {
    //   type: 'text',
    //   label: 'jssdk api',
    //   attr: 'page-share-api',
    //   placeholder: '微信分享接口地址',
    //   val: '',
    //   isNecessary: true
    // }, {
    //   type: 'text',
    //   label: '跳转地址',
    //   attr: 'page-share-url',
    //   placeholder: '跳转地址，不填则代表当前页',
    //   val: '',
    //   isNecessary: false
    // },
    {
      type: 'text',
      label: '分享标题',
      attr: 'pageShareTitle',
      placeholder: '微信分享的标题',
      val: '',
      isNecessary: true
    }, {
      type: 'textarea',
      label: '分享描述',
      attr: 'pageShareDesc',
      placeholder: '微信分享的描述文字',
      val: '',
      isNecessary: true
    }, {
      type: 'upload',
      label: '分享图标',
      attr: 'pageShareIcon',
      val: '',
      isNecessary: true
    },
    // {
    //   type: 'desc',
    //   label: '使用说明',
    //   val: `获取微信签名的接口请使用get(application/json)方式，跨域需接口支持，返回格式如下：<br/>
    //        {
    //           data: {
    //             appId: 'appId',
    //             timestamp: 15888888,
    //             nonceStr: 'nonceStr',
    //             signature: 'signature',
    //           },
    //           msg: '不为空则提示该消息'
    //        }`
    // }
  ],
  popups:[
    {
      type: 'popup-radio',
      label: '弹窗',
      attr: 'popup',
      val: false,
      options: [
        {
          name: '开启',
          val: true
        }, {
          name: '不开启',
          val: false
        }
      ],
      others:[
        {
          type: 'upload',
          label: '弹窗图片',
          attr: 'popupImage',
          val: '',
          isNecessary: true
        },{
          type: 'text',
          label: '弹窗标题',
          attr: 'popupDesc',
          placeholder: '弹窗标题',
          val: '',
          isNecessary: true
        },{
              type: 'text',
              label: '弹窗标题',
              attr: 'popupSubDesc',
              placeholder: '弹窗描述',
              val: '',
              isNecessary: true
          },{
          type: 'text',
          label: '按钮描述',
          attr: 'buttonDesc',
          placeholder: '按钮描述',
          val: '',
          isNecessary: true
        },{
          type: 'select',
          label: '选择活动',
          attr: 'activityId',
          placeholder: '选择活动',
          val: '',
          isNecessary: true
        },{
          type: 'datetime',
          attr: 'startTime',
          label: '开始时间',
          val: '2022-01-01 00:00:00',
          isNecessary: true
        },{
          type: 'datetime',
          attr: 'endTime',
          label: '结束时间',
          val: '2022-01-02 00:00:00',
          isNecessary: true
        }
      ],
      isNecessary: false
    }
  ]
}
