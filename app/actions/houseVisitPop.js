import {
  createAction,
} from 'redux-actions'
import {
  houseVisitPop,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

//房屋地址全称
export const requestFullName = createAction('request address fullName')
export const receiveFullName = createAction('receive address fullName')
export const fetchFullName = createAjaxAction(
	houseVisitPop.fullName,
	requestFullName,
    receiveFullName
)

// 获取人口详情-登记/居住的action
export const requestRegisterList = createAction('request house popLive')
export const receiveRegisterList = createAction('receive house popLive')
export const fetchRegisterList = createAjaxAction(
	houseVisitPop.registerList,
	requestRegisterList,
    receiveRegisterList
)
//人口详情-登记/居住人员状态改变
export const requestRegisterPopStatusChange = createAction('request popstatus change')
export const receiveRegisterPopStatusChange = createAction('receive popstatus change')
export const fetchRegisterPopStatusChange = createAjaxAction(
    houseVisitPop.registerPopStatusChange,
    requestRegisterPopStatusChange,
    receiveRegisterPopStatusChange
)
//人口详情-登记/居住绑定访查人员
export const requestRegisterBindRoomOrDz = createAction('request RoomOrDz bind')
export const receiveRegisterBindRoomOrDz = createAction('receive RoomOrDz bind')
export const fetchRegisterBindRoomOrDz = createAjaxAction(
    houseVisitPop.registerBindRoomOrDz,
    requestRegisterBindRoomOrDz,
    receiveRegisterBindRoomOrDz
)


// 获取人口详情-曾登记/居住的action
export const requestRegisterOnceList = createAction('request RegisterOnce list')
export const recevieRegisterOnceList = createAction('receive RegisterOnce list')
export const fetchRegisterOnceList = createAjaxAction(
	houseVisitPop.registerOnceList,
	requestRegisterOnceList,
	recevieRegisterOnceList
)
// 获取人口详情-曾登记/居住的删除人员接口
export const requestRegisterOnceDeletePop = createAction('request oncepop delete')
export const recevieRegisterOnceDeletePop = createAction('receive oncepop delete')
export const fetchRegisterOnceDeletePop = createAjaxAction(
    houseVisitPop.registerOnceDeletePop,
    requestRegisterOnceDeletePop,
    recevieRegisterOnceDeletePop
)
// 获取人口详情-系统登记入口的action
export const requestSysRegisterList = createAction('request SysRegister list')
export const receiveSysRegisterList = createAction('receive SysRegister list')
export const fetchSysRegisterList = createAjaxAction(
	houseVisitPop.sysRegisterList,
	requestSysRegisterList,
    receiveSysRegisterList
)

// 获取人口详情-门禁卡持有人的action
export const requestCardHolderList = createAction('request CardHolder list')
export const recevieCardHolderList = createAction('receive CardHolder list')
export const fetchCardHolderList = createAjaxAction(
	houseVisitPop.cardHolderList,
	requestCardHolderList,
	recevieCardHolderList
)

// 获取人口详情-社会申报的action
export const requestDeclareList = createAction('request Declare list')
export const recevieDeclareList = createAction('receive Declare list')
export const fetchDeclareList = createAjaxAction(
	houseVisitPop.declareList,
	requestDeclareList,
	recevieDeclareList
)

//组织架构-详情-安全防范-ytt
export const requestSafeKeepList = createAction('request group safeKeep')
export const recevieSafeKeepList = createAction('receive group safeKeep')
export const fetchSafeKeepList = createAjaxAction(
	houseVisitPop.safeKeepList,
	requestSafeKeepList,
	recevieSafeKeepList
)

//组织架构-详情-安全防范-详情-ytt
export const requestSafeKeepDetail = createAction('request group safeKeepDetail')
export const recevieSafeKeepDetail = createAction('receive group safeKeepDetail')
export const fetchSafeKeepDetail = createAjaxAction(
	houseVisitPop.safeKeepDetail,
	requestSafeKeepDetail,
	recevieSafeKeepDetail
)

//组织架构-详情-安全防范-新增安全防范-ytt
export const requestAddSafeKeep = createAction('request group addSafeKeep')
export const recevieAddSafeKeep = createAction('receive group addSafeKeep')
export const fetchAddSafeKeep = createAjaxAction(
	houseVisitPop.addSafeKeep,
	requestAddSafeKeep,
	recevieAddSafeKeep
)

//组织架构-详情-安全防范-修改安全防范-ytt
export const requestUpdateSafeKeep = createAction('request group updateSafeKeep')
export const recevieUpdateSafeKeep = createAction('receive group updateSafeKeep')
export const fetchUpdateSafeKeep = createAjaxAction(
	houseVisitPop.updateSafeKeep,
	requestUpdateSafeKeep,
	recevieUpdateSafeKeep
)


//新增安全防范列表
//export const requestAddSafeKeepList = createAction('request group addSafeKeep')
//export const recevieAddSafeKeepList = createAction('receive group addSafeKeep')
//export const fetchAddSafeKeepList = createAjaxAction(
//	houseVisitPop.addSafeKeepList,
//	requestAddSafeKeepList,
//	recevieAddSafeKeepList
//)


//删除安全防范-ytt
export const requestDeleteSafeKeep = createAction('request group delete')
export const recevieDeleteSafeKeep = createAction('receive group delete')
export const fetchDeleteSafeKeep = createAjaxAction(
	houseVisitPop.deleteSafeKeep,
	requestDeleteSafeKeep,
	recevieDeleteSafeKeep
)


//获取二维码管理列表-ytt
export const requestQrcodeManagement = createAction('request rqcode list')
export const recevieQrcodeManagement = createAction('receive rqcode list')
export const fetchQrcodeManagement = createAjaxAction(
	houseVisitPop.qrcodeManagement,
	requestQrcodeManagement,
	recevieQrcodeManagement
)


//获取二维码统计列表-ytt
export const requestQrcodeStatistics = createAction('request rqtjcode list')
export const recevieQrcodeStatistics = createAction('receive rqtjcode list')
export const fetchQrcodeStatistics = createAjaxAction(
	houseVisitPop.qrcodeStatistics,
	requestQrcodeStatistics,
	recevieQrcodeStatistics
)

//二维码绑定-ytt
export const requestQrcodeBind = createAction('request qrcode bind')
export const recevieQrcodeBind = createAction('receive qrcode bind')
export const fetchQrcodeBind = createAjaxAction(
	houseVisitPop.qrcodeBind,
	requestQrcodeBind,
	recevieQrcodeBind
)

//获取二维码解绑-ytt
export const requestQrcodeUnbundling = createAction('request rqcode unbundling')
export const recevieQrcodeUnbundling = createAction('receive rqcode unbundling')
export const fetchQrcodeUnbundling = createAjaxAction(
	houseVisitPop.qrcodeUnbundling,
	requestQrcodeUnbundling,
	recevieQrcodeUnbundling
)


//获取访查日志
export const requestGroupVisitRecord = createAction('request group record')
export const recevieGroupVisitRecord = createAction('receive group record')
export const fetchGroupVisitRecord = createAjaxAction(
	houseVisitPop.groupVisitRecord,
	requestGroupVisitRecord,
	recevieGroupVisitRecord
)


//访查
export const requestHouseRoomVisit = createAction('request HouseRoom visit')
export const recevieHouseRoomVisit = createAction('receive HouseRoom visit')
export const fetchHouseRoomVisit = createAjaxAction(
	houseVisitPop.houseRoomVisit,
	requestHouseRoomVisit,
	recevieHouseRoomVisit
)



//批量关联入户
export const requestHouseRelatedHome = createAction('request HouseRelatedHome relate')
export const recevieHouseRelatedHome = createAction('receive HouseRelatedHome relate')
export const fetchHouseRelatedHome = createAjaxAction(
	houseVisitPop.houseRelatedHome,
	requestHouseRelatedHome,
	recevieHouseRelatedHome
)