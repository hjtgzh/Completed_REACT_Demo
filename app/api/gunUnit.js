import { ajax } from 'utils'

// 保存枪支单位信息
export const saveInfo = ajax.fetchJSONByPost('/jcjw/department/saveCqdw')
// 获取枪支单位信息
export const getInfo = ajax.fetchJSONByPost('/jcjw/department/getCqdw')
// 查询单位类别
export const getDwlb = ajax.fetchJSONByPost('/jcjw/department/getDwlb')
// 查询单位性质
export const getDwxz = ajax.fetchJSONByPost('/jcjw/department/getDwxz')
