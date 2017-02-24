
import {
    createAction,
} from 'redux-actions'
import {
    old,
} from 'api'
import {
    createAjaxAction,
} from 'utils'

// 获取房屋列表的action
export const requestOldListList = createAction('request oldList list');
export const recevieOldListList = createAction('receive oldList list');
export const fetchOldListList = createAjaxAction(
    old.oldListList,
    requestOldListList,
    recevieOldListList
);
// 房屋列表更新以及重置的action
export const updateOldListListQuery  = createAction('update oldList search query', payload => payload);
export const resetOldListListQuery = createAction('reset oldList search query');

// 获取建筑物详情的action
export const requestOldDetails = createAction('request old details')
export const recevieOldDetails = createAction('receive old details')
export const fetchOldDetails = createAjaxAction(old.oldDetails, requestOldDetails, recevieOldDetails)
