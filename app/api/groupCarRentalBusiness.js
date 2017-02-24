import { ajax } from 'utils'
//获取经营区域信息
export const areaAddress = ajax.fetchJSONByPost('/jcjw/department/getQczlJyqy')
//获取租赁信息
export const  rentMessage = ajax.fetchJSONByPost('/jcjw/department/getQczlZlxx')
//新增经营区域
export const areaAddressAdd = ajax.fetchJSONByPost('/jcjw/department/saveQczlJyqy')
//删除经营区域
export const areaAddressDelete = ajax.fetchJSONByPost('/jcjw/department/deleteQczlJyqy')
//新增租赁信息
export const rentMessageAdd = ajax.fetchJSONByPost('/jcjw/department/saveQczlZlxx')

//删除租赁信息
export const rentMessageDelete = ajax.fetchJSONByPost('/jcjw/department/deleteQczlZlxx')
