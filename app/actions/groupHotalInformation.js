//人员访查提醒
import {
  createAction,
} from 'redux-actions'
import {
  groupHotalInformation
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取旅馆的信息
export const requestHotalMessage= createAction('request hotalMessage list');
export const recevieHotalMessage = createAction('receive hotalMessage list');
export const fetchHotalMessage= createAjaxAction(
	groupHotalInformation.hotalMessage,
	requestHotalMessage, 
	recevieHotalMessage
);

