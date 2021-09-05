export const columns = [
  {
    title: 'Id',
    // dataIndex: 'id',
    key: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '客户',
    dataIndex: 'company',
    key: 'company'
  },
    {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title: '联系人',
        dataIndex: 'nickname',
        key: 'nickname'
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address'
    },
  // {
  //   title: 'PV',
  //   dataIndex: 'pv',
  //   key: 'pv'
  // },
  // {
  //   title: 'Uv',
  //   dataIndex: 'uv',
  //   key: 'uv'
  // },
  // {
  //   // i18n for title
  //   title: 'Forms',
  //   key: 'formCount',
  //   dataIndex: 'formCount',
  //   align: 'center'
  // },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export const data = [
  {
    key: '1',
    title: 'John Brown',
    pv: 32,
    uv: 32,
    formCount: 2
  },
  {
    key: '2',
    title: 'John Brown2',
    pv: 32,
    uv: 32,
    formCount: 2
  },
  {
    key: '3',
    title: 'John Brown3',
    pv: 32,
    uv: 32,
    formCount: 2
  }
]
