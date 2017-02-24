import {
  createAction,
} from 'redux-actions'
import {
  groupBlastingUnit,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取爆破单位的信息
export const requestBlastingUnit = createAction('request blasting unit')
export const recevieBlastingUnit = createAction('receive blasting unit')
export const fetchBlastingUnit = createAjaxAction(groupBlastingUnit.getBlastingUnit, requestBlastingUnit, recevieBlastingUnit)

// 保存爆破单位的信息
export const requestSaveBlastingUnit = createAction('request save blasting unit')
export const recevieSaveBlastingUnit = createAction('receive save blasting unit')
export const saveBlastingUnit = createAjaxAction(groupBlastingUnit.saveBlastingUnit,requestSaveBlastingUnit,recevieSaveBlastingUnit)


// 获取爆破仓库的信息
export const requestBlastingStore = createAction('request blasting store')
export const recevieBlastingStore = createAction('receive blasting store')
export const fetchBlastingStore = createAjaxAction(groupBlastingUnit.getBlastingStore, requestBlastingStore, recevieBlastingStore)

// 保存爆破仓库的信息
export const requestSaveBlastingStore = createAction('request save blasting store')
export const recevieSaveBlastingStore = createAction('receive save blasting store')
export const saveBlastingStore = createAjaxAction(groupBlastingUnit.saveBlastingStore,requestSaveBlastingStore,recevieSaveBlastingStore)



// 获取爆破项目列表
export const requestBlastingProject = createAction('request blasting project')
export const recevieBlastingProject = createAction('receive blasting project')
export const getBlastingProjectList = createAjaxAction(groupBlastingUnit.getBlastingProjectList,requestBlastingProject,recevieBlastingProject)

// 获取爆破项目详情
export const requestBlastingProjectDetail = createAction('request blasting project detail')
export const recevieBlastingProjectDetail = createAction('receive blasting project detail')
export const getBlastingProjectDetail = createAjaxAction(groupBlastingUnit.getBlastingProjectDetail,requestBlastingProjectDetail,recevieBlastingProjectDetail)

// 新增爆破项目
export const requestAddBlastingProject = createAction('request add blasting project')
export const recevieAddBlastingProject = createAction('receive add blasting project')
export const addBlastingProject = createAjaxAction(groupBlastingUnit.addBlastingProject,requestAddBlastingProject,recevieAddBlastingProject)

// 保存爆破项目
export const requestSaveBlastingProject = createAction('request save blasting project')
export const recevieSaveBlastingProject = createAction('receive save blasting project')
export const saveBlastingProject = createAjaxAction(groupBlastingUnit.saveBlastingProject,requestSaveBlastingProject,recevieSaveBlastingProject)

// 删除爆破项目
export const requestDeleteBlastingProject = createAction('request delete blasting project')
export const recevieDeleteBlastingProject = createAction('receive delete blasting project')
export const deleteBlastingProject = createAjaxAction(groupBlastingUnit.deleteBlastingProject,requestDeleteBlastingProject,recevieDeleteBlastingProject)
