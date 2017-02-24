import {
  createAction,
} from 'redux-actions'
import {
  household,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

//获取户号管理列表
export const requestHouseholdManagementList = createAction('request household list');
export const recevieHouseholdManagementList = createAction('receive household list');
export const fetchHouseholdManagementList = createAjaxAction(
  household.householdManagementList,
  requestHouseholdManagementList,
  recevieHouseholdManagementList
);

//获取户号统计列表
export const requestHouseholdStatisticsList = createAction('request household detail')
export const recevieHouseholdStatisticsList = createAction('receive household detail')
export const fetchHouseholdStatisticsList = createAjaxAction(
	household.householdStatisticsList, 
	requestHouseholdStatisticsList, 
	recevieHouseholdStatisticsList
);

// 解绑地址
export const requestUnbundlingHousehold = createAction('request unbundling detail')
export const recevieUnbundlingHousehold = createAction('receive unbundling detail')
export const fetchUnbundlingHousehold = createAjaxAction(
	household.unbundlingHousehold, 
	requestUnbundlingHousehold, 
	recevieUnbundlingHousehold
);

// 绑定地址
export const requestBundlingHousehold = createAction('request bundling detail')
export const recevieBundlingHousehold = createAction('receive bundling detail')
export const fetchBundlingHousehold = createAjaxAction(
	household.bundlingHousehold,
	requestBundlingHousehold,
	recevieBundlingHousehold
);
