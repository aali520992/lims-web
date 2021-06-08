export default {
  path: '/demo/college',
  title: '学院管理',
  iconSvg: 'college1',
  children: [
    { path: '/demo/college/index', title: '首页', icon: 'home' },
    {
      path: '/demo/college/college',
      title: '学院信息',
      iconSvg: 'college',
      children: [
        { path: '/demo/college/college/list', title: '查询列表', iconSvg: 'search' },
        { path: '/demo/college/college/add', title: '添加学院', iconSvg: 'add' }
      ]
    },
    {
      path: '/demo/college/profession',
      title: '专业信息',
      iconSvg: 'profession',
      children: [
        { path: '/demo/college/profession/list', title: '查询列表', iconSvg: 'search' },
        { path: '/demo/college/profession/add', title: '添加专业', iconSvg: 'add' }
      ]
    },
    {
      path: '/demo/college/room',
      title: '班级信息',
      iconSvg: 'room',
      children: [
        { path: '/demo/college/room/list', title: '查询列表', iconSvg: 'search' },
        { path: '/demo/college/room/add', title: '添加班级', iconSvg: 'add' }
      ]
    }
  ]
}
