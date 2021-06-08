export default {
  path: '/demo/lab',
  title: '实验室管理',
  iconSvg: 'lab',
  children: [
    { path: '/demo/lab/index', title: '首页', iconSvg: 'home3' },
    {
      path: '/demo/lab/classroom',
      title: '实验室信息',
      iconSvg: 'lab1',
      children: [
        { path: '/demo/lab/classroom/list', title: '实验室列表', iconSvg: 'search' },
        { path: '/demo/lab/classroom/add', title: '添加实验室', iconSvg: 'add' }
      ]
    },
    {
      path: '/demo/lab/equipment',
      title: '实验设备',
      iconSvg: 'equipment',
      children: [
        { path: '/demo/lab/equipment/list', title: '设备列表', iconSvg: 'search' },
        { path: '/demo/lab/equipment/add', title: '添加设备信息', iconSvg: 'add' },
      ]
    },
    {
      path: '/demo/lab/consumable',
      title: '耗材信息',
      iconSvg: 'material-infor',
      children: [
        { path: '/demo/lab/consumable/list', title: '耗材列表', iconSvg: 'search' },
        { path: '/demo/lab/consumable/add', title: '登记耗材信息', iconSvg: 'add' },
      ]
    },
    {
      path: '/demo/lab/output',
      title: '出入库记录',
      iconSvg: 'out-into',
      children: [
        {
          path: '/demo/lab/output/putrecord',
          title: '入库记录',
          iconSvg: 'out-into',
          children: [
            { path: '/demo/lab/output/putrecord/list', title: '查询入库信息', iconSvg: 'search' },
            { path: '/demo/lab/output/putrecord/add', title: '登记入库', iconSvg: 'add' }
          ]
        },
        {
          path: '/demo/lab/output/outrecord',
          title: '出库记录',
          iconSvg: 'out-into',
          children: [
            { path: '/demo/lab/output/outrecord/list', title: '查询出库信息', iconSvg: 'search' },
            { path: '/demo/lab/output/outrecord/add', title: '登记出库', iconSvg: 'add' }
          ]
        }
      ]
    },
    {
      path: '/demo/lab/maintain',
      title: '维修信息',
      iconSvg: 'maintain',
      children: [
        { path: '/demo/lab/maintain/list', title: '维修列表', iconSvg: 'search' },
        { path: '/demo/lab/maintain/add', title: '添加维修信息', iconSvg: 'add' },

      ]
    }
  ]
}
