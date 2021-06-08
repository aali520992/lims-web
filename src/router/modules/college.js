import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/demo/college',
  name: 'college',
  meta,
  redirect: { name: 'demo-college-index' },
  component: layoutHeaderAside,
  children: [
    // 首页
    { path: 'index', name: 'demo-college-index', component: _import('demo/college/index'), meta: { ...meta, title: '预约首页' } },
    // 学院信息
    { path: 'college/list', name: 'demo-college-collegelist', component: _import('demo/college/college/list.vue'), meta: { ...meta, title: '学院列表' } },
    { path: 'college/add', name: 'demo-college-collegeadd', component: _import('demo/college/college/add.vue'), meta: { ...meta, title: '添加学院' } },
    // 专业信息
    { path: 'profession/list', name: 'demo-college-professionlist', component: _import('demo/college/profession/list.vue'), meta: { ...meta, title: '学院列表' } },
    { path: 'profession/add', name: 'demo-college-professionadd', component: _import('demo/college/profession/add.vue'), meta: { ...meta, title: '添加学院' } },
    // 班级信息
    { path: 'room/list', name: 'demo-college-roomlist', component: _import('demo/college/room/list.vue'), meta: { ...meta, title: '班级列表' } },
    { path: 'room/add', name: 'demo-college-roomadd', component: _import('demo/college/room/add.vue'), meta: { ...meta, title: '添加学院' } },
  ]
}
