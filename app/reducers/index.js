import {
  routerReducer as routing,
} from 'react-router-redux'
import {
  combineReducers,
} from 'redux'

import tabListResult from './tabList'

// house
import {
  houseCheckSearchResult,
  houseCheckSearchQuery,
  houseDetailResult,
  //黄建停--room请求
  roomCheckSearchResult,
  searchAddressResult,
  saveFloorsResult,
  fetchFloorsResult,
  deleteFloorsRoomResult,
  addFloorsRoomResult,
  updataFloorsRoomResult,
  updataFloorsUniteResult,
  publicStationResult,
  policeStationResult,
  AreaResult,
  countryResult,
  streetResult,
  roadResult,
  houseMarkResult,
  houseMarkNameResult,
  addressSubmitResult,
  fetchVisitConResult,
  fetchBuildingCountResult,
  fetchUniteCountResult,
  fetchBuildgingLogResult,
  fetchRoomLogResult,
  buildingCountsResult,
  roomCountsResult,
  roomNameResult,
} from './house'

import{
  houseAddressDetailSearchResult,
  houseUpdateAddressResult,
  houseUpdateHisStateResult,
  houseDelAddressResult,
  houseAddressCqrAddResult,
  houseAddressCqrDeleteResult,
  houseRelatedbzAddResult,
  houseRelatedbzDeleteResult,
  houseHhResult,
  houseAddBuildHhResult,
  houseDelBuildHhResult,
  houseDahResult,
  houseAddBuildDahResult,
  houseDelBuildDahResult,
  houseBzdzResult,
  houseAddBzdzResult,
  houseDelBzdzResult,
  houseAddZrqResult,
  houseDelZrqResult,
  houseAddBarCodeResult,
  houseDelBarCodeResult,
  houseCombineBuildingResult,
  getLoadOrVillageGroupListByDmResult,
  houseXqFsByIdResult,
  houseUpdateJwdResult,
  caseMsgSearchResult,
  caseMsgDetailResult,
  caseMsgAddResult,
  caseMsgDeleteResult,
  updateCaseMsgResult,
  getLoadListByDmResult,
} from './houseAddressDetail'

import {
  picListResult,
  savePicItemResponse,
  deletePicItemResponse,
  uploadPicResponse,
  AllPicResult,
} from './housePic'

import {
  departmentListResult,
  statisticsResult,
  searchResultByDepartmentName,
  searchResultByBusinessCode,
  searchResultByLegalPerson,
  addDepartmentResult,
  exeTransferFileResult,

  departmentDetailInfo,
  getGroupEmployeeInfo,
  searchGroupPunishRecord,
  addGroupPunishRecord,
  getGroupPunishRecordDetail,
  searchGroupFireMessage,
  updateGroupFireMessage,
  searchGroupFireEquipment,
  updateGroupFireEquipment,
  fetchDepartmentLogResult,
  fetchDepartmentNameResult,
} from './department'

import {
  incidenceConditionList,
  incidenceConditionDetail,
} from './incidenceCondition'
import {
  addGunUnitInfoResponse,
  gunUnitTypeList,
  gunUnitPropList,
}from './gunUnit'
import {
  //管辖单位
  unitPoliceStationListResult,
  unitSubStationListResult,
  unitResponseAreaResult,
  unitSubstationRelDivisionResult,
  unitEditRelationOfDivisionResult,
  responseAreaAddResult,
  responseAreaUpdateResult,
  responseAreaPoliceResult,
  policeListResult,
  policeAddResult,
  responsePoliceDeleteResult,
  responseAddressResult,
  cognateAddressListResult,
  addAddressResult,
  responseAddressDeleteResult,

  //行政区划
  getDivisionRelUnitResult,
  updateDivisionRelUnitResult,
  getLoadOrVillageGroupListResult,
  getAreaAddressListResult,
  //申报管理
  countyListSearchResult,
  streetListSearchResult,
  villageCommitteeListSearchResult,
  commonListSearchResult,
  villageListSearchResult,
  addDeclarResult,
  updateDeclarResult,
  deleteDeclarResult,
  passDeclarResult,
  searchAddressStatisticsList
}from './houseAddress'

