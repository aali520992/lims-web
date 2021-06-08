export default {
  path: '/demo/people',
  title: '人员管理',
  iconSvg: 'people',
  children: [
    { path: '/demo/people/index', title: '首页', iconSvg: 'home2' },
    {
      path: '/demo/people/admin',
      title: '管理员信息',
      iconSvg: 'people2',
      children: [
        { path: '/demo/people/admin/list', title: '查询列表', iconSvg: 'search' },
        { path: '/demo/people/admin/add', title: '添加管理员', iconSvg: 'add' }
      ]
    },
    {
      path: '/demo/people/teacher',
      title: '教师信息',
      iconSvg: 'teacher1',
      children: [
        { path: '/demo/people/teacher/list', title: '查询列表', iconSvg: 'search' },
        { path: '/demo/people/teacher/add', title: '添加教师', iconSvg: 'add' }
      ]
    },
    {
      path: '/demo/people/student',
      title: '学生信息',
      iconSvg: 'student',
      children: [
        { path: '/demo/people/student/list', title: '查询列表', iconSvg: 'search' },
        { path: '/demo/people/student/add', title: '添加学生', iconSvg: 'add' }
      ]
    }
  ]
}