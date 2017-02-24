import { ajax } from 'utils'

//房屋地址全称-ytt
export const fullName = ajax.fetchJSONByPost('/jcjw/room/fullName')
//人口详情-登记/居住
export const registerList = ajax.fetchJSONByPost('/jcjw/fcgz/room/djjzRy')
export const registerPopStatusChange=ajax.fetchJSONByPost('/jcjw/link/upRyZt')
export const registerBindRoomOrDz=ajax.fetchJSONByPost('/jcjw/link/bdRoomOrDz')

export const registerOnceList = ajax.fetchJSONByPost('/jcjw/fcgz/room/hisDjjzRy')//人员详情-曾登记、居住
export const registerOnceDeletePop = ajax.fetchJSONByPost('/jcjw/resident/residentDelete')//人员详情-曾登记、居住
export const cardHolderList = ajax.fetchJSONByPost('/jcjw/fcgz/room/mjkcyRy')//人员详情-门禁卡持有人
export const declareList = ajax.fetchJSONByPost('/jcjw/fcgz/room/shsbRy')//人员详情-社会申报
export const sysRegisterList = ajax.fetchJSONByPost('/jcjw/fcgz/room/xtdjRy')//人员详情-系统登记入口
//export const addSafeKeepList = ajax.fetchJSONByPost('/group/addSafeKeep')//新增安全防范列表

//安全防范-ytt
export const safeKeepList = ajax.fetchJSONByPost('/jcjw/department/queryAqff')
//安全防范详情-ytt
export const safeKeepDetail = ajax.fetchJSONByPost('/jcjw/department/queryAqffDetail')
//新增安全防范-ytt
export const addSafeKeep = ajax.fetchJSONByPost('/jcjw/department/insertAqff')
//修改安全防范-ytt
export const updateSafeKeep = ajax.fetchJSONByPost('/jcjw/department/updateAqff')
//删除安全防范-ytt
export const deleteSafeKeep = ajax.fetchJSONByPost('/jcjw/department/deleteAqff')

//二维码管理-ytt
export const qrcodeManagement = ajax.fetchJSONByPost('/jcjw/duty/barcode/getBarcode')
//二维码统计列表-ytt
export const qrcodeStatistics = ajax.fetchJSONByPost('/jcjw/duty/barcode/getBarcodeTongji')
//二维码管理-解绑-ytt
export const qrcodeUnbundling = ajax.fetchJSONByPost('/jcjw/building/ewm/unwrapBarCode')
//二维码绑定-ytt
export const qrcodeBind = ajax.fetchJSONByPost('/jcjw/building/ewm/bindBarCode')

export const groupVisitRecord = ajax.fetchJSONByPost('/group/groupVisitRecord')//访查日志
export const houseRoomVisit = ajax.fetchJSONByPost('/jcjw/link/batchFangcha/ry')//访查
export const houseRelatedHome = ajax.fetchJSONByPost('/jcjw/shsb/fixDetached')//批量关联入户