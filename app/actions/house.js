import {
  createAction,
} from 'redux-actions'
import {
  house,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取房屋列表的action
export const requestHouseCheckList = createAction('request houseCheck list');
export const recevieHouseCheckList = createAction('receive houseCheck list');
export const fetchHouseCheckList = createAjaxAction(
	house.houseCheckList,
	requestHouseCheckList,
	recevieHouseCheckList
);
// 房屋列表更新以及重置的action
export const updateHouseCheckListQuery  = createAction('update houseCheck search query', payload => payload);
export const resetHouseCheckListQuery = createAction('reset houseCheck search query');

// 获取建筑物详情的action
export const requestHouseDetail = createAction('request house detail')
export const recevieHouseDetail = createAction('receive house detail')
export const fetchHouseDetail = createAjaxAction(house.houseDetail, requestHouseDetail, recevieHouseDetail)

// 获取房屋action
export const requestFloorsTree = createAction('request floors tree');
export const recevieFloorsTree = createAction('receive floors tree');
export const fetchFloorsTree = createAjaxAction(
	house.fetchFloorsTree, 
	requestFloorsTree, 
	recevieFloorsTree
);

// 保存房屋action
export const requestSaveFloorsTree = createAction('request saveFloors tree');
export const recevieSaveFloorsTree = createAction('receive saveFloors tree');
export const saveFloorsTree = createAjaxAction(
	house.saveFloorsTree, 
	requestSaveFloorsTree, 
	recevieSaveFloorsTree
);
// 删除房间action
export const requestDeleteFloorsRoom = createAction('request deleteFloors room');
export const recevieDeleteFloorsRoom = createAction('receive deleteFloors room');
export const deleteFloorsRoom = createAjaxAction(
	house.deleteFloorsRoom, 
	requestDeleteFloorsRoom, 
	recevieDeleteFloorsRoom
);
//新增房间action
export const requestAddFloorsRoom = createAction('request addFloors room');
export const recevieAddFloorsRoom = createAction('receive addFloors room');
export const addFloorsRoom = createAjaxAction(
	house.addFloorsRoom, 
	requestAddFloorsRoom, 
	recevieAddFloorsRoom
);
//修改房间action
export const requestUpdataFloorsRoom = createAction('request updataFloors room');
export const recevieUpdataFloorsRoom = createAction('receive updataFloors room');
export const updataFloorsRoom = createAjaxAction(
	house.updataFloorsRoom, 
	requestUpdataFloorsRoom, 
	recevieUpdataFloorsRoom
);
//修改单元信息action
export const requestUpdataFloorsUnite = createAction('request updataFloors unite');
export const recevieUpdataFloorsUnite = createAction('receive updataFloors unite');
export const updataFloorsUnite = createAjaxAction(
	house.updataFloorsUnite, 
	requestUpdataFloorsUnite, 
	recevieUpdataFloorsUnite
);
//删除单元action
export const requestDeleteFloorsUnite = createAction('request deleteFloors unite');
export const recevieDeleteFloorsUnite = createAction('receive deleteFloors unite');
export const delFloorsUnite = createAjaxAction(
	house.deleteFloorsUnite, 
	requestDeleteFloorsUnite, 
	recevieDeleteFloorsUnite
);
//获取访查信息
export const requestVisitContent = createAction('request visitContent');
export const recevieVisitContent = createAction('receive visitContent');
export const fetchVisitContent = createAjaxAction(
	house.fetchVisitContent, 
	requestVisitContent, 
	recevieVisitContent
);
//获取楼幢统计值
export const requestVisitBuildingCount = createAction('request visitBuildingCount');
export const recevieVisitBuildingCount = createAction('receive visitBuildingCount');
export const fetchVisitBuildingCount = createAjaxAction(
	house.fetchVisitBuildingCount, 
	requestVisitBuildingCount, 
	recevieVisitBuildingCount
);
//获取单元统计值
export const requestVisitUniteCount = createAction('request visitUniteCount');
export const recevieVisitUniteCount = createAction('receive visitUniteCount');
export const fetchVisitUniteCount = createAjaxAction(
	house.fetchVisitUniteCount, 
	requestVisitUniteCount, 
	recevieVisitUniteCount
);
//获取地址日志
export const requestBuildingLog = createAction('request buildingLog');
export const recevieBuildingLog = createAction('receive buildingLog');
export const fetchBuildingLog = createAjaxAction(
	house.fetchBuildingLog, 
	requestBuildingLog, 
	recevieBuildingLog
);

//获取智能访查地址的信息--黄建停
export const requestSearchAddress = createAction('request searchAddress');
export const recevieSearchAddress = createAction('receive searchAddress');
export const fetchAddressResult = createAjaxAction(
	house.fetchAddressResult, 
	requestSearchAddress, 
	recevieSearchAddress
);
//获取分局列表--黄建停
export const requestPublicStation = createAction('request publicStation');
export const receviePublicStation = createAction('receive publicStation');
export const fetchPublicResult = createAjaxAction(
	house.fetchPublicResult, 
	requestPublicStation, 
	receviePublicStation
);
//获取派出所（管辖单位）列表--黄建停
export const requestPoliceStation = createAction('request policeStation');
export const receviePoliceStation = createAction('receive policeStation');
export const fetchPoliceResult = createAjaxAction(
	house.fetchPoliceResult, 
	requestPoliceStation, 
	receviePoliceStation
);
//获取 行政区划 列表--黄建停
export const requestArea = createAction('request area');
export const recevieArea  = createAction('receive area');
export const fetchAreaResult = createAjaxAction(
	house.fetchAreaResult, 
	requestArea, 
	recevieArea
);
//获取 区县 列表--黄建停
export const requestCountry = createAction('request country');
export const recevieCountry  = createAction('receive country');
export const fetchCountryResult = createAjaxAction(
	house.fetchCountryResult, 
	requestCountry, 
	recevieCountry
);
//获取 街道 列表--黄建停
export const requestStreet = createAction('request street');
export const recevieStreet   = createAction('receive street');
export const fetchStreetResult = createAjaxAction(
	house.fetchStreetResult, 
	requestStreet, 
	recevieStreet
);
//获取 道路 列表--黄建停
export const requestRoad = createAction('request road');
export const recevieRoad   = createAction('receive road');
export const fetchRoadResult = createAjaxAction(
	house.fetchRoadResult, 
	requestRoad, 
	recevieRoad
);
//获取小区标志物列表--黄建停
export const requestHouseMark = createAction('request houseMark');
export const recevieHouseMark   = createAction('receive houseMark');
export const fetchHouseMarkResult = createAjaxAction(
	house.fetchHouseMarkResult, 
	requestHouseMark, 
	recevieHouseMark
);
//获取小区标志物别称列表--黄建停
export const requestHouseMarkName = createAction('request houseMarkName');
export const recevieHouseMarkName   = createAction('receive houseMarkName');
export const fetchHouseMarkNameResult = createAjaxAction(
	house.fetchHouseMarkNameResult, 
	requestHouseMarkName, 
	recevieHouseMarkName
);
//新增地址提交--黄建停
export const requestAddressSubmit = createAction('request addressSubmit');
export const recevieAddressSubmit   = createAction('receive addressSubmit');
export const fetchAddressSubmitResult = createAjaxAction(
	house.fetchAddressSubmitResult, 
	requestAddressSubmit, 
	recevieAddressSubmit
);
// 获取room列表的action--黄建停
export const requestRoomCheckList = createAction('request roomCheck list');
export const recevieRoomCheckList = createAction('receive roomCheck list');
export const fetchRoomCheckList = createAjaxAction(
	house.roomCheckList, 
	requestRoomCheckList, 
	recevieRoomCheckList
);
// room列表更新以及重置的action--黄建停
export const updateRoomCheckListQuery  = createAction('update roomCheck search query', payload => payload);
export const resetRoomCheckListQuery = createAction('reset roomCheck search query');

// 房间-访查日志
export const requestRoomLog = createAction('request roomLog');
export const recevieRoomLog = createAction('receive roomLog');
export const fetchRoomLog = createAjaxAction(
	house.fetchRoomLog, 
	requestRoomLog, 
	recevieRoomLog
);

// 地图地址-详情
export const requestMapBuildingCount = createAction('request mapBuilding count');
export const recevieMapBuildingCount = createAction('receive mapBuilding count');
export const fetchMapBuildingCount = createAjaxAction(
	house.fetchMapBuildingCount, 
	requestMapBuildingCount, 
	recevieMapBuildingCount
);
// 地图房间-详情
export const requestMapRoomCount = createAction('request mapRoom count');
export const recevieMapRoomCount = createAction('receive mapRoom count');
export const fetchMapRoomCount = createAjaxAction(
	house.fetchMapRoomCount, 
	requestMapRoomCount, 
	recevieMapRoomCount
);
//获取 实有房屋地址头部的action
export const requestBuildingCounts = createAction('request building count');
export const recevieBuildingCounts = createAction('receive building count');
export const fetchBuildingCounts = createAjaxAction(
	house.fetchBuildingCounts, 
	requestBuildingCounts, 
	recevieBuildingCounts
);
//获取 实有房屋room头部的action
export const requestRoomCounts = createAction('request room count');
export const recevieRoomCounts = createAction('receive room count');
export const fetchRoomCounts = createAjaxAction(
	house.fetchRoomCounts, 
	requestRoomCounts, 
	recevieRoomCounts
);

//获取 实有房屋名称
export const requestRoomName = createAction('request room name');
export const recevieRoomName = createAction('receive room name');
export const fetchRoomName = createAjaxAction(
	house.fetchRoomName, 
	requestRoomName, 
	recevieRoomName
);