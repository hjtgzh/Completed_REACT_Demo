import { ajax } from 'utils'
export const declareList = ajax.fetchJSONByPost('/jcjw/shsb/getTotalShsb')
export const declareCount=ajax.fetchJSONByPost('/jcjw/shsb/getShsbTongJi')
export const updateSblb=ajax.fetchJSONByPost('/jcjw/shsb/updateSblb')
export const bindSblb=ajax.fetchJSONByPost('/jcjw/shsb/bind')
// 获取统计值
export const getAllRetrievalNum = ajax.fetchJSONByPost('/jcjw/department/getStatisticsByParam')
