import {
  createAction,
} from 'redux-actions'
import {
  local,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取境外人口列表的action
export const requestLocalList = createAction('request local list');
export const recevieLocalList = createAction('receive local list');
export const fetchLocalList = createAjaxAction(
  local.localList,
  requestLocalList,
  recevieLocalList
);
// 常住境外列表更新以及重置的action
export const updateLocalListQuery = createAction('update local search query', payload => payload);
export const resetLocalListQuery = createAction('reset local search query');

