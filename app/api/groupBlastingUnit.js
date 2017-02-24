import { ajax } from 'utils'

// 爆破单位
export const getBlastingUnit = ajax.fetchJSONByPost('/jcjw/dpt/bpdw/getDepartmentBpdw')
export const saveBlastingUnit = ajax.fetchJSONByPost('/jcjw/dpt/bpdw/saveDepartmentBpdw')

// 爆破仓库
export const getBlastingStore = ajax.fetchJSONByPost('/jcjw/dpt/bpck/getDepartmentBpck')
export const saveBlastingStore = ajax.fetchJSONByPost('/jcjw/dpt/bpck/saveDepartmentBpck')

// 爆破项目
export const getBlastingProjectList=ajax.fetchJSONByPost('/jcjw/dpt/bpxm/getDepartmentBpxm')
export const getBlastingProjectDetail=ajax.fetchJSONByPost('/jcjw/dpt/bpxm/getDepartmentBpxmById')
export const addBlastingProject=ajax.fetchJSONByPost('/jcjw/dpt/bpxm/insertDepartmentBpxm')
export const saveBlastingProject=ajax.fetchJSONByPost('/jcjw/dpt/bpxm/updateDepartmentBpxm')
export const deleteBlastingProject=ajax.fetchJSONByPost('/jcjw/dpt/bpxm/deleteDepartmentBpxmById')