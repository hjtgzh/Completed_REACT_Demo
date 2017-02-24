import { ajax } from 'utils'

export const companyList = ajax.fetchJSONByPost('/jcjw/department/visit/queryDptInfoInBuilding')
export const companyLegelPersonSearch = ajax.fetchJSONByPost('/jcjw/resident/getBaseBySfzh')
export const companyAddList = ajax.fetchJSONByPost('/jcjw/department/saveDpt')
export const companyTransSearch = ajax.fetchJSONByPost('/jcjw/department/diaodang')
export const companyTransInsert = ajax.fetchJSONByPost('/jcjw/department/insertDiaodang')
export const companyOnceDelete = ajax.fetchJSONByPost('/jcjw/department/deleteHistoryDepartment')


