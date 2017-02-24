import {
  createAction,
} from 'redux-actions'
import {
  department,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 缓存筛选条件
export const groupCacheCondition = createAction('cache condition');

// 获取头部搜索中文
export const requestAllRetrieval = createAction('request all retrieval');
export const recevieAllRetrieval = createAction('receive all retrieval');
export const getAllRetrieval = createAjaxAction(
  department.getAllRetrieval,
  requestAllRetrieval,
  recevieAllRetrieval
);

// 获取头部搜索数量
export const requestAllRetrievalNum = createAction('request all retrieval num');
export const recevieAllRetrievalNum = createAction('receive all retrieval num');
export const getAllRetrievalNum = createAjaxAction(
  department.getAllRetrievalNum,
  requestAllRetrievalNum,
  recevieAllRetrievalNum
);




// 获取组织结构列表
export const requestDepartmentList = createAction('request department list');
export const recevieDepartmentList = createAction('receive department list');
export const getDepartmentList = createAjaxAction(
  department.getDepartmentList,
  requestDepartmentList,
  recevieDepartmentList
);

// 根据身份证号查询法人信息
export const requestSearchLegalPersonByIdnumber = createAction('request search legal person by idnumber');
export const recevieSearchLegalPersonByIdnumber = createAction('receive search legal person by idnumber');
export const searchLegalPersonByIdnumber = createAjaxAction(
  department.searchLegalPersonByIdnumber,
  requestSearchLegalPersonByIdnumber,
  recevieSearchLegalPersonByIdnumber
);

// 新增单位
export const requestAddDepartment = createAction('request add department');
export const recevieAddDepartment = createAction('receive add department');
export const addDepartment = createAjaxAction(
  department.addDepartment,
  requestAddDepartment,
  recevieAddDepartment
);

// 调档查询单位名称
export const requestSearchDepartmentName = createAction('request search department name');
export const recevieSearchDepartmentName = createAction('receive search department name');
export const searchDepartmentName = createAjaxAction(
  department.searchDepartmentName,
  requestSearchDepartmentName,
  recevieSearchDepartmentName
);

// 调档查询工商执照代码
export const requestSearchBusinessCode = createAction('request search business code');
export const recevieSearchBusinessCode = createAction('receive search business code');
export const searchBusinessCode = createAjaxAction(
  department.searchBusinessCode,
  requestSearchBusinessCode,
  recevieSearchBusinessCode
);

// 调档
export const requestTransferFile = createAction('request transfer file');
export const recevieTransferFile = createAction('receive transfer file');
export const exeTransferFile = createAjaxAction(
  department.transferFile,
  requestTransferFile,
  recevieTransferFile
);

// 调档中查询法人
export const requestSearchLegalPerson = createAction('request search legal person');
export const recevieSearchLegalPerson = createAction('receive search legal person');
export const searchLegalPerson = createAjaxAction(
  department.searchLegalPerson,
  requestSearchLegalPerson,
  recevieSearchLegalPerson
);

// 关联地址
export const requestContactAddress = createAction('request contact address');
export const recevieContactAddress = createAction('receive contact address');
export const contactAddress = createAjaxAction(
  department.contactAddress,
  requestContactAddress,
  recevieContactAddress
);


//点击组织结构详情获取基本信息
export const requestDepartmentDetail = createAction('request detail info');
export const recevieDepartmentDetail = createAction('receive detail info');
export const searchDepartmentDetail = createAjaxAction(
  department.getDepartmentDetail,
  requestDepartmentDetail,
  recevieDepartmentDetail
);
//从业人员查询
export const requestGroupEmployee = createAction('request employee info');
export const recevieGroupEmployee= createAction('receive employee info');
export const searchGroupEmployee = createAjaxAction(
  department.getGroupEmployee,
  requestGroupEmployee,
  recevieGroupEmployee
);
//处罚记录
export const requestGroupPunishRecord = createAction('request punishRecord info');
export const recevieGroupPunishRecord= createAction('receive punishRecord info');
export const searchGroupPunishRecord = createAjaxAction(
  department.getGroupPunishRecord,
  requestGroupPunishRecord,
  requestGroupPunishRecord
);
//处罚记录新增
export const requestGroupPunishRecordAdd = createAction('request addPunishRecord info');
export const recevieGroupPunishRecordAdd= createAction('receive addPunishRecord info');
export const AddGroupPunishRecord = createAjaxAction(
  department.addGroupPunishRecord,
  requestGroupPunishRecordAdd,
  recevieGroupPunishRecordAdd
);
//处罚记录详情
export const requestGroupPunishRecordDetail = createAction('request addPunishDetail info');
export const recevieGroupPunishRecordDetail= createAction('receive addPunishDetail info');
export const groupPunishRecordDetail = createAjaxAction(
  department.groupPunishRecordDetail,
  requestGroupPunishRecordDetail,
  requestGroupPunishRecordDetail
);
//消防信息查询
export const requestGroupFireMessage = createAction('request groupFireMessage info');
export const recevieGroupFireMessage= createAction('receive groupFireMessage info');
export const groupFireMessageNew = createAjaxAction(
  department.getGroupFireMessage,
  requestGroupFireMessage,
  requestGroupFireMessage
);

////新增消防信息
export const requestAddGroupFireMessage = createAction('request updateGroupFireMessage info');
export const recevieAddGroupFireMessage= createAction('receive updateGroupFireMessage info');
export const groupFireMessageNewAdd = createAjaxAction(
  department.addGroupFireMessage,
  requestAddGroupFireMessage,
  recevieAddGroupFireMessage
);

//消防器材查询
export const requestFireEquipment = createAction('request getFireEquipment info');
export const recevieFireEquipment= createAction('receive getFireEquipment info');
export const getGroupFireEquipment = createAjaxAction(
  department.searchFireEquipment,
  requestFireEquipment,
  recevieFireEquipment
);

//消防器材保存
export const requestSaveFireEquipment = createAction('request saveFireEquipment info');
export const recevieSaveFireEquipment= createAction('receive saveFireEquipment info');
export const saveGroupFireEquipment = createAjaxAction(
  department.saveFireEquipment,
  requestSaveFireEquipment,
  recevieSaveFireEquipment
);

//单位-访查日志
export const requestDepartmentLog = createAction('request departmentLog');
export const recevieDepartmentLog= createAction('receive departmentLog');
export const fetchDepartmentLog = createAjaxAction(
  department.fetchDepartmentLog,
  requestDepartmentLog,
  recevieDepartmentLog
);

//获取单位名称
export const requestDepartmentName = createAction('request department name');
export const recevieDepartmentName= createAction('receive department name');
export const getDepartmentName = createAjaxAction(
  department.getDepartmentName,
  requestDepartmentName,
  recevieDepartmentName
);