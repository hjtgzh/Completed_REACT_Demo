//人员访查提醒
import {
  createAction,
} from 'redux-actions'
import {
  groupBuildingSites
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取building的信息
export const requestBuildingList= createAction('request building list');
export const recevieBuildingList = createAction('receive building list');
export const fetchBuildingMessage= createAjaxAction(
	groupBuildingSites.buildingMessage,
	requestBuildingList, 
	recevieBuildingList
);
export const requestBuildingUpdate= createAction('request building update');
export const recevieBuildingUpdate = createAction('receive building update');
export const fetchSaveBuilding= createAjaxAction(
	groupBuildingSites.buildingUpdate,
	requestBuildingUpdate, 
	recevieBuildingUpdate
);
