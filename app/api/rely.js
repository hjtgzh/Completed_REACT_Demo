import { ajax } from 'utils'

export const RelyList = ajax.fetchJSONByPost('/jcjw/ykll/query')
export const RelyDetail = ajax.fetchJSONByPost('/rely/detail')
export const IDcardDetail = ajax.fetchJSONByPost('/jcjw/resident/getBaseBySfzh')
export const DeleteDetail = ajax.fetchJSONByPost('/jcjw/ykll/batchDelete')
export const ExportData = ajax.fetchJSONByPost('/rely/exportData')
export const AddRelyPower = ajax.fetchJSONByPost('/jcjw/ykll/insert')
export const PeopleSituation = ajax.fetchJSONByPost('/jcjw/config/getByKey')
export const exportRelyPower = ajax.fetchJSONByPost('/jcjw/ykll/insertExcel')