// houseVisitPop
import {
  registerFullNameSearchResult,//房屋全程
  registerListSearchResult,//人员详情-登记、居住
  registerPopStatusChangeResult,//人口详情-登记/居住人员状态改变
  registerBindRoomOrDzResult,//绑定访查人员
  registerOnceListSearchResult,//人员详情-曾登记、居住
  registerOnceDeletePopSearchResult,//曾登记/居住的删除人员接口
  cardHolderListSearchResult,//人员详情-门禁卡持有人
  declareListSearchResult,//人员详情-社会申报
  sysRegisterListSearchResult,//人员详情-系统登记入口
  //addSafeKeepListSearchResult,//新增安全防范列表

  addSafeKeepSearchResult,//新增安全防范-ytt
  updateSafeKeepSearchResult,//修改安全防范-ytt
  safeKeepListSearchResult,//安全防范列表-ytt
  safeKeepDetailSearchResult,//查询安全防范详情-ytt
  deleteSafeKeepSearchResult,//删除安全防范-ytt

  qrcodeManagementSearchResult,//二维码列表-ytt
  qrcodeStatisticsSearchResult,//二维码统计-ytt
  qrcodeUnbundlingSearchResult,//二维码解绑-ytt
  qrcodeBindSearchResult,//二维码绑定-ytt
  groupVisitRecordSearchResult,
  houseRoomVisitSearchResult,
  houseRelatedHomeSearchResult,
} from './houseVisitPop'

import {
  groupPicListResult,//组织架构-单位照片-ytt
  deleteGroupPicResult,//组织架构-删除单位照片功能-ytt
} from './groupPicture'

import {
  loginResponse,
  staffResponse,
  navResult,
  gFormCache,
} from './common'

// people
import {
  // visitReqParam,
  peopleCheckSearchResult,
  peopleCheckSearchQuery,
  searchBuildingResult,
  searchRoomResult,
  insertVisitPeopleResult,
  searchCountryResult,
  foreignerInfo,
  insertForeignerResponse,
  visitPeopleResult,
  GlAddressResponse,
  peopleStatisticsResult,

  peopleDetailResult,
  archivesCheckSearchResult,
  updateBasicPeopleDetail,


  //线索记录
  cluePeopleSearchResult,
  clueCarSearchResult,
  clueBikeSearchResult,
  clueUnitSearchResult,
  clueLawSearchResult,
  clueAlarmSearchResult,
  clueSaveHandleResult,
  clueListSearchResult,
  clueUpadteAllResult,
  clueListFromBldResult,
  clueListFromFjResult,
  clueListFromRyResult,
  clueListFromDwResult,
  clueListFromAjResult,
  cluePeopleMesgSearchResult,
  clueLawMesgSearchResult,
  clueAlarmMesgSearchResult,
  clueBikeMesgSearchResult,
  clueCarMesgSearchResult,
  clueUnitMesgSearchResult,
  cluePhotoMesgSearchResult,
  clueDeleteLinkJdcResult,
  clueDeleteLinkDdcResult,
  clueDeleteLinkDwResult,
  clueDeleteLinkRyResult,
  clueDeleteLinkAjResult,
  clueDeleteLinkJqResult,
  clueDetailResult,


  fetchVisitLogResult,

  peoplePunishResule,
  addPunishResult,
  deletePunishResult,
  getPunishItemResult,
  updataPunishResult,
  fetchPeopleNameResult,

} from './people'

import {
  tipListSearchResult,
  tipListSearchQuery,
  intoRoom,

 // tipExportList,


} from './tip'

//rely
import {
  relyListSearchResult,
  relyListSearchQuery,
  relyDetailResult,
  IDcardDetailResult,
  deleteDetailResult,
  exportDataResult,
  addRelyPowerResult,
  exportRelyPowerResult,
} from './rely'

//popRely
import {
  relyBasicResult,
  updateRelyBasicResult,
  relyRewardListResult,
  deleteRelyPeopleReuslt,
  updateRelyBasicTypeResult,
  updateRewardListResult,
  insertRewardListResult,
  deleteRewardListResult,
} from './popRely'

