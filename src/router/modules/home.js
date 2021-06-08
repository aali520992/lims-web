import layoutHeaderAside from '@/layout/header-aside'

const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/demo/home',
  name: 'home',
  meta,
  redirect: { name: 'demo-home-index' },
  component: layoutHeaderAside,
  children: [
    // 首页
    { path: 'index', name: 'demo-home-index', component: _import('demo/home/index'), meta: { ...meta, title: '首页' } },
    // 个人信息
    { path: 'person/info', name: 'demo-home-personinfo', component: _import('demo/home/person/info.vue'), meta: { ...meta, title: '个人信息查看' } },
    //课表
    { path: 'course/list', name: 'demo-home-couselist', component: _import('demo/home/course/list.vue'), meta: { ...meta, title: '课程列表' } },
    { path: 'course/info', name: 'demo-home-couseinfo', component: _import('demo/home/course/info.vue'), meta: { ...meta, title: '下载课表' } },
    //实验项目列表
    { path: 'project/list', name: 'demo-home-projectlist', component: _import('demo/home/project/list.vue'), meta: { ...meta, title: '实验项目列表' } },
    { path: 'project/info', name: 'demo-home-projectinfo', component: _import('demo/home/project/info.vue'), meta: { ...meta, title: '下载实验内容' } },
    //实验报告
    { path: 'report/list', name: 'demo-home-reportlist', component: _import('demo/home/report/list.vue'), meta: { ...meta, title: '查看实验报告' } },
    { path: 'report/add', name: 'demo-home-reportadd', component: _import('demo/home/report/add.vue'), meta: { ...meta, title: '提交实验报告' } }
  ]
}
