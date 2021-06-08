import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/demo/lab',
  name: 'lab',
  meta,
  redirect: { name: 'demo-lab-index' },
  component: layoutHeaderAside,
  children: [
    { path: 'index', name: 'demo-lab-index', component: _import('demo/lab/index'), meta: { ...meta, title: '实验室首页' } },

    // 实验室列表
    { path: 'classroom/list', name: 'demo-lab-classroomlist', component: _import('demo/lab/classroom/list.vue'), meta: { ...meta, title: '实验室列表' } },
    { path: 'classroom/add', name: 'demo-lab-classroomadd', component: _import('demo/lab/classroom/add.vue'), meta: { ...meta, title: '添加实验室' } },
    // 设备列表
    { path: 'equipment/list', name: 'demo-lab-equipmentlist', component: _import('demo/lab/equipment/list.vue'), meta: { ...meta, title: '设备列表' } },
    { path: 'equipment/add', name: 'demo-lab-equipmentadd', component: _import('demo/lab/equipment/add.vue'), meta: { ...meta, title: '添加设备' } },
    // 耗材列表
    { path: 'consumable/list', name: 'demo-lab-consumablelist', component: _import('demo/lab/consumable/list.vue'), meta: { ...meta, title: '耗材列表' } },
    { path: 'consumable/add', name: 'demo-lab-consumableadd', component: _import('demo/lab/consumable/add.vue'), meta: { ...meta, title: '添加耗材' } },
    // 入库记录列表
    { path: 'output/putrecord/list', name: 'demo-lab-output-putrecordlist', component: _import('demo/lab/output/putrecord/list.vue'), meta: { ...meta, title: '入库记录列表' } },
    { path: 'output/putrecord/add', name: 'demo-lab-output-putrecordadd', component: _import('demo/lab/output/putrecord/add.vue'), meta: { ...meta, title: '添加入库记录' } },
    // 出库记录列表
    { path: 'output/outrecord/list', name: 'demo-lab-output-outrecordlist', component: _import('demo/lab/output/outrecord/list.vue'), meta: { ...meta, title: '出库记录列表' } },
    { path: 'output/outrecord/add', name: 'demo-lab-output-outrecordadd', component: _import('demo/lab/output/outrecord/add.vue'), meta: { ...meta, title: '添加出库记录' } },
    // 维修列表
    { path: 'maintain/list', name: 'demo-lab-maintainlist', component: _import('demo/lab/maintain/list.vue'), meta: { ...meta, title: '维修列表' } },
    { path: 'maintain/add', name: 'demo-lab-maintainadd', component: _import('demo/lab/maintain/add.vue'), meta: { ...meta, title: '添加维修信息' } },
  ]
}