// local
import {
  localListSearchResult,
  localListSearchQuery
} from './local'
// flow
import {
  flowListSearchResult,
  flowListSearchQuery
} from './flow'
// abroad
import {
  abroadListSearchResult,
  abroadListSearchQuery,
  abroadDetailResult
} from './abroad'


//job
import {
    jobListSearchResult,
    jobListSearchQuery,
    peopleDetailsSearchResult,
    peopleDetailsDelete,
    peopleDetailsUpdate,
    peoplePicSearchResult,
} from './job'

//old
import {
    oldListSearchResult,
    oldListSearchQuery,
    oldDetailsResult,
} from './old'




// manage
import {
  userDeptResult,
  userListResult,
  userDetailResult,
  userDetailUpdateResult,
  userAddResult,
  deleteUserResult,
  setUserRoleResult,
  userRoleSetResult,
}from './manage'
import {
  moduleListResult,
  moduleAddResult,
  moduleListSearchQuery,
  moduleDetailResult,
  moduleDetailUpdateResult,
  moduleDeleteResult
}from './setmodule'


import {
  roleListResult,
  roleAddResult,
  roleDetailManagResult,
  roleDetailUpdateResult,
  roleDeleteResult,

  roleModuleListInRoleResult,
  rloeResResult,
  updateRloeResResult,
  rolePeopleResult,
  deleteRolePeopleResult,
}from './setrole'


//单位信息
import {
  companyNowListResult,
  companyOnceListResult,
  companyLegelPersonListResult,
  companyAddListResult,
  companyOnceDeleteResult,
  transSearchListResult,
  companyTransInsertResult,
}from './houseVisitCompany'


import {
  addressInfoResult,
  deletdOwnerResult,
  deletdQrcodeResult,
  deletdHouldNumResult,
  deletdHouseFileResult,
  addOwnerResult,
  addQrcodeResult,
  searchHouseFileResult,
  addHouldNumResult,
  searchHouldNumResult,
  addHouseFileFileResult,
  saveScoreResult,
  saveRoomSelectResult,
}from './houseVisitAddress'

//基础应用-统计
import {
  unitListSearchResult,
  personalListSearchResult,
  personalHistorySearchResult,
}from './appBaseApppop'

//goods
import {
  goodsListSearchResult,//物品列表
  goodsBasicSearchResult,//物品列表-基础信息
  unbundlingGoodsdetailResult,//物品信息解绑
  deleteGoodsDetailResult,//物品信息删除
  editGoodsDetailResult,//物品信息修改
  goodsPhotoListSearchResult,//物品图片数据列表
  addGoodsPhotoResult,//新增物品图片
  deleteGoodsPhotoResult,//删除物品图片
} from './goods'


//household
import {
  householdManagementListSearchResult,//户号管理 ytt
  householdStatisticsListSearchResult,//户号统计 ytt
  unbundlingHouseholdResult,//解绑地址 ytt
  bundlingHouseholdResult,//绑定地址 ytt
} from './household'

//security
import {
  securityListSearchResult,//治安情况-ytt
  securityDetailSearchResult,//治安详情-ytt
  securityAddSearchResult,//治安回访记录新增-ytt
  securityLogListResult,
} from './security'


//组织架构-寄递业
import {
  baseInfoDeliveryResult,
  businessDeliveryResult,
  businessSaveDeliveryResult,
  boxListDeliveryResult,
  boxAddDeliveryResult,
  boxDelDeliveryResult,
  boxOneInfoDeliveryResult,
  boxUpdateDeliveryResult,
  otherDeliveryResult,
  otherSaveDeliveryResult,
}from './groupDeliveryIndustry'

import {
  infoHighlyToxicResult,
  checkboxListHighlyToxicResult,
  updateHighlyToxicResult,
}from './groupHighlyToxic'

