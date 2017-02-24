import {
  createAction,
} from 'redux-actions'
import {
  common,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// login
export const requestLogin = createAction('request login')
export const recevieLogin = createAction('receive login')
export const fetchLogin = createAjaxAction(common.login, requestLogin, recevieLogin)

// staff
export const requestStaff = createAction('request staff')
export const recevieStaff = createAction('receive staff')
export const fetchStaff = createAjaxAction(common.staff, requestStaff, recevieStaff)

// nav
export const requestNav = createAction('request nav')
export const recevieNav = createAction('receive nav')
export const fetchNav = createAjaxAction(common.nav, requestNav, recevieNav)

// gFormCache
export const setGformCache = createAction('set gform cache')

// 获取头部搜索中文
export const requestAllRetrieval = createAction('request all retrieval');
export const recevieAllRetrieval = createAction('receive all retrieval');
export const getAllRetrieval = createAjaxAction(
  common.getAllRetrieval,
  requestAllRetrieval,
  recevieAllRetrieval
);