/**
 * Created by 余金彪 on 2017/1/6.从业人员
 */
import {
  createAction,
} from 'redux-actions'
import {
  groupEmployee,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 查询单位的从业人员
export const requestQueryAllCyry = createAction('request queryAllCyry');
export const recevieQueryAllCyry = createAction('receive queryAllCyry');
export const fetchQueryAllCyry = createAjaxAction(
  groupEmployee.getQueryAllCyry,
  requestQueryAllCyry,
  recevieQueryAllCyry
);

// 单位从业人员导入
export const requestImportCyry = createAction('request importCyry');
export const recevieImportCyry = createAction('receive importCyry');
export const fetchImportCyry = createAjaxAction(
  groupEmployee.getImportCyry,
  requestImportCyry,
  recevieImportCyry
);

//新增从业人员
export const requestInsertCyry = createAction('request insertCyry');
export const recevieInsertCyry = createAction('receive insertCyry');
export const fetchInsertCyry = createAjaxAction(
  groupEmployee.getInsertCyry,
  requestInsertCyry,
  recevieInsertCyry
);

//根据从业人员id集合删除从业人员
export const requestDeleteByIdList = createAction('request deleteByIdList');
export const recevieDeleteByIdList = createAction('receive deleteByIdList');
export const fetchDeleteByIdList = createAjaxAction(
  groupEmployee.deleteByIdList,
  requestDeleteByIdList,
  recevieDeleteByIdList
);

//查询人员
export const requestGetBaseBySfzh = createAction('request getBaseBySfzh');
export const recevieGetBaseBySfzh = createAction('receive getBaseBySfzh');
export const fetchGetBaseBySfzh = createAjaxAction(
  groupEmployee.getBaseBySfzh,
  requestGetBaseBySfzh,
  requestGetBaseBySfzh
);

//查询国籍
export const requestFindGjByGjmc = createAction('request findGjByGjmc');
export const recevieFindGjByGjmc = createAction('receive findGjByGjmc');
export const fetchFindGjByGjmc = createAjaxAction(
  groupEmployee.findGjByGjmc,
  requestFindGjByGjmc,
  recevieFindGjByGjmc
);

//查询境外人员
export const requestGetBaseFromJw = createAction('request getBaseFromJw');
export const recevieGetBaseFromJw = createAction('receive getBaseFromJw');
export const fetchGetBaseFromJw = createAjaxAction(
  groupEmployee.getBaseFromJw,
  requestGetBaseFromJw,
  recevieGetBaseFromJw
);


//从业人员导入
export const requestExportTemplate = createAction('request exportTemplate');
export const recevieExportTemplate = createAction('receive exportTemplate');
export const fetchExportTemplate = createAjaxAction(
  groupEmployee.exportTemplate,
  requestExportTemplate,
  recevieExportTemplate
);
