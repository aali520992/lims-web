import layoutHeaderAside from '@/layout/header-aside'

const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/demo/course',
  name: 'course',
  meta,
  redirect: { name: 'demo-course-index' },
  component: layoutHeaderAside,
  children: [
    // 首页
    { path: 'index', name: 'demo-course-index', component: _import('demo/course/index'), meta: { ...meta, title: '实验项目首页' } },

    // 实验项目列表
    { path: 'project/list', name: 'demo-course-projectlist', component: _import('demo/course/project/list.vue'), meta: { ...meta, title: '实验室列表' } },
    { path: 'project/add', name: 'demo-course-projectadd', component: _import('demo/course/project/add.vue'), meta: { ...meta, title: '添加实验室' } },
    // 实验报告列表
    { path: 'report/list', name: 'demo-course-reportlist', component: _import('demo/course/report/list.vue'), meta: { ...meta, title: '设备列表' } },
    { path: 'report/add', name: 'demo-course-reportadd', component: _import('demo/course/report/add.vue'), meta: { ...meta, title: '添加设备' } },
    // 实验课表
    { path: 'schedule/list', name: 'demo-course-schedulelist', component: _import('demo/course/schedule/list.vue'), meta: { ...meta, title: '耗材列表' } },
    { path: 'schedule/add', name: 'demo-course-scheduleadd', component: _import('demo/course/schedule/add.vue'), meta: { ...meta, title: '添加耗材' } },
  ]
}
