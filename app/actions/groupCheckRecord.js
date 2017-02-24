/**
 * Created by 余金彪 on 2017/1/4.//检查记录
 */
import {
  createAction,
} from 'redux-actions'
import {
  groupCheckRecord,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取检查记录详情
export const requestCheckRecord = createAction('request checkRecord');
export const recevieCheckRecord = createAction('receive checkRecord');
export const fetchCheckRecordInfo = createAjaxAction(
  groupCheckRecord.getCheckRecordInfo,
  requestCheckRecord,
  recevieCheckRecord
);

// 新增检查记录
export const requestCheckRecordInsert = createAction('request insertCheckRecord');
export const recevieCheckRecordInsert = createAction('receive insertCheckRecord');
export const fetchInsertCheckRecord = createAjaxAction(
  groupCheckRecord.insertCheckRecordInfo,
  requestCheckRecordInsert,
  recevieCheckRecordInsert
);

//单位检查记录详情查询
export const requestQueryJcjlDetail = createAction('request queryJcjlDetail');
export const recevieQueryJcjlDetail = createAction('receive queryJcjlDetail');
export const fetchQueryJcjlDetail= createAjaxAction(
  groupCheckRecord.queryJcjlDetail,
  requestQueryJcjlDetail,
  recevieQueryJcjlDetail
);

//单位检查记录修改保存
export const requestUpdateJcjl = createAction('request updateJcjl');
export const recevieUpdateJcjl = createAction('receive updateJcjl');
export const fetchUpdateJcjl= createAjaxAction(
  groupCheckRecord.updateJcjl,
  requestUpdateJcjl,
  recevieUpdateJcjl
);

//单位检查记录删除
export const requestDleteJcjl = createAction('request deleteJcjl');
export const recevieDeleteJcjl = createAction('receive deleteJcjl');
export const fetchDleteJcjl = createAjaxAction(
  groupCheckRecord.deleteJcjl,
  requestDleteJcjl,
  recevieDeleteJcjl
);

//根据dptid获取寄递业检查记录  getDepartmentJdyRecordByCompanyid
export const requestGetDepartmentJdy = createAction('request getDepartmentJdyRecordByCompanyid');
export const recevieGetDepartmentJdy = createAction('receive getDepartmentJdyRecordByCompanyid');
export const fetchGetDepartmentJdy = createAjaxAction(
  groupCheckRecord.getDepartmentJdyRecordByCompanyid,
  requestGetDepartmentJdy,
  recevieGetDepartmentJdy
);

//getDepartmentJdyRecordByid
export const requestGetDepartmentJdyRecordByid = createAction('request getDepartmentJdyRecordByid');
export const recevieGetDepartmentJdyRecordByid= createAction('receive getDepartmentJdyRecordByid');
export const fetchGetDepartmentJdyRecordByid = createAjaxAction(
  groupCheckRecord.getDepartmentJdyRecordByid,
  requestGetDepartmentJdyRecordByid,
  recevieGetDepartmentJdyRecordByid
);

//删除获取寄递业检查记录
export const requestDeleteDepartmentJdy = createAction('request deleteDepartmentJdyRecordById');
export const recevieDeleteDepartmentJdy= createAction('receive deleteDepartmentJdyRecordById');
export const fetchDeleteDepartmentJdy = createAjaxAction(
  groupCheckRecord.deleteDepartmentJdyRecordById,
  requestDeleteDepartmentJdy,
  recevieDeleteDepartmentJdy
);

//保存寄递业检查记录
export const requestSaveDepartmentJdyRecord = createAction('request saveDepartmentJdyRecord');
export const recevieSaveDepartmentJdyRecord= createAction('receive saveDepartmentJdyRecord');
export const fetchSaveDepartmentJdyRecord = createAjaxAction(
  groupCheckRecord.saveDepartmentJdyRecord,
  requestSaveDepartmentJdyRecord,
  recevieSaveDepartmentJdyRecord
);