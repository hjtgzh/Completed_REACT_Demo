//人员访查提醒
import {
  createAction,
} from 'redux-actions'
import {
  popTip,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取人员列表的action
export const requestTipList= createAction('request tipList list');
export const recevieTipList = createAction('receive tipList list');
export const fetchTipList= createAjaxAction(
	popTip.tipList,
	requestTipList, 
	recevieTipList
);
// 获取地址列表的action
export const requestBuildingList= createAction('request buildingList list');
export const recevieBuildingList = createAction('receive buildingList list');
export const fetchBuildingResult= createAjaxAction(
	popTip.searchBuilding,
	requestBuildingList, 
	recevieBuildingList
);
// 获取房间列表的action
export const requestRoomList= createAction('request roomList list');
export const recevieRoomList = createAction('receive roomList list');
export const fetchRoomResult= createAjaxAction(
	popTip.searchRoom,
	requestRoomList, 
	recevieRoomList
);
// 关联入户
export const requestInsertAddress=createAction('request insert address')
export const receiveInsertAddress=createAction('receive insert address')
export const intoHouse = createAjaxAction(
	popTip.intoHouse, 
	requestInsertAddress, 
	receiveInsertAddress
);
export const updateTipListQuery  = createAction('update tipList search query', payload => payload);
export const resetTipListQuery = createAction('reset tipList search query');