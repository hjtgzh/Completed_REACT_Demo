import { ajax } from 'utils'

//单位日志统计列表查询
export const unitList = ajax.fetchJSONByPost('/jcjw/sys/logStatistics/getUnitStatList')
//个人日志统计列表查询
export const personalList = ajax.fetchJSONByPost('/jcjw/sys/logStatistics/getPersonalStatList')
//详情
export const personalDetail = ajax.fetchJSONByPost('/jcjw/sys/log/getPersonalStatDetailList')
