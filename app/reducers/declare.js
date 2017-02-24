import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'



// 获取头部每项的统计值
const statisticsState = {}
export const statisticsResult = handleActions({
  'request all retrieval num'(state, action) {
    return {...state,loading:true}
  },
  'receive all retrieval num'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 5)
      return {...state,loading:false}
    }
    return {...res.data,loading:false}
  },
}, statisticsState)


//获取社会申报列表
const declareResultState = {//请求数据需要传的参数
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const allDeclareListSearchResult = handleActions({
  'request decList list'(state, action) {
    return { ...state, loading: false }//请求之前返回的状态
  },
  'receive decList list'(state, action){
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }//请求之后返回的状态
    }
    return { ...res.data, loading: false }
  },
}, declareResultState)


//修改社会申报类型
const updateSblbResultState = {//请求数据需要传的参数
  list: [],
}
export const updateSblbSearchResult = handleActions({
  'request updateSblb list'(state, action) {
    return { ...state, loading: false }//请求之前返回的状态
  },
  'receive updateSblb list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }//请求之后返回的状态
    }
    return { ...res.data, loading: false }
  },
}, updateSblbResultState)


//获取社会申报统计列表
const declareCountResultState = {//请求数据需要传的参数
  list: [],
}
export const declareCountSearchResult = handleActions({
  'request countList list'(state, action) {
    return { ...state, loading: false }//请求之前返回的状态
  },
  'receive countList list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }//请求之后返回的状态
    }
    return { ...res, loading: false }
  },
}, declareCountResultState)


//社会申报入户
const bindSblbResultState = {//请求数据需要传的参数
  list: [],
}
export const bindSblbSearchResult = handleActions({
  'request bindSblb list'(state, action) {
    return { ...state, loading: false }//请求之前返回的状态
  },
  'receive bindSblb list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }//请求之后返回的状态
    }
    return { ...res, loading: false }
  },
}, bindSblbResultState)


