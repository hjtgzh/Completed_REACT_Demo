import { ajax } from 'utils'

// 获取统计内容
export const getAllRetrieval = ajax.fetchJSONByPost('/jcjw/retrieval/queryAllRetrieval')
// 获取统计值
export const getAllRetrievalNum = ajax.fetchJSONByPost('/jcjw/search/departmentCounts')
// 获取组织架构列表
export const getDepartmentList = ajax.fetchJSONByPost('/jcjw/department/queryDptPager')
// 通过身份证号码查询法人
export const searchLegalPersonByIdnumber = ajax.fetchJSONByPost('/jcjw/resident/getBaseBySfzh')
// 添加组织架构信息
export const addDepartment = ajax.fetchJSONByPost('/jcjw/department/saveDpt')
// 调档中通过机构名称查询
export const searchDepartmentName=ajax.fetchJSONByPost('/jcjw/department/diaodang')
// 调档中通过工商代码查询
export const searchBusinessCode=ajax.fetchJSONByPost('/jcjw/department/diaodang')
// 调档中通过法人查询
export const searchLegalPerson=ajax.fetchJSONByPost('/jcjw/department/diaodang')
// 执行调档
export const transferFile=ajax.fetchJSONByPost('/jcjw/department/insertDiaodang')
// 关联地址
export const contactAddress=ajax.fetchJSONByPost('/jcjw/department/changeAddress')
// 获取单位详情
export const getDepartmentDetail=ajax.fetchJSONByPost('/department/getDepartmentDetail')

export const getGroupEmployee=ajax.fetchJSONByPost('/department/getGroupEmployee')

export const getGroupPunishRecord=ajax.fetchJSONByPost('/department/getGroupPunishRecord')

export const addGroupPunishRecord=ajax.fetchJSONByPost('/department/addGroupPunishRecord')

export const groupPunishRecordDetail=ajax.fetchJSONByPost('/department/groupPunishRecordDetail')

export const getGroupFireMessage=ajax.fetchJSONByPost('/department/getGroupFireMessageDetail')

export const addGroupFireMessage=ajax.fetchJSONByPost('/department/addGroupFireMessage')

export const searchFireEquipment=ajax.fetchJSONByPost('/department/getGroupFireEquipment')

export const saveFireEquipment=ajax.fetchJSONByPost('/department/saveGroupFireEquipment')

export const fetchDepartmentLog=ajax.fetchJSONByPost('/jcjw/sys/log/getDepartmentCzList')//单位访查日志

export const getDepartmentName=ajax.fetchJSONByPost('/jcjw/department/getDptNameById')

