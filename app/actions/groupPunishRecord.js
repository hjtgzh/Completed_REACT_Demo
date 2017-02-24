/**
 * Created by 余金彪 on 2017/1/5.处罚记录
 */
import {
  createAction,
} from 'redux-actions'
import {
  groupPunishRecord,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取检查记录详情
export const requestPunishRecord = createAction('request punishRecord');
export const receviePunishRecord = createAction('receive punishRecord');
export const fetchCheckRecordInfo = createAjaxAction(
  groupPunishRecord.getPunishRecordInfo,
  requestPunishRecord,
  receviePunishRecord
);

// 新增检查记录
export const requestCheckRecordInsert = createAction('request insertPunishRecord');
export const recevieCheckRecordInsert = createAction('receive insertPunishRecord');
export const fetchInsertCheckRecordInfo = createAjaxAction(
  groupPunishRecord.insertPunishRecordInfo,
  requestCheckRecordInsert,
  recevieCheckRecordInsert
);

//单位处罚记录查询详情
export const requestQueryCfjlDetail = createAction('request queryCfjlDetail');
export const recevieQueryCfjlDetail = createAction('receive queryCfjlDetail');
export const fetchQueryCfjlDetail = createAjaxAction(
  groupPunishRecord.queryCfjlDetail,
  requestQueryCfjlDetail,
  recevieQueryCfjlDetail
);

//单位处罚记录删除
export const requestDeleteCfjlDetail = createAction('request deleteCfjlDetail');
export const recevieDeleteCfjlDetail = createAction('receive deleteCfjlDetail');
export const fetchDeleteCfjlDetail = createAjaxAction(
  groupPunishRecord.deleteCfjlDetail,
  requestDeleteCfjlDetail,
  recevieDeleteCfjlDetail
);

//单位处罚记录修改
export const requestUpdateCfjlDetail = createAction('request updateCfjl');
export const recevieUpdateCfjlDetail = createAction('receive updateCfjl');
export const fetchUpdateCfjlDetail = createAjaxAction(
  groupPunishRecord.updateCfjlDetail,
  requestUpdateCfjlDetail,
  recevieUpdateCfjlDetail
);