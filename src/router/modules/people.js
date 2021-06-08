import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/demo/people',
  name: 'people',
  meta,
  redirect: { name: 'demo-people-index' },
  component: layoutHeaderAside,
  children: [
    // 首页
    { path: 'index', name: 'demo-people-index', component: _import('demo/people/index'), meta: { ...meta, title: '人员管理首页' } },
    // 管理员
    { path: 'admin/list', name: 'demo-people-adminlist', component: _import('demo/people/admin/list.vue'), meta: { ...meta, title: '管理员列表' } },
    { path: 'admin/add', name: 'demo-people-adminadd', component: _import('demo/people/admin/add.vue'), meta: { ...meta, title: '添加管理员' } },
    // 教师
    { path: 'teacher/list', name: 'demo-people-teacherlist', component: _import('demo/people/teacher/list.vue'), meta: { ...meta, title: '教师列表' } },
    { path: 'teacher/add', name: 'demo-people-teacheradd', component: _import('demo/people/teacher/add.vue'), meta: { ...meta, title: '添加教师' } },
    // 学生
    { path: 'student/list', name: 'demo-people-studentlist', component: _import('demo/people/student/list.vue'), meta: { ...meta, title: '学生列表' } },
    { path: 'student/add', name: 'demo-people-studentadd', component: _import('demo/people/student/add.vue'), meta: { ...meta, title: '添加学生' } },
  ]
}
