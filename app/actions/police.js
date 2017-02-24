//实时警力
import {
  createAction,
} from 'redux-actions'
import { police } from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取警员列表的action
export const requestPoliceList= createAction('request polList list')//请求之前的状态
export const receviePoliceList = createAction('receive polList list')//请求之后的状态后
export const fetchPoliceList= createAjaxAction(
	police.policeList,//接口路径
	requestPoliceList, 
	receviePoliceList
)

// 警员详情信息的action
export const requestPoliceDetail= createAction('request policeDetail list')//请求之前的状态
export const receviePoliceDetail = createAction('receive policeDetail list')//请求之后的状态后
export const fetchPoliceDetail= createAjaxAction(
	police.policeDetail,//发送短信接口路径
	requestPoliceDetail, 
	receviePoliceDetail
)
// 修改警员详情信息的action
export const requestUpdatePoliceDetail= createAction('request updateDetail list')//请求之前的状态
export const recevieUpdatePoliceDetail = createAction('receive updateDetail list')//请求之后的状态后
export const fetchUpdatePoliceDetail= createAjaxAction(
	police.updatePoliceDetail,//发送短信接口路径
	requestUpdatePoliceDetail, 
	recevieUpdatePoliceDetail
)

// 发送短信的action
export const requestPoliceSendMsg= createAction('request sendMsg list')//请求之前的状态
export const receviePoliceSendMsg = createAction('receive sendMsg list')//请求之后的状态后
export const fetchPoliceSendMsg= createAjaxAction(
	police.policeSendMsg,//发送短信接口路径
	requestPoliceSendMsg, 
	receviePoliceSendMsg
)

// 发送微信的action
export const requestPoliceSendWX= createAction('request sendWX list')//请求之前的状态
export const receviePoliceSendWX = createAction('receive sendWX list')//请求之后的状态后
export const fetchPoliceSendWX= createAjaxAction(
	police.policeSendWX,//发送短信接口路径
	requestPoliceSendWX, 
	receviePoliceSendWX
)