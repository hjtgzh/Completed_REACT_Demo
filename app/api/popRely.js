import { ajax } from 'utils'

export const relyBasicInfo = ajax.fetchJSONByPost('/jcjw/ykll/getDetailById')
export const updateBasicForm = ajax.fetchJSONByPost('/jcjw/ykll/update')
export const updateType = ajax.fetchJSONByPost('/jcjw/ykll/updateType')
export const deleteRelyPeople = ajax.fetchJSONByPost('/jcjw/ykll/batchDelete')
export const relyRewardList = ajax.fetchJSONByPost('/jcjw/ykll/jc/listByBaseId')
export const updateRewardList = ajax.fetchJSONByPost('/jcjw/ykll/jc/update')
export const insertRewardList = ajax.fetchJSONByPost('/jcjw/ykll/jc/insert')
export const deleteRewardList = ajax.fetchJSONByPost('/jcjw/ykll/jc/delete')