import {
  groupControlledKnifeResult,
  groupUpdateControlledKnifeResult,
}from './groupControlledKnife'
//组织机构详情中的建筑工地
import{
  buildingResult,
  bulidingUpdateResult
} from './groupBuildingSites'
//组织详情下的旅馆信息
import{
  hotalResult
} from './groupHotalInformation'
//组织详情下的烟花爆竹从事单位
import {
  fireResult,
  fireUpdateResult
} from './groupFireworksUnit'
//组织详情下的汽车租赁
import {
  areaAddressResult,
  areaAddressAddResult,
  areaAddressDeleteResult,
  rentMessageResult,
  rentMessageAddResult,
  rentMessageDeleteResult
} from './groupCarRentalBusiness'
//组织详情下的酒店式公寓
import {
  ownerMessageResult,
  ownerMessageAddResult,
  ownerMessageDeleteResult,
  renterMessageResult,
  renterMessageAddResult,
  renterMessageDeleteResult
} from './groupServicedApartment'
//组织详情下的物流托运业
import {
  logisticsRoadResult,
  logisticsRoadAddResult,
  logisticsRoadDeleteResult,
  carMessageResult,
  carMessageAddResult,
  carMessageDeleteResult,
  logisticsMsgResult,
  logisticsMsgAddResult,
  logisticsMsgDeleteResult,
} from './groupLogisticsIndustry'

//组织机构-低慢小
import {
  getSmallUnitInfoResult,
  getSmallGoods,
  updateSmallInfo,
  searchSmalByIdnumber,
  searchBindSmalByIdnumber,
  getBindSmalByIdnumber,
  unBindSmalByIdnumber,
  searchSmalDetail,
  saveSmalDetail,
}from './groupSlowlySmallUnit'
//组织机构-检查记录
import {
  getCheckRecordResult,
  insertCheckRecordResult,
}from './groupCheckRecord'
//组织机构-处罚记录
import {
  getPunishRecordResul,
  insertPunishRecordResult,
  queryCfjlDetailResult,
  deleteCfjlDetailResult,
}from './groupPunishRecord'
//组织机构-从业人员
import {
  getQueryAllCyryResult,
}from './groupEmployee'
//实时警力
import {
  policeListSearchResult,
  policeDetailSearchResult,
  updateDetailSearchResult,
  policeSendMsgSearchResult,
  policeSendWXSearchResult
} from  "./police"

//工作任务
import {
  taskListSearchResult,
  taskDeletetSearchResult,
  taskDetailSearchResult,
  childTaskListSearchResult,
  taskAddSearchResult

} from "./task"

//社会申报
import {
  allDeclareListSearchResult,
  declareCountSearchResult,
  updateSblbSearchResult,
  bindSblbSearchResult
} from "./declare"

//档案号管理
import {
  fileListSearchResult,
  fileCountSearchResult,
  insertDahSearchResult,
  deleteDahSearchResult
} from "./file"

//爆破单位
import {
  blastingUnitResult,
  blastingStoreResult,
  blastingProjectResult,
} from "./groupBlastingUnit"

