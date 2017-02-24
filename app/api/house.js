import { ajax } from 'utils'

export const houseCheckList = ajax.fetchJSONByPost('/jcjw/building/getTotalBuilding')
export const houseDetail = ajax.fetchJSONByPost('/house/detail')
export const fetchFloorsTree = ajax.fetchJSONByPost('/jcjw/room/queryAllRooms')//获取房屋列表
export const saveFloorsTree = ajax.fetchJSONByPost('/jcjw/room/insertRooms')//保存房屋信息
export const deleteFloorsRoom = ajax.fetchJSONByPost('/jcjw/room/deleteRoom')//删除房间
export const addFloorsRoom = ajax.fetchJSONByPost('/jcjw/room/saveOneRoom')//新增房间
export const updataFloorsRoom = ajax.fetchJSONByPost('/jcjw/room/changeRoomName')//修改房间信息
export const updataFloorsUnite = ajax.fetchJSONByPost('/jcjw/room/changeUniteName')//修改单元信息
export const deleteFloorsUnite = ajax.fetchJSONByPost('/jcjw/room/delUnite')//删除单元信息

export const fetchVisitContent = ajax.fetchJSONByPost('/jcjw/room/queryFcAllRooms')//获取访查信息
export const fetchVisitBuildingCount = ajax.fetchJSONByPost('/jcjw/room/getBuildingByUnite')//获取楼幢统计数据
export const fetchVisitUniteCount = ajax.fetchJSONByPost('/jcjw/room/queryFcAllRoomsByBlidDy')//获取单元统计数据
export const fetchBuildingLog = ajax.fetchJSONByPost('/jcjw/sys/log/getBuildingCzList')//获取地址访查日志

//获取智能访查地址的信息--黄建停
export const fetchAddressResult = ajax.fetchJSONByPost('/jcjw/building/getAddressByName')
//获取分局）列表--黄建停
export const fetchPublicResult = ajax.fetchJSONByPost('/jcjw/building/getGxdw')
//获取派出所（管辖单位）列表--黄建停
export const fetchPoliceResult = ajax.fetchJSONByPost('/jcjw/building/getGxdw')
//获取 行政区划 列表--黄建停
export const fetchAreaResult = ajax.fetchJSONByPost('/jcjw/building/getXzqh')
//获取 区县 列表--黄建停
export const fetchCountryResult = ajax.fetchJSONByPost('/jcjw/building/getXzqh')
//获取 街道 列表--黄建停
export const fetchStreetResult = ajax.fetchJSONByPost('/jcjw/building/getXzqh')
//获取 道路 列表--黄建停
export const fetchRoadResult = ajax.fetchJSONByPost('/jcjw/czdlxq/getByCjwhId')
//获取小区标志物列表--黄建停
export const fetchHouseMarkResult = ajax.fetchJSONByPost('/jcjw/czdlxq/getByCjwhId')
//获取小区标志物别称列表--黄建停
export const fetchHouseMarkNameResult = ajax.fetchJSONByPost('/jcjw/fsqy/getByXqId')
//新增地址提交--黄建停
export const fetchAddressSubmitResult = ajax.fetchJSONByPost('/jcjw/building/insertBuilding')
//获取room列表--黄建停
export const roomCheckList = ajax.fetchJSONByPost('/jcjw/room/getTotalRoom')
//房间-访查日志
export const fetchRoomLog = ajax.fetchJSONByPost('/jcjw/sys/log/getRoomCzList')
//地图-地址详情
export const fetchMapBuildingCount = ajax.fetchJSONByPost('/jcjw/link/countByBldId')
//地图-房间详情
export const fetchMapRoomCount = ajax.fetchJSONByPost('/jcjw/link/countByRoomId')
//获取 实有房屋地址头部
export const fetchBuildingCounts = ajax.fetchJSONByPost('/jcjw/search/buildingCounts')
//获取 实有房屋room头部
export const fetchRoomCounts = ajax.fetchJSONByPost('/jcjw/room/getRoomCounts')
//获取房屋名称
export const fetchRoomName = ajax.fetchJSONByPost('/jcjw/building/getBzdzByBuildingId')
