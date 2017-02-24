import { ajax } from 'utils'
//获取业主的信息
export const ownerMessage = ajax.fetchJSONByPost('/jcjw/department/getGyYzxx')
//新增业主
export const ownerMessagAdd = ajax.fetchJSONByPost('/jcjw/department/saveGyYzxx')
//删除业主
export const ownerMessageDelete = ajax.fetchJSONByPost('/jcjw/department/deleteGyYzxx')
//获取租客信息
export const rentMessage = ajax.fetchJSONByPost('/jcjw/department/getGyZlxx')
//新增租客
export const  rentMessageAdd = ajax.fetchJSONByPost('/jcjw/department/saveGyZlxx')

//删除租客
export const  renterMessageDelete = ajax.fetchJSONByPost('/jcjw/department/deleteGyZlxx')
