import { ajax } from 'utils'

// 获取列表
export const getList = ajax.fetchJSONByPost('/jcjw/department/queryFaqk')
// 获取详情
export const getDetail = ajax.fetchJSONByPost('/jcjw/department/queryFaqkDetail')
// 添加案发情况
export const addRecord = ajax.fetchJSONByPost('/jcjw/department/insertFaqk')
// 修改案发情况
export const saveRecord=ajax.fetchJSONByPost('/jcjw/department/updateFaqk')
// 删除案发情况
export const deleteRecord=ajax.fetchJSONByPost('/jcjw/department/deleteFaqk')