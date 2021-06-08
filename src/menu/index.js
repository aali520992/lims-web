import { uniqueId } from 'lodash'
// 首页管理
import home from './modules/home'
// 实验管理
import lab from './modules/lab'
// 课程管理
import course from './modules/course'
// 预约管理
import college from './modules/college'
// 人员管理
import people from './modules/people'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

// 菜单 侧边栏
export const menuAside = supplementPath([
  home,
  lab,
  course,  
  college,
  people
])

// 菜单 顶栏
export const menuHeader = supplementPath([
  home,
  lab,
  course,  
  college,
  people
])
