import {
  createAction,
} from 'redux-actions'
import {
  incidenceCondition,
} from 'api'
import {
  createAjaxAction,
} from 'utils'


// 获取发案情况列表
export const requestIncidenceConditionList = createAction('request incidence condition list');
export const recevieIncidenceConditionList = createAction('receive incidence condition list');
export const getIncidenceConditionList = createAjaxAction(
  incidenceCondition.getList,
  requestIncidenceConditionList,
  recevieIncidenceConditionList
);

// 获取单个发案情况详情
export const requestIncidenceConditionDetail = createAction('request incidence condition detail');
export const recevieIncidenceConditionDetail = createAction('receive incidence condition detail');
export const getIncidenceConditionDetail = createAjaxAction(
  incidenceCondition.getDetail,
  requestIncidenceConditionDetail,
  recevieIncidenceConditionDetail
);

// 新增发案情况
export const requestAddIncidenceCondition = createAction('request add incidence condition');
export const recevieAddIncidenceCondition = createAction('receive add incidence condition');
export const addIncidenceCondition = createAjaxAction(
  incidenceCondition.addRecord,
  requestAddIncidenceCondition,
  recevieAddIncidenceCondition
);

// 修改发案情况
export const requestModifyIncidenceCondition = createAction('request modify incidence condition');
export const recevieModifyIncidenceCondition = createAction('receive modify incidence condition');
export const modifyIncidenceCondition = createAjaxAction(
  incidenceCondition.saveRecord,
  requestModifyIncidenceCondition,
  recevieModifyIncidenceCondition
);

// 删除发案情况
export const requestDeleteIncidenceCondition = createAction('request delete incidence condition');
export const recevieDeleteIncidenceCondition = createAction('receive delete incidence condition');
export const deleteIncidenceCondition = createAjaxAction(
  incidenceCondition.deleteRecord,
  requestDeleteIncidenceCondition,
  recevieDeleteIncidenceCondition
);