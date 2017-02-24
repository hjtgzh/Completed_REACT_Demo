import {
  createAction,
} from 'redux-actions'
import {
  abroad,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取境外人口列表的action
export const requestAbroadList = createAction('request abroad list');
export const recevieAbroadList = createAction('receive abroad list');
export const fetchAbroadList = createAjaxAction(
  abroad.abroadList,
  requestAbroadList,
  recevieAbroadList
);
// 常住境外列表更新以及重置的action
export const updateAbroadListQuery = createAction('update abroadList search query', payload => payload);
export const resetAbroadListQuery = createAction('reset abroadList search query');

// 获取境外人口详情的action
export const requestAbroadDetail = createAction('request abroad detail')
export const recevieAbroadDetail = createAction('receive abroad detail')
export const fetchAbroadDetail = createAjaxAction(abroad.abroadDetail, requestAbroadDetail, recevieAbroadDetail)