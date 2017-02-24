import { ajax } from 'utils'

// 治安情况列表的action-ytt
export const securityList = ajax.fetchJSONByPost('/jcjw/case/getTotalCase')
// 治安情况案件详情
export const securityDetail = ajax.fetchJSONByPost('/jcjw/case/getCaseDetail')
// 治安情况案件详情
export const securityAdd = ajax.fetchJSONByPost('/jcjw/case/insertHfjl')
// 查询案件日志详情
export const fetchSecurityLogList = ajax.fetchJSONByPost('/jcjw/case/getHfjlList')
