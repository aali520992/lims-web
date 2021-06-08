export default {
  path: '/demo/course',
  title: '实验项目管理',
  iconSvg: 'course',
  children: [
    { path: '/demo/course/index', title: '首页', iconSvg: 'home2' },
    {
      path: '/demo/course/project',
      title: '实验项目',
      iconSvg: 'source',
      children: [
        { path: '/demo/course/project/list', title: '查看实验列表', icon: 'search' },
        { path: '/demo/course/project/add', title: '添加实验项目', icon: 'plus-circle' }
      ]
    },
    {
      path: '/demo/course/report',
      title: '实验报告',
      iconSvg: 'report',
      children: [
        { path: '/demo/course/report/list', title: '查看实验报告',icon: 'search' },
        { path: '/demo/course/report/add', title: '添加实验报告', icon: 'plus-circle'}
      ]
    },
    {
      path: '/demo/course/schedule',
      title: '实验课表',
      iconSvg: 'course3',
      children: [
        { path: '/demo/course/schedule/list', title: '课程列表',icon: 'search' },
        { path: '/demo/course/schedule/add', title: '添加课表', icon: 'plus-circle' },
      ]
    }
  ]
}