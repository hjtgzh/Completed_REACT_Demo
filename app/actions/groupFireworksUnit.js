//烟花爆竹从事单位
import {
  createAction,
} from 'redux-actions'
import {
  groupFireworksUnit
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取building的信息
export const requestFireMessage= createAction('request fire list');
export const recevieFireMessage = createAction('receive fire list');
export const fetchFireMessage= createAjaxAction(
	groupFireworksUnit.fireMessage,
	requestFireMessage, 
	recevieFireMessage
);
export const requestFireUpdate= createAction('request fire update');
export const recevieFireUpdate = createAction('receive fire update');
export const fetchFireUpdate= createAjaxAction(
	groupFireworksUnit.saveMessage,
	requestFireUpdate, 
	recevieFireUpdate
);
