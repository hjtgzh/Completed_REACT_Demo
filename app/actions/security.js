import {
  createAction,
} from 'redux-actions'
import {
  security
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 治安情况列表的action-ytt
export const requestSecurityList = createAction('request security list');
export const recevieSecurityList = createAction('receive security list');
export const fetchSecurityList = createAjaxAction(
  security.securityList,
  requestSecurityList,
  recevieSecurityList
);

// 治安详情action-ytt
export const requestSecurityDetail = createAction('request security detail');
export const recevieSecurityDetail = createAction('receive security detail');
export const fetchSecurityDetail = createAjaxAction(
  security.securityDetail,
  requestSecurityDetail,
  recevieSecurityDetail
);

// 新增治安回访日志
export const requestSecurityAdd = createAction('request security add');
export const recevieSecurityAdd = createAction('receive security add');
export const fetchSecurityAdd = createAjaxAction(
  security.securityAdd,
  requestSecurityAdd,
  recevieSecurityAdd
);

// 案件日志
export const requestSecurityLogList = createAction('request securityLog list');
export const recevieSecurityLogList = createAction('receive securityLog list');
export const fetchSecurityLogList = createAjaxAction(
  security.fetchSecurityLogList,
  requestSecurityLogList,
  recevieSecurityLogList
);



