/**
 * Created by 余金彪 on 2017/1/11.单位基本信息详情
 */

import {
  createAction,
} from 'redux-actions'
import {
  groupInformation,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取检查记录详情
export const requestDetailDepartment = createAction('request getDetailDepartment');
export const recevieDetailDepartment = createAction('receive getDetailDepartment');
export const fetchDetailDepartment = createAjaxAction(
  groupInformation.getDetailDepartment,
  requestDetailDepartment,
  recevieDetailDepartment
);


// 获取单位的标签信息
export const requestQueryAllRetrieval = createAction('request queryAllRetrieval');
export const recevieQueryAllRetrieval = createAction('receive queryAllRetrieval');
export const fetchQueryAllRetrieval= createAjaxAction(
  groupInformation.queryAllRetrieval,
  requestQueryAllRetrieval,
  recevieQueryAllRetrieval
);

//单位转为历史
export const requestDeleteDepartment= createAction('request deleteDepartment');
export const recevieDeleteDepartment = createAction('receive deleteDepartment');
export const fetchDeleteDepartment= createAjaxAction(
  groupInformation.deleteDepartment,
  requestDeleteDepartment,
  recevieDeleteDepartment
);

//单位管理人员查询
export const requestGetDepartLeader= createAction('request getDepartLeader');
export const recevieGetDepartLeader = createAction('receive getDepartLeader');
export const fetchGetDepartLeader= createAjaxAction(
  groupInformation.getDepartLeader,
  requestGetDepartLeader,
  recevieGetDepartLeader
);

//保存单位的管理人员
export const requestSaveDepartLeader= createAction('request saveDepartLeader');
export const recevieSaveDepartLeader = createAction('receive saveDepartLeader');
export const fetchSaveDepartLeader= createAjaxAction(
  groupInformation.saveDepartLeader,
  requestSaveDepartLeader,
  recevieSaveDepartLeader
);

//删除单位管理人员
export const requestDeleteDepartmentLeader= createAction('request deleteDepartmentLeader');
export const recevieDeleteDepartmentLeader = createAction('receive deleteDepartmentLeader');
export const fetchDeleteDepartmentLeader= createAjaxAction(
  groupInformation.deleteDepartmentLeader,
  requestDeleteDepartmentLeader,
  recevieDeleteDepartmentLeader
);

//单位管理人员详情
export const requestGetLeaderDetail= createAction('request getLeaderDetail');
export const recevieGetLeaderDetail = createAction('receive getLeaderDetail');
export const fetchGetLeaderDetail= createAjaxAction(
  groupInformation.getLeaderDetail,
  requestGetLeaderDetail,
  recevieGetLeaderDetail
);

//修改单位
export const requestSaveDpt= createAction('request saveDpt');
export const recevieSaveDpt = createAction('receive saveDpt');
export const fetchSaveDpt= createAjaxAction(
  groupInformation.saveDpt,
  requestSaveDpt,
  recevieSaveDpt
);

//修改单位标签
export const requestChangeDptDwlb= createAction('request changeDptDwlb');
export const recevieChangeDptDwlb = createAction('receive changeDptDwlb');
export const fetchChangeDptDwlb= createAjaxAction(
  groupInformation.changeDptDwlb,
  requestChangeDptDwlb,
  recevieChangeDptDwlb
);

//getDepartmentByName
//修改单位标签
export const requestGetDepartmentByName= createAction('request getDepartmentByName');
export const recevieGetDepartmentByName = createAction('receive getDepartmentByName');
export const fetchGetDepartmentByName= createAjaxAction(
  groupInformation.getDepartmentByName,
  requestGetDepartmentByName,
  recevieGetDepartmentByName
);