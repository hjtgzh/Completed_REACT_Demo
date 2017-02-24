import { ajax } from 'utils'
export const policeList = ajax.fetchJSONByPost('/jcjw/duty/gps/getTotalGps')//获取警员列表
export const policeDetail = ajax.fetchJSONByPost('/jcjw/duty/gps/getGpsDeviceDetail')//获取警员详情
export const updatePoliceDetail = ajax.fetchJSONByPost('/jcjw/duty/gps/updateGpsDevice')//修改警员详情
export const policeSendMsg = ajax.fetchJSONByPost('/jcjw/resident/visit/getTotalVisit')//发送短信
export const policeSendWX = ajax.fetchJSONByPost('/jcjw/resident/visit/getTotalVisit')//发送微信