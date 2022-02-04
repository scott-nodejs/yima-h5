module.exports = [
  {
    code: 'common',
    title: '通用组件',
    collapse: false,
    isDrag: true,
    items: [
      {
        key: 'base-text',
        text: '文本',
        icon: 'fa-file-text-o'
      }, {
            key: 'rich-text',
            text: '富文本',
            icon: 'fa-file-text-o'
        },{
        key: 'base-image',
        text: '图片',
        icon: 'fa-file-image-o'
      }, {
        key: 'base-form',
        text: '表单',
        icon: 'fa-list'
      },
      // {
      //   key: 'floor-menu',
      //   text: '楼层导航',
      //   icon: 'fa-list-ol'
      // },
      // {
      //   key: 'timeout',
      //   text: '倒计时',
      //   icon: 'fa-hourglass-start'
      // },
        {
            key: 'ad-jump',
            text: '广告位跳转',
            icon: 'fa-hourglass-start'
        },
      {
        key: 'bottom-menu',
        text: '底部导航',
        icon: 'fa-adjust'
      },
      {
        key: 'grid-menu',
        text: '金刚位',
        icon: 'fa-th'
      },
      {
        key: 'base-video',
        text: '视频',
        icon: 'fa-file-video-o'
      },{
        key: 'header1',
        text: 'header1',
        icon: 'fa-vcard'
      },{
            key: 'header2',
            text: 'header2',
            icon: 'fa-vcard'
        },{
            key: 'coupon',
            text: '优惠券',
            icon: 'fa-vcard'
        },{
            key: 'mytebs',
            text: 'Teb导航',
            icon: 'fa-vcard'
        }
    ]
  },
  // {
  //   title: '样式模块',
  //   collapse: true,
  //   items: [
  //     {
  //       key: 'page-title',
  //       text: '标题模块',
  //       icon: 'fa-header'
  //     }, {
  //       key: 'page-paragraph',
  //       text: '段落模块',
  //       icon: 'fa-paragraph'
  //     }, {
  //       key: 'page-intro',
  //       text: '引言模块',
  //       icon: 'fa-quote-left'
  //     }, {
  //       key: 'page-faq',
  //       text: 'FAQ模块',
  //       icon: 'fa-quora'
  //     }, {
  //       key: 'page-guide',
  //       text: '步骤模块',
  //       icon: 'fa-step-forward'
  //     }, {
  //       key: 'page-footer',
  //       text: '页脚模块',
  //       icon: 'fa-copyright'
  //     }
  //   ]
  // },
  {
    code: 'banner',
    title: '轮播组件',
    collapse: true,
    isDrag: true,
    items: [
      {
        key: 'swiper-banner',
        text: '轮播图',
        icon: 'fa-caret-square-o-right'
      },
      {
        key: 'tscroll',
        text: '横向滚动',
        icon: 'fa-exchange'
      }
    ]
  }, {
    code: 'pictrueList',
    title: '图文列表',
    collapse: true,
    isDrag: true,
    items: [
      {
        key: 'horizontal-list',
        text: '横向列表',
        icon: 'fa-th-list'
      }, {
        key: 'vertical-list',
        text: '纵向列表',
        icon: 'fa-columns'
      }
    ]
  }, {
    code: 'flash',
    title: '动画效果',
    collapse: true,
    isDrag: true,
    items: [
      {
        key: 'news-marquee',
        text: '滚动新闻',
        icon: 'fa-newspaper-o'
      }
    ]
  },{
    code: 'page',
    title: '创建页(不可以拖动)',
    collapse: true,
    isDrag: false,
    items: [
      {
        key: '1',
        text: '页',
        type: 'txt',
        icon: 'fa-file-text-o'
      },
      {
        key: 'new-page',
        text: '新增页面',
        type: 'btn',
        icon: 'fa-file-text-o'
      }
    ]
  }
]
