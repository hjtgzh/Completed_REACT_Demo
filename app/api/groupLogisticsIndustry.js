import { ajax } from 'utils'
//获取物流线路的信息
export const logisticsRoad = ajax.fetchJSONByPost('/jcjw/department/getWltyWlxl')
//新增物流线路
export const logisticsRoadAdd = ajax.fetchJSONByPost('/jcjw/department/saveWltyWlxl')
//删除物流线路
export const logisticsRoadDelete = ajax.fetchJSONByPost('/jcjw/department/deleteWltyWlxl')
//获取租客信息
export const carMessage = ajax.fetchJSONByPost('/jcjw/department/getDptCar')
//新增租客
export const carMessageAdd = ajax.fetchJSONByPost('/jcjw/department/saveDptCar')

//删除租客
export const  carMessageDelete = ajax.fetchJSONByPost('/jcjw/department/deleteDptCar')
//获取货物物流信息
export const logisticsMsg = ajax.fetchJSONByPost('/jcjw/department/getWltySfhxx')
//新增货物物流信息
export const logisticsMsgAdd = ajax.fetchJSONByPost('/jcjw/department/saveWltySfhxx')

//删除货物物流信息
export const  logisticsMsgDelete = ajax.fetchJSONByPost('/jcjw/department/deleteWltySfhxx')

