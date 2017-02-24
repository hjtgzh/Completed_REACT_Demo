/**
 * Created by 余金彪 on 2017/1/11.单位基本信息详情
 */

import {ajax} from 'utils'

//获取单位处罚记录详情
export const getDetailDepartment = ajax.fetchJSONByPost('/jcjw/department/getDetailDepartment')

//获取单位的标签信息
export const queryAllRetrieval = ajax.fetchJSONByPost('/jcjw/retrieval/queryRetrieval')

//单位转为历史
export const deleteDepartment = ajax.fetchJSONByPost('/jcjw/department/deleteDepartment')

//单位管理人员查询
export const getDepartLeader = ajax.fetchJSONByPost('/jcjw/department/getDepartLeader')

//保存单位的管理人员
export const saveDepartLeader = ajax.fetchJSONByPost('/jcjw/department/saveDepartLeader')

//删除单位管理人员
export const deleteDepartmentLeader = ajax.fetchJSONByPost('/jcjw/department/deleteDepartmentLeader')

//单位管理人员详情
export const getLeaderDetail = ajax.fetchJSONByPost('/jcjw/department/getLeaderDetail')

//修改单位
export const saveDpt = ajax.fetchJSONByPost('/jcjw/department/saveDpt')

//修改单位标签
export const changeDptDwlb = ajax.fetchJSONByPost('/jcjw/department/changeDptDwlb')

//
export const getDepartmentByName = ajax.fetchJSONByPost('/jcjw/department/getDepartmentsByName')