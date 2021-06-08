export default {
  path: '/demo/home',
  title: '首页',
  iconSvg: 'home2',
  children: [
    { path: '/demo/home/index', title: '首页', iconSvg: 'home' },
    {
      path: '/demo/home/person',
      title: '个人信息',
      iconSvg: 'user',
      children: [
        { path: '/demo/home/person/info', title: '查看个人信息', icon: 'plus-circle' }
      ]
    },
    {
      path: '/demo/home/course',
      title: '课表查看',
      iconSvg: 'course1',
      children: [
        { path: '/demo/home/course/list', title: '查询班级课表', icon: 'search' },
        { path: '/demo/home/course/info', title: '课表详情', icon: 'download' }
      ]
    },
    {
      path: '/demo/home/project',
      title: '实验项目',
      iconSvg: 'item',
      children: [
        { path: '/demo/home/project/list', title: '实验项目列表', icon: 'search' },
        { path: '/demo/home/project/info', title: '实验内容', icon: 'download' }
      ]
    },
    {
      path: '/demo/home/report',
      title: '实验报告',
      iconSvg: 'report',
      children: [
        { path: '/demo/home/report/list', title: '查看实验成绩', icon: 'search' },
        { path: '/demo/home/report/add', title: '提交实验报告', icon: 'puzzle-piece' }
      ]
    }
  ]
}
