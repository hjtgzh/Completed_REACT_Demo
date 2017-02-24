//房屋地址的接口
import {
  createAction,
} from 'redux-actions'
import {
  houseAddressDetail,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 地址详情
export const requestHouseAddressDetail = createAction('request house address detail')
export const recevieHouseAddressDetail = createAction('receive house address detail')
export const fetchHouseAddressDetail = createAjaxAction( 
  houseAddressDetail.houseAddressDetail,
  requestHouseAddressDetail,
  recevieHouseAddressDetail
)

// 修改地址
export const requestHouseUpdateAddress = createAction('request house update address')
export const recevieHouseUpdateAddress = createAction('receive house update address')
export const fetchHouseUpdateAddress = createAjaxAction( 
  houseAddressDetail.houseUpdateAddress,
  requestHouseUpdateAddress,
  recevieHouseUpdateAddress
)

// 修改地址历史状态
export const requestHouseUpdateHisState = createAction('request house update hisState')
export const recevieHouseUpdateHisState = createAction('receive house update hisState')
export const fetchHouseUpdateHisState = createAjaxAction( 
  houseAddressDetail.houseUpdateHisState,
  requestHouseUpdateHisState,
  recevieHouseUpdateHisState
)

// 删除历史地址
export const requestHouseDelAddress = createAction('request house del address')
export const recevieHouseDelAddress = createAction('receive house del address')
export const fetchHouseDelAddress = createAjaxAction( 
  houseAddressDetail.houseDelAddress,
  requestHouseDelAddress,
  recevieHouseDelAddress
)

// 修改地址经纬度
export const requestHouseUpdateJwd = createAction('request house update jwd')
export const recevieHouseUpdateJwd = createAction('receive house update jwd')
export const fetchHouseUpdateJwd = createAjaxAction( 
  houseAddressDetail.houseUpdateJwd,
  requestHouseUpdateJwd,
  recevieHouseUpdateJwd
)

//添加产权人信息
export const requestHouseCqrAdd = createAction('request house cqr add')
export const recevieHouseCqrAdd = createAction('receive house cqr add')
export const fetchHouseCqrAdd = createAjaxAction( 
  houseAddressDetail.houseCqrAdd,
  requestHouseCqrAdd,
  recevieHouseCqrAdd
)
//删除产权人信息
export const requestHouseCqrDelete = createAction('request house cqr delete')
export const recevieHouseCqrDelete = createAction('receive house cqr delete')
export const fetchHouseCqrDelete = createAjaxAction( 
  houseAddressDetail.houseCqrDelete,
  requestHouseCqrDelete,
  recevieHouseCqrDelete
)

//添加备注
export const requestHouseRelatedbzAdd = createAction('request house relatedbz add')
export const recevieHouseRelatedbzAdd = createAction('receive house relatedbz add')
export const fetchHouseRelatedbzAdd = createAjaxAction( 
  houseAddressDetail.houseRelatedbzAdd,
  requestHouseRelatedbzAdd,
  recevieHouseRelatedbzAdd
)

//删除备注（地址）
export const requestHouseRelatedbzDelete = createAction('request house relatedbz delete')
export const recevieHouseRelatedbzDelete = createAction('receive house relatedbz delete')
export const fetchHouseRelatedbzDelete = createAjaxAction( 
  houseAddressDetail.houseRelatedbzDelete,
  requestHouseRelatedbzDelete,
  recevieHouseRelatedbzDelete
)

//查询户号
export const requestHouseHh = createAction('request house Hh')
export const recevieHouseHh = createAction('receive house Hh')
export const fetchHouseHh = createAjaxAction( 
  houseAddressDetail.HouseHh,
  requestHouseHh,
  recevieHouseHh
)

//绑定地址户号
export const requestHouseAddBuildHh = createAction('request house addBuild Hh')
export const recevieHouseAddBuildHh = createAction('receive house addBuild Hh')
export const fetchHouseAddBuildHh = createAjaxAction( 
  houseAddressDetail.houseAddBuildHh,
  requestHouseAddBuildHh,
  recevieHouseAddBuildHh
)

//解绑地址户号
export const requestHouseDelBuildHh = createAction('request house delBuild Hh')
export const recevieHouseDelBuildHh = createAction('receive house delBuild Hh')
export const fetchHouseDelBuildHh = createAjaxAction( 
  houseAddressDetail.houseDelBuildHh,
  requestHouseDelBuildHh,
  recevieHouseDelBuildHh
)

//查询档案号
export const requestHouseDah = createAction('request house Dah')
export const recevieHouseDah = createAction('receive house Dah')
export const fetchHouseDah = createAjaxAction( 
  houseAddressDetail.houseDah,
  requestHouseDah,
  recevieHouseDah
)


//绑定档案号
export const requestHouseaddBuildDah = createAction('request house addBuild Dah')
export const recevieHouseaddBuildDah = createAction('receive house addBuild Dah')
export const fetchHouseAddBuildDah = createAjaxAction( 
  houseAddressDetail.houseAddBuildDah,
  requestHouseaddBuildDah,
  recevieHouseaddBuildDah
)


//解绑档案号
export const requestHousedelBuildDah = createAction('request house delBuild Dah')
export const recevieHousedelBuildDah = createAction('receive house delBuild Dah')
export const fetchHouseDelBuildDah = createAjaxAction( 
  houseAddressDetail.houseDelBuildDah,
  requestHousedelBuildDah,
  recevieHousedelBuildDah
)

//绑定地址二维码
export const requestHouseAddBarCode = createAction('request house add barCode')
export const recevieHouseAddBarCode = createAction('receive house add barCode')
export const fetchHouseAddBarCode = createAjaxAction( 
  houseAddressDetail.houseAddBarCode,
  requestHouseAddBarCode,
  recevieHouseAddBarCode
)

//解绑地址二维码
export const requestHouseDelBarCode = createAction('request house del barCode')
export const recevieHouseDelBarCode = createAction('receive house del barCode')
export const fetchHouseDelBarCode = createAjaxAction( 
  houseAddressDetail.houseDelBarCode,
  requestHouseDelBarCode,
  recevieHouseDelBarCode
)

//查询标准地址
export const requestHousebzdz = createAction('request house bzdz')
export const recevieHousebzdz = createAction('receive house bzdz')
export const fetchHousebzdz = createAjaxAction( 
  houseAddressDetail.houseBzdz,
  requestHousebzdz,
  recevieHousebzdz
)

//绑定标准地址
export const requestHouseBdBzdz = createAction('request house bd bzdz')
export const recevieHouseBdBzdz = createAction('receive house bd bzdz')
export const fetchHouseBdbzdz = createAjaxAction( 
  houseAddressDetail.houseBdBzdz,
  requestHouseBdBzdz,
  recevieHouseBdBzdz
)


//解绑标准地址
export const requestHouseDelBdBzdz = createAction('request house del bzdz')
export const recevieHouseDelBdBzdz = createAction('receive house del bzdz')
export const fetchHouseDelbzdz = createAjaxAction( 
  houseAddressDetail.houseDelBzdz,
  requestHouseDelBdBzdz,
  recevieHouseDelBdBzdz
)

//添加责任区
export const requestHouseAddZrq = createAction('request house add zrq')
export const recevieHouseAddZrq = createAction('receive house add zrq')
export const fetchHouseAddZrq = createAjaxAction( 
  houseAddressDetail.houseAddZrq,
  requestHouseAddZrq,
  recevieHouseAddZrq
)

//解除责任区
export const requestHouseDelZrq = createAction('request house del zrq')
export const recevieHouseDelZrq = createAction('receive house del zrq')
export const fetchHouseDelZrq = createAjaxAction( 
  houseAddressDetail.houseDelZrq,
  requestHouseDelZrq,
  recevieHouseDelZrq
)

//地址合并
export const requestHouseCombineBuilding = createAction('request house combine building')
export const recevieHouseCombineBuilding = createAction('receive house combine building')
export const fetchHouseCombineBuilding = createAjaxAction( 
  houseAddressDetail.houseCombineBuilding,
  requestHouseCombineBuilding,
  recevieHouseCombineBuilding
)

//根据村居委会id和类型查询1：道路；3：村组； 查区域地址
export const requestGetLoadOrVillageGroupListByDm=createAction('request LoadOrVillageGroup list byDm')
export const receiveGetLoadOrVillageGroupListByDm=createAction('receive LoadOrVillageGroup list byDm')
export const fetchGetLoadOrVillageGroupListByDm=createAjaxAction(
    houseAddressDetail.loadOrVillageGroupListByDm,
    requestGetLoadOrVillageGroupListByDm,
    receiveGetLoadOrVillageGroupListByDm
)

//根据村居委会id和类型查询1：道路；3：村组； 查区域地址
export const requestGetLoadListByDm=createAction('request load list byDm')
export const receiveGetLoadListByDm=createAction('receive load list byDm')
export const fetchGetLoadListByDm=createAjaxAction(
    houseAddressDetail.loadOrVillageGroupListByDm,
    requestGetLoadListByDm,
    receiveGetLoadListByDm
)

//根据小区id查询附属区苑
export const requestHouseXqFsById=createAction('request house xqFs byId')
export const receiveHouseXqFsById=createAction('receive house xqFs byId')
export const fetcHouseXqFsById=createAjaxAction(
    houseAddressDetail.houseXqFsById,
    requestHouseXqFsById,
    receiveHouseXqFsById
)
//查询发案情况
export const requestCaseMsg = createAction('request case list')
export const recevieCaseMsg = createAction('receive case list')
export const fetchCaseMsg = createAjaxAction( 
  houseAddressDetail.caseMsg,
  requestCaseMsg,
  recevieCaseMsg
)
//增加发案情况
export const requestCaseMsgAdd = createAction('request caseMsg insert')
export const recevieCaseMsgAdd = createAction('receive caseMsg insert')
export const fetchCaseMsgAdd  = createAjaxAction(
  houseAddressDetail.caseMsgAdd,
  requestCaseMsgAdd,
  recevieCaseMsgAdd
)
//发案情况的修改
export const requestCaseMsgDetail= createAction('request caseMsg detail')
export const recevieCaseMsgDetail= createAction('receive caseMsg detail')
export const fetchCaseMsgDetail  = createAjaxAction(
  houseAddressDetail.caseMsgDetail,
  requestCaseMsgDetail,
  recevieCaseMsgDetail
)
//发案情况的修改
export const requestCaseMsgUpdate= createAction('request caseMsg update')
export const recevieCaseMsgUpdate= createAction('receive caseMsg update')
export const fetchCaseMsgUpdate  = createAjaxAction(
  houseAddressDetail.caseMsgUpdate,
  requestCaseMsgUpdate,
  recevieCaseMsgUpdate
)
//发案情况的删除
export const requestCaseMsgDelete= createAction('request caseMsg delete')
export const recevieCaseMsgDelete= createAction('receive caseMsg delete')
export const fetchCaseMsgDelete = createAjaxAction(
  houseAddressDetail.caseMsgDelete,
  requestCaseMsgDelete,
  recevieCaseMsgDelete
)