const rootReducer = combineReducers({
  routing,
  config: (state = {}) => state,
  tabListResult,

  loginResponse,
  staffResponse,
  navResult,
  gFormCache,
  // addressStatisticsSearchResult,
  houseCheckSearchResult,
  houseCheckSearchQuery,
  houseDetailResult,
  //黄建停--room请求
  roomCheckSearchResult,
  searchAddressResult,
  saveFloorsResult,
  fetchFloorsResult,
  deleteFloorsRoomResult,
  addFloorsRoomResult,
  updataFloorsRoomResult,
  updataFloorsUniteResult,
  policeStationResult,
  publicStationResult,
  AreaResult,
  countryResult,
  streetResult,
  roadResult,
  houseMarkResult,
  houseMarkNameResult,
  addressSubmitResult,
  fetchVisitConResult,
  fetchBuildingCountResult,
  fetchUniteCountResult,
  fetchBuildgingLogResult,
  fetchRoomLogResult,
  buildingCountsResult,
  roomCountsResult,
  roomNameResult,

  tipListSearchResult,
  tipListSearchQuery,
  searchBuildingResult,
  searchRoomResult,
  intoRoom,
  // tipExportList,

  departmentListResult,

  statisticsResult,
  searchResultByDepartmentName,
  searchResultByBusinessCode,
  searchResultByLegalPerson,
  addDepartmentResult,
  exeTransferFileResult,
  
  departmentDetailInfo,

  departmentDetailInfo,

  incidenceConditionList,
  incidenceConditionDetail,
  addGunUnitInfoResponse,
  gunUnitTypeList,
  gunUnitPropList,
  blastingUnitResult,
  blastingStoreResult,
  blastingProjectResult,


  getGroupEmployeeInfo,
  searchGroupPunishRecord,
  addGroupPunishRecord,
  getGroupPunishRecordDetail,
  searchGroupFireMessage,
  updateGroupFireMessage,
  searchGroupFireEquipment,
  updateGroupFireEquipment,
  fetchDepartmentLogResult,
  fetchDepartmentNameResult,

  picListResult,
  savePicItemResponse,
  deletePicItemResponse,
  uploadPicResponse,
  AllPicResult,

  // visitReqParam,
  peopleCheckSearchResult,
  peopleCheckSearchQuery,
  insertVisitPeopleResult,
  searchCountryResult,
  foreignerInfo,
  insertForeignerResponse,
  visitPeopleResult,
  GlAddressResponse,
  peopleStatisticsResult,

  peopleDetailResult,
  archivesCheckSearchResult,
  updateBasicPeopleDetail,
  fetchVisitLogResult,
  peoplePunishResule,
  addPunishResult,
  deletePunishResult,
  getPunishItemResult,
  updataPunishResult,
  fetchPeopleNameResult,

  localListSearchResult,
  localListSearchQuery,
  flowListSearchResult,
  flowListSearchQuery,
  abroadListSearchResult,
  abroadListSearchQuery,
  abroadDetailResult,


  jobListSearchResult,
  jobListSearchQuery,
  peopleDetailsSearchResult,
  peopleDetailsDelete,
  peopleDetailsUpdate,
  peoplePicSearchResult,

  oldListSearchResult,
  oldListSearchQuery,
  oldDetailsResult,
  //rely
  relyListSearchResult,
  relyListSearchQuery,
  relyDetailResult,
  IDcardDetailResult,
  deleteDetailResult,
  exportDataResult,
  addRelyPowerResult,
  exportRelyPowerResult,

  relyBasicResult,
  updateRelyBasicResult,
  deleteRelyPeopleReuslt,
  updateRelyBasicTypeResult,
  relyRewardListResult,
  updateRewardListResult,
  insertRewardListResult,
  deleteRewardListResult,

//房屋地址
  houseAddressDetailSearchResult,
  houseUpdateAddressResult,
  houseUpdateHisStateResult,
  houseDelAddressResult,
  houseAddressCqrAddResult,
  houseAddressCqrDeleteResult,
  houseRelatedbzAddResult,
  houseRelatedbzDeleteResult,
  houseHhResult,
  houseAddBuildHhResult,
  houseDelBuildHhResult,
  houseDahResult,
  houseAddBuildDahResult,
  houseDelBuildDahResult,
  houseBzdzResult,
  houseAddBzdzResult,
  houseDelBzdzResult,
  houseAddBarCodeResult,
  houseDelBarCodeResult,
  houseCombineBuildingResult,
  getLoadOrVillageGroupListByDmResult,
  houseXqFsByIdResult,
  houseUpdateJwdResult,
  getLoadListByDmResult,

//线索记录
  cluePeopleSearchResult,
  clueCarSearchResult,
  clueBikeSearchResult,
  clueUnitSearchResult,
  clueLawSearchResult,
  clueAlarmSearchResult,
  clueSaveHandleResult,
  clueUpadteAllResult,
  clueListFromBldResult,
  clueListFromFjResult,
  clueListFromRyResult,
  clueListFromDwResult,
  clueListFromAjResult,
  cluePeopleMesgSearchResult,
  clueLawMesgSearchResult,
  clueAlarmMesgSearchResult,
  clueBikeMesgSearchResult,
  clueCarMesgSearchResult,
  clueUnitMesgSearchResult,
  cluePhotoMesgSearchResult,
  clueDeleteLinkJdcResult,
  clueDeleteLinkDdcResult,
  clueDeleteLinkDwResult,
  clueDeleteLinkRyResult,
  clueDeleteLinkAjResult,
  clueDeleteLinkJqResult,
  clueDetailResult,

//set-user
  userDeptResult,
  userListResult,
  userDetailResult,
  userDetailUpdateResult,
  userAddResult,
  deleteUserResult,
  setUserRoleResult,
  userRoleSetResult,
  clueListSearchResult,
//set-role
  roleListResult,
  roleAddResult,
  roleDetailManagResult,
  roleDetailUpdateResult,
  roleDeleteResult,

  roleModuleListInRoleResult,
  rloeResResult,
  updateRloeResResult,
  rolePeopleResult,
  deleteRolePeopleResult,

//set-module
  moduleListResult,
  moduleAddResult,
  moduleListSearchQuery,
  moduleDetailResult,

  moduleDetailUpdateResult,
  moduleDeleteResult,

  //实有房屋-房间-地址信息houseVisitAddress
  addressInfoResult,
  deletdOwnerResult,
  deletdQrcodeResult,
  deletdHouldNumResult,
  deletdHouseFileResult,
  addOwnerResult,
  addQrcodeResult,
  searchHouseFileResult,
  addHouldNumResult,
  searchHouldNumResult,
  addHouseFileFileResult,
  saveScoreResult,
  saveRoomSelectResult,
  //houseVisitCompany
  companyNowListResult,
  companyOnceListResult,
  companyLegelPersonListResult,
  companyAddListResult,
  companyOnceDeleteResult,
  transSearchListResult,
  companyTransInsertResult,

  //管辖单位
  unitPoliceStationListResult,
  unitSubStationListResult,
  unitResponseAreaResult,
  unitSubstationRelDivisionResult,
  unitEditRelationOfDivisionResult,
  responseAreaAddResult,
  responseAreaUpdateResult,
  responseAreaPoliceResult,
  policeListResult,
  policeAddResult,
  responsePoliceDeleteResult,
  responseAddressResult,
  cognateAddressListResult,
  addAddressResult,
  responseAddressDeleteResult,
  //行政区划
  getDivisionRelUnitResult,
  updateDivisionRelUnitResult,
  getLoadOrVillageGroupListResult,
  getAreaAddressListResult,
  //申报管理
  countyListSearchResult,
  streetListSearchResult,
  villageCommitteeListSearchResult,
  commonListSearchResult,
  villageListSearchResult,
  addDeclarResult,
  updateDeclarResult,
  deleteDeclarResult,
  passDeclarResult,


  searchAddressStatisticsList,

//基础应用-统计
  unitListSearchResult,
  personalListSearchResult,
  personalHistorySearchResult,

  moduleDeleteResult,

  registerFullNameSearchResult,//房屋全程
  registerListSearchResult,//人员详情-登记、居住
  registerPopStatusChangeResult,//人口详情-登记/居住人员状态改变
  registerBindRoomOrDzResult,//绑定访查人员

  registerOnceListSearchResult,//人员详情-曾登记、居住
  registerOnceDeletePopSearchResult,//曾登记/居住的删除人员接口
  cardHolderListSearchResult,//人员详情-门禁卡持有人
  declareListSearchResult,//人员详情-社会申报
  sysRegisterListSearchResult,//人员详情-系统登记入口
  //addSafeKeepListSearchResult,//新增安全防范列表

  addSafeKeepSearchResult,//新增安全防范-ytt
  updateSafeKeepSearchResult,//修改安全防范-ytt
  safeKeepListSearchResult,//安全防范列表-ytt
  safeKeepDetailSearchResult,//查询安全防范详情-ytt
  deleteSafeKeepSearchResult,//删除安全防范-ytt

  qrcodeManagementSearchResult,//二维码列表-ytt
  qrcodeStatisticsSearchResult,//二维码统计-ytt
  qrcodeUnbundlingSearchResult,//二维码解绑-ytt
  qrcodeBindSearchResult,//二维码绑定-ytt
  groupVisitRecordSearchResult,
  houseRoomVisitSearchResult,
  houseRelatedHomeSearchResult,


  goodsListSearchResult,//物品列表
  goodsBasicSearchResult,//物品列表-基础信息
  unbundlingGoodsdetailResult,//物品信息解绑
  deleteGoodsDetailResult,//物品信息删除
  editGoodsDetailResult,//物品信息修改
  goodsPhotoListSearchResult,//物品图片数据列表
  addGoodsPhotoResult,//新增物品图片
  deleteGoodsPhotoResult,//删除物品图片

  householdManagementListSearchResult,//户号管理 ytt
  householdStatisticsListSearchResult,//户号统计 ytt
  unbundlingHouseholdResult,//解绑地址 ytt
  bundlingHouseholdResult,//绑定地址 ytt

  securityListSearchResult,//治安情况-ytt
  securityDetailSearchResult,//治安详情-ytt
  securityAddSearchResult,//治安回访记录新增-ytt
  securityLogListResult,
  //组织架构-寄递业

  baseInfoDeliveryResult,
  businessDeliveryResult,
  businessSaveDeliveryResult,
  boxListDeliveryResult,
  boxAddDeliveryResult,
  boxDelDeliveryResult,
  boxOneInfoDeliveryResult,
  boxUpdateDeliveryResult,
  otherDeliveryResult,
  otherSaveDeliveryResult,

//组织架构-groupHighlyToxic

  infoHighlyToxicResult,
  checkboxListHighlyToxicResult,
  updateHighlyToxicResult,

  //组织架构-groupControlledKnife

  groupControlledKnifeResult,
  groupUpdateControlledKnifeResult,
  //组织机构详情中建筑工地
  buildingResult,
  bulidingUpdateResult,
  //组织详情中的旅馆信息
  hotalResult,
  //组织详情中的烟花爆竹从事单位
  fireResult,
  fireUpdateResult,
  //组织详情中的汽车租赁
  areaAddressResult,
  areaAddressAddResult,
  areaAddressDeleteResult,
  rentMessageResult,
  rentMessageAddResult,
  rentMessageDeleteResult,
  //组织详情中的酒店式公寓
  ownerMessageResult,
  ownerMessageAddResult,
  ownerMessageDeleteResult,
  renterMessageResult,
  renterMessageAddResult,
  renterMessageDeleteResult,
  //组织详情中的物流托运业
  logisticsRoadResult,
  logisticsRoadAddResult,
  logisticsRoadDeleteResult,
  carMessageResult,
  carMessageAddResult,
  carMessageDeleteResult,
  logisticsMsgResult,
  logisticsMsgAddResult,
  logisticsMsgDeleteResult,

  //组织 详情 低慢小
  getSmallUnitInfoResult,
  getSmallGoods,
  updateSmallInfo,
  searchSmalByIdnumber,
  searchBindSmalByIdnumber,
  getBindSmalByIdnumber,
  unBindSmalByIdnumber,
  searchSmalDetail,
  saveSmalDetail,
  getCheckRecordResult,
  insertCheckRecordResult,
  getPunishRecordResul,
  insertPunishRecordResult,
  queryCfjlDetailResult,
  deleteCfjlDetailResult,
  getQueryAllCyryResult,
  //实时警力
  policeListSearchResult,
  policeDetailSearchResult,
  updateDetailSearchResult,
  policeSendMsgSearchResult,
  policeSendWXSearchResult,

  //工作任务
  taskListSearchResult,
  taskDeletetSearchResult,
  taskDetailSearchResult,
  taskAddSearchResult,
  childTaskListSearchResult,

  //社会申报
  allDeclareListSearchResult,
  declareCountSearchResult,
  updateSblbSearchResult,
  bindSblbSearchResult,

  //档案号管理
  fileListSearchResult,
  fileCountSearchResult,
  insertDahSearchResult,
  deleteDahSearchResult,
  caseMsgSearchResult,//发案情况的列表
  caseMsgDetailResult,//发案情况的详情
  caseMsgAddResult,
  caseMsgDeleteResult,
  updateCaseMsgResult,
  groupPicListResult,//组织架构-单位照片-ytt
  deleteGroupPicResult,//组织架构-删除单位照片功能-ytt
});

export default rootReducer;
