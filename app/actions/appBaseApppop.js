import {
  createAction,
} from 'redux-actions'
import {
  appBaseApppop,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取单位统计列表
export const requestUnitList = createAction('request apppopUnit list');
export const recevieUnitList = createAction('receive apppopUnit list');
export const fetchUnitList = createAjaxAction(
  appBaseApppop.unitList,
  requestUnitList,
  recevieUnitList
);

// 获取人口统计列表
export const requestPersonalList = createAction('request apppopPersonal list');
export const receviePersonalList = createAction('receive apppopPersonal list');
export const fetchPersonalList = createAjaxAction(
  appBaseApppop.personalList,
  requestPersonalList,
  receviePersonalList
);

//详情
export const requestPersonalHistory = createAction('request apppopPersonal detail');
export const receviePersonalHistory = createAction('receive apppopPersonal detail');
export const fetchPersonalDetail = createAjaxAction(
  appBaseApppop.personalDetail,
  requestPersonalHistory,
  receviePersonalHistory
);
