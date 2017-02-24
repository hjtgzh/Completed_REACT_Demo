//社会申报
import {
  createAction,
} from 'redux-actions'
import { declare } from 'api'
import {
  createAjaxAction,
} from 'utils'


// 获取头部搜索数量
export const requestAllRetrievalNum = createAction('request all retrieval num');
export const recevieAllRetrievalNum = createAction('receive all retrieval num');
export const getAllRetrievalNum = createAjaxAction(
	declare.getAllRetrievalNum,
	requestAllRetrievalNum,
	recevieAllRetrievalNum
);

// 获取社会申报列表的action
export const requestDeclareList= createAction('request decList list')//请求之前的状态
export const recevieDeclareList = createAction('receive decList list')
export const fetchDeclareList= createAjaxAction(
	declare.declareList,
	requestDeclareList, 
	recevieDeclareList
)
// 获取申报统计列表的action
export const requestCountList= createAction('request countList list')//请求之前的状态
export const recevieCountList = createAction('receive countList list')
export const fetchCountList= createAjaxAction(
	declare.declareCount,
	requestCountList, 
	recevieCountList
)

// 修改社会申报类型action
export const requestUpdateSblb= createAction('request updateSblb list')//请求之前的状态
export const recevieUpdateSblb = createAction('receive updateSblb list')
export const fetchUpdateSblb= createAjaxAction(
	declare.updateSblb,
	requestCountList,
	recevieCountList
)

// 社会申报入户action
export const requestBindSblb= createAction('request bindSblb list')//请求之前的状态
export const recevieBindSblb = createAction('receive bindSblb list')
export const fetchBindSblb= createAjaxAction(
	declare.bindSblb,
	requestBindSblb,
	recevieBindSblb
)