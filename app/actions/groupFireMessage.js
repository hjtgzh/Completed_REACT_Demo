/**
 * Created by 余金彪 on 2017/1/10.消防信息
 */
import {
  createAction,
} from 'redux-actions'
import {
  groupFireMessage,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 消防信息新增/修改
export const requestSaveXfx = createAction('request saveXfx');
export const recevieSaveXfx = createAction('receive saveXfx');
export const fetchSaveXfx = createAjaxAction(
  groupFireMessage.insertSaveXfx,
  requestSaveXfx,
  recevieSaveXfx
);

//单位消防信息查询
export const requestQueryXfxx = createAction('request queryXfxx');
export const recevieQueryXfxx = createAction('receive queryXfxx');
export const fetchQueryXfxx = createAjaxAction(
  groupFireMessage.queryXfxx,
  requestQueryXfxx,
  recevieQueryXfxx
);

//单位消防器材查询
export const requestQueryXfxxXfqc = createAction('request queryXfxxXfqc');
export const recevieQueryXfxxXfqc = createAction('receive queryXfxxXfqc');
export const fetchQueryXfxxXfqc = createAjaxAction(
  groupFireMessage.queryXfxxXfqc,
  requestQueryXfxxXfqc,
  recevieQueryXfxxXfqc
);

///单位消防器材新增或修改
export const requestSaveXfxxXfqc = createAction('request saveXfxxXfqc');
export const recevieSaveXfxxXfqc = createAction('receive saveXfxxXfqc');
export const fetchSaveXfxxXfqc = createAjaxAction(
  groupFireMessage.saveXfxxXfqc,
  requestSaveXfxxXfqc,
  recevieSaveXfxxXfqc
);

//单位消防器材信息删除
export const requestDeleteXfxxXfqc = createAction('request deleteXfxxXfqc');
export const recevieDeleteXfxxXfqc = createAction('receive deleteXfxxXfqc');
export const fetchDeleteXfxxXfqc = createAjaxAction(
  groupFireMessage.deleteXfxxXfqc,
  requestDeleteXfxxXfqc,
  recevieDeleteXfxxXfqc
);

//单位消防器材信息详情查询
export const requestQueryXfqcDetail = createAction('request queryXfqcDetail');
export const recevieQueryXfqcDetail = createAction('receive queryXfqcDetail');
export const fetchQueryXfqcDetail = createAjaxAction(
  groupFireMessage.queryXfqcDetail,
  requestQueryXfqcDetail,
  recevieQueryXfqcDetail
);