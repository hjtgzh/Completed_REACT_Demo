import {
  createAction,
} from 'redux-actions'
import {
  flow,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取境外人口列表的action
export const requestFlowList = createAction('request flow list');
export const recevieFlowList = createAction('receive flow list');
export const fetchFlowList = createAjaxAction(
  flow.flowList,
  requestFlowList,
  recevieFlowList
);
// 常住境外列表更新以及重置的action
export const updateFlowListQuery = createAction('update flow search query', payload => payload);
export const resetFlowListQuery = createAction('reset flow search query');

