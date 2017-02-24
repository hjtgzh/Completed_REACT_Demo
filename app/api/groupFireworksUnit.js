import { ajax } from 'utils'

export const fireMessage = ajax.fetchJSONByPost('/jcjw/dpt/bpdw/getDepartmentBpdw')
export const saveMessage = ajax.fetchJSONByPost('/jcjw/dpt/bpdw/saveDepartmentBpdw')