import {
  createAction,
} from 'redux-actions'
import {
  popRely,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取详情基本信息的action
export const requestBasicList = createAction('request basic info')
export const recevieBasicList = createAction('receive basic info')
export const fetchBasicInfo = createAjaxAction(
	popRely.relyBasicInfo,
	requestBasicList,
	recevieBasicList
)
// 更新详情基本信息表单的action
export const requestBasicformQuery  = createAction('request rely basic form query')
export const recevieBasicformQuery = createAction('recevie rely basic form query')
export const updateBasicForm = createAjaxAction(
	popRely.updateBasicForm,
	requestBasicformQuery,
	recevieBasicformQuery
)

// 更新详情基本信息类型的action
export const requestBasicTypeQuery  = createAction('request rely basic type query')
export const recevieBasicTypeQuery = createAction('recevie rely basic type query')
export const updateType = createAjaxAction(
	popRely.updateType,
	requestBasicformQuery,
	recevieBasicformQuery
)

// 依靠力量删除的action
export const requestDeletePeople  = createAction('request rely delete people')
export const recevieDeletePeople = createAction('recevie rely delete people')
export const deleteRelyPeople = createAjaxAction(
	popRely.deleteRelyPeople,
	requestDeletePeople,
	recevieDeletePeople
)

// 获取详情奖惩信息的action
export const requestRewardList = createAction('request rely reward list')
export const recevieRewardList = createAction('receive rely reward list')
export const fetchRewardList = createAjaxAction(
	popRely.relyRewardList,
	requestRewardList,
	recevieRewardList
)

// 详情奖惩信息修改的action
export const requestRewardListUpdate = createAction('request rely reward list update')
export const recevieRewardListUpdate = createAction('receive rely reward list update')
export const updateRewardList = createAjaxAction(
	popRely.updateRewardList,
	requestRewardListUpdate,
	recevieRewardListUpdate
)

// 详情奖惩信息添加的action
export const requestRewardListInsert = createAction('request rely reward list insert')
export const recevieRewardListInsert = createAction('receive rely reward list insert')
export const insertRewardList = createAjaxAction(
	popRely.insertRewardList,
	requestRewardListInsert,
	recevieRewardListInsert
)

// 详情奖惩信息删除的action
export const requestRewardListDelete = createAction('request rely reward list delete')
export const recevieRewardListDelete = createAction('receive rely reward list delete')
export const deleteRewardList = createAjaxAction(
	popRely.deleteRewardList,
	requestRewardListDelete,
	recevieRewardListDelete
)

// 获取详情基本信息表单的action
export const requestBasicform = createAction('request basic form detail')
export const recevieBasicform = createAction('receive basic form detail')
export const fetchBasicform = createAjaxAction(popRely.relyBasicFormDetail, requestBasicform, recevieBasicform)