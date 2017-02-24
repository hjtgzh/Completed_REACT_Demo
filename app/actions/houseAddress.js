//地址管理的接口
import {
  createAction,
} from 'redux-actions'
import {
  houseAddress,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

/*
* 管辖单位
* */
//获取管辖单位分局的列表
export const requestUnitSubStationList=createAction('request unitSubStationList list')
export const receiveUnitSubStatioonList=createAction('receive unitSubStationList list')
export const fetchUnitSubStationList=createAjaxAction(
    houseAddress.unitStationList,
    requestUnitSubStationList,
    receiveUnitSubStatioonList
)
//获取管辖单位派出所的列表
export const requestUnitPoliceStationList=createAction('request unitPoliceStationList list')
export const receiveUnitPoliceStatioonList=createAction('receive unitPoliceStationList list')
export const fetchUnitPoliceStationList=createAjaxAction(
    houseAddress.unitStationList,
    requestUnitPoliceStationList,
    receiveUnitPoliceStatioonList
)
//获取管辖单位责任区列表
export const requestUnitResponseArea=createAction('request unitResponseAreaList list')
export const receiveUnitResponseArea=createAction('receive unitResponseAreaList list')
export const fetchUnitResponseAreaList=createAjaxAction(
    houseAddress.unitStationList,
    requestUnitResponseArea,
    receiveUnitResponseArea
)
//获取分局对应的管辖单位列表
export const requestUnitSubstationRelDivision=createAction('request UnitSubstationRelDivision list')
export const receiveUnitSubstationRelDivision=createAction('receive UnitSubstationRelDivision list')
export const fetchUnitSubstationRelDivision=createAjaxAction(
    houseAddress.unitGetRelateDivisionList,
    requestUnitSubstationRelDivision,
    receiveUnitSubstationRelDivision
)

//修改管辖单位和行政区划关联关系
export const requestUnitEditRelationOfDivision=createAction('request UnitEditRelationOfDivision list')
export const receiveUnitEditRelationOfDivision=createAction('receive UnitEditRelationOfDivision list')
export const fetchUnitEditRelationOfDivision=createAjaxAction(
    houseAddress.unitEditRelationOfDivision,
    requestUnitEditRelationOfDivision,
    receiveUnitEditRelationOfDivision
)
//新增责任区
export const requestResponseAreaAdd=createAction('request responseArea insert')
export const receiveResponseAreaAdd=createAction('receive responseArea insert')
export const fetchResponseAreaAdd=createAjaxAction(
    houseAddress.responseAreaAdd,
    requestResponseAreaAdd,
    receiveResponseAreaAdd
)
//修改责任区
export const requestResponseAreaUpdate=createAction('request responseArea update')
export const receiveResponseAreaUpdate=createAction('receive responseArea update')
export const fetchResponseAreaUpdate=createAjaxAction(
    houseAddress.responseAreaUpdate,
    requestResponseAreaUpdate,
    receiveResponseAreaUpdate
)
//查看责任区民警
export const requestResponseAreaPolice=createAction('request responseAreaPolice list')
export const receiveResponseAreaPolice=createAction('receive responseAreaPolice list')
export const fetchResponseAreaPolice=createAjaxAction(
    houseAddress.responseAreaPoliceList,
    requestResponseAreaPolice,
    receiveResponseAreaPolice
)
//查看责任区可以添加的警员列表
export const requestPoliceList=createAction('request policeList list')
export const receivePoliceList=createAction('receive policeList list')
export const fetchPoliceList=createAjaxAction(
    houseAddress.policeList,
    requestPoliceList,
    receivePoliceList
)
//警员的新增
export const  requestAddPolice=createAction('request police insert')
export const  receiveAddPolice=createAction('receive police insert')
export const  fetchAddPolcie=createAjaxAction(
    houseAddress.addPolice,
    requestAddPolice,
    receiveAddPolice
)
//责任区民警的删除
export const requestDeleteResponsePolice=createAction('request responsePolice delete')
export const receiveDeleteResponsePolice=createAction('receive responsePolice delete')
export const fetchDeleteResponsePolice=createAjaxAction(
    houseAddress.deleteResponsePolice,
    requestDeleteResponsePolice,
    receiveDeleteResponsePolice
)
//查看责任区地址关联
export const requestResponseAddress=createAction('request responseAddress list ')
export const receiveResponseAddress=createAction('receive responseAddress list')
export const fetchResponseAddress=createAjaxAction(
    houseAddress.responseAddress,
    requestResponseAddress,
    receiveResponseAddress
)
//查看责任区需要添加的关联地址列表
export const requestCognateAddressList=createAction('request cognateAddressList list ')
export const receiveCognateAddressList=createAction('receive cognateAddressList list')
export const fetchCognateAddressList=createAjaxAction(
    houseAddress.responseAddress,
    requestCognateAddressList,
    receiveCognateAddressList
)
//关联地址的新增
export const  requestAddAddress=createAction('request addAddress insert')
export const  receiveAddAddress=createAction('receive addAddress insert')
export const  fetchAddAddress=createAjaxAction(
    houseAddress.addAddress,
    requestAddAddress,
    receiveAddAddress
)
//责任区关联地址的解除
export const requestDeleteResponseAddress=createAction('request responseAddress delete')
export const receiveDeleteResponseAddress=createAction('receive responseAddress delete')
export const fetchDeleteResponseAddress=createAjaxAction(
    houseAddress.deleteResponseAddress,
    requestDeleteResponseAddress,
    receiveDeleteResponseAddress
)
//----------------------------------

/*
* 行政区划
* */

//获取行政区划对应的管辖单位，并标记选中的行政区划
export const requestDivisionRelUnit=createAction('request DivisionRelUnit list')
export const receiveDivisionRelUnit=createAction('receive DivisionRelUnit list')
export const fetchDivisionRelUnit=createAjaxAction(
    houseAddress.getDivisionRelateUnitList,
    requestDivisionRelUnit,
    receiveDivisionRelUnit
)
//修改行政区划对应的管辖单位
export const requestUpdateDivisionRelUnit=createAction('request DivisionRelUnit update')
export const receiveUpdateDivisionRelUnit=createAction('receive DivisionRelUnit update')
export const fetchUpdateDivisionRelUnit=createAjaxAction(
    houseAddress.updateDivisionRelateUnit,
    requestUpdateDivisionRelUnit,
    receiveUpdateDivisionRelUnit
)
//根据村居委会id和类型查询1：道路；3：村组；
export const requestGetLoadOrVillageGroupList=createAction('request LoadOrVillageGroup list')
export const receiveGetLoadOrVillageGroupList=createAction('receive LoadOrVillageGroup list')
export const fetchGetLoadOrVillageGroupList=createAjaxAction(
    houseAddress.loadOrVillageGroupList,
    requestGetLoadOrVillageGroupList,
    receiveGetLoadOrVillageGroupList
)
//根据村居委会id查询街路巷列表(区域地址)
export const requestGetAreaAddressList=createAction('request AreaAddress list')
export const receiveGetAreaAddressList=createAction('receive AreaAddress list')
export const fetchGetAreaAddressList=createAjaxAction(
    houseAddress.areaAddressList,
    requestGetAreaAddressList,
    receiveGetAreaAddressList
)
//--------------------------------------
/*
 * 以下为申报管理接口
 *
 */

//获取分局下区县的列表
export const requestCountyList=createAction('request countyList list');
export const recevieCountyList=createAction('receive countyList list');
export const fetchCountyList=createAjaxAction(
	houseAddress.declarManage,
	requestCountyList,
	recevieCountyList
)
//获取区县下的街道
export const requestStreetList=createAction('request streetList list');
export const recevieStreetList=createAction('receive streetList list');
export const fetchStreetList=createAjaxAction(
	houseAddress.declarManage,
	requestStreetList,
	recevieStreetList
)
//获取街道下的社区，村委会
export const requestVillageCommitteeList=createAction('request villageCommitteeList list');
export const recevieVillageCommitteeList=createAction('receive villageCommitteeList list');
export const fetchVillageCommitteeList=createAjaxAction(
	houseAddress.declarManage,
	requestVillageCommitteeList,
	recevieVillageCommitteeList
)
//获取社区村委会下的道路
export const requestRoadList=createAction('request roadList list');
export const recevieRoadList=createAction('receive roadList list');
export const fetchChildList=createAjaxAction(
	houseAddress.declarManageBranch,
	requestRoadList,
	recevieRoadList
)
//获取附属区苑下小区
export const requestVillageList=createAction('request villageList list');
export const recevieVillageList=createAction('receive villageList list');
export const fetchVillageList=createAjaxAction(
	houseAddress.villageManageBranch,
	requestVillageList,
	recevieVillageList
)
//新增道路-小区-村组-附属区苑
export const requestDeclarAdd = createAction('request addDeclar add')
export const recevieDeclarAdd = createAction('receive addDeclar add')
export const fetchDeclarAdd = createAjaxAction(
	houseAddress.addDeclar,
	requestDeclarAdd,
	recevieDeclarAdd
)
//修改道路-小区-村组-附属区苑
export const requestDeclarUpdate = createAction('request updateDeclar update')
export const recevieDeclarUpdate = createAction('receive updateDeclar update')
export const fetchDeclarUpdate = createAjaxAction(
	houseAddress.updateDeclar,
	requestDeclarUpdate,
	recevieDeclarUpdate
)
//删除道路-小区-村组-附属区苑
export const requestDeclarDelete = createAction('request deleteDeclar delete');
export const recevieDeclarDelete = createAction('receive deleteDeclar delete');
export const fetchDeclarDelete = createAjaxAction(
	houseAddress.deleteDeclar,
	requestDeclarDelete,
	recevieDeclarDelete
);
//通过道路-小区-村组-附属区苑
export const requestDeclarPass = createAction('request passDeclar pass');
export const recevieDeclarPass = createAction('receive passDeclar pass');
export const fetchDeclarPass = createAjaxAction(
	houseAddress.passDeclar,
	requestDeclarPass,
	recevieDeclarPass
);


//地址统计
export const requestAddressStatisticsList = createAction('request AddressList');
export const recevieAddressStatisticsList = createAction('receive AddressList');
export const fetchAddressStatistics = createAjaxAction(
	houseAddress.fetchAddressStatisticsList,
	requestAddressStatisticsList,
	recevieAddressStatisticsList
);