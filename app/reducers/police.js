import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

//获取警卫员列表
const policeResultState = {//请求数据需要传的参数
  list: [],
  currentPage: 1,
  gxdwid: 330106,
  pageSize: 10,
}
export const policeListSearchResult = handleActions({
  'request polList list'(state, action) {
    return { ...state, loading: true }//请求之前返回的状态
  },
  'receive polList list'(state, action){
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }//请求之后返回的状态
    }
    return { ...res.data, loading: false }
  },
}, policeResultState)

//获取警卫员详情
const policeDetailResultState = {//请求数据需要传的参数
}
export const policeDetailSearchResult = handleActions({
  'request policeDetail list'(state, action) {
    return { ...state, loading: true }//请求之前返回的状态
  },
  'receive policeDetail list'(state, action){
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }//请求之后返回的状态
    }
    return { ...res.data, loading: false }
  },
}, policeDetailResultState)


//修改警员详情
const updateDetailResultState = {//请求数据需要传的参数
}
export const updateDetailSearchResult = handleActions({
  'request updateDetail list'(state, action) {
    return { ...state, loading: true }//请求之前返回的状态
  },
  'receive updateDetail list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }//请求之后返回的状态
    }
    return { ...res.data, loading: false }
  },
}, updateDetailResultState)



//发送信息
const sendMsgResultState = {//请求数据需要传的参数
  list: [],
}
export const policeSendMsgSearchResult = handleActions({
  'request sendMsg list'(state, action) {
    return { ...state, loading: false }//请求之前返回的状态
  },
  'receive sendMsg list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }//请求之后返回的状态
    }
    return { ...res.data, loading: false }
  },
}, sendMsgResultState)


//发送微信
const sendWXResultState = {//请求数据需要传的参数
  list: [],
}
export const policeSendWXSearchResult = handleActions({
  'request sendWX list'(state, action) {
    return { ...state, loading: false }//请求之前返回的状态
  },
  'receive sendWX list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }//请求之后返回的状态
    }
    return { ...res.data, loading: false }
  },
}, sendWXResultState)