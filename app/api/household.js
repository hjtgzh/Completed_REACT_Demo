import { ajax } from 'utils'

//获取户号管理列表
export const householdManagementList = ajax.fetchJSONByPost('/jcjw/hhxx/query')
//获取户号统计列表
export const householdStatisticsList = ajax.fetchJSONByPost('/jcjw/hhxx/tongji')
// 解绑地址
export const unbundlingHousehold = ajax.fetchJSONByPost('/jcjw/hhxx/jbhh')
//绑定地址
export const bundlingHousehold = ajax.fetchJSONByPost('/jcjw/hhxx/bdhh')