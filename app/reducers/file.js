import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

//获取档案号管理列表
const fileResultState = {
  list: [],
}
export const fileListSearchResult = handleActions({
  'request fileList list'(state, action) {
    return { ...state, loading: false }
  },
  'receive fileList list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, fileResultState)

//绑定档案号
const insertDahResultState = {
  list: [],
}
export const insertDahSearchResult = handleActions({
  'request insertDah list'(state, action) {
    return { ...state, loading: false }
  },
  'receive insertDah list'(state, action){
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, insertDahResultState)

//删除档案号
const deleteDahResultState = {
  list: [],
}
export const deleteDahSearchResult = handleActions({
  'request deleteDah list'(state, action) {
    return { ...state, loading: false }
  },
  'receive deleteDah list'(state, action){
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, deleteDahResultState)

//获取档案号统计列表
const fileCountResultState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const fileCountSearchResult = handleActions({
  'request countList list'(state, action) {
    return { ...state, loading: false }
  },
  'receive countList list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res, loading: false }
  },
}, fileCountResultState)

