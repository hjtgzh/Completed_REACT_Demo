import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'

//获取工作任务列表
const taskListResultState = {
  pageCount: 0,
  pageSize: 10,
}
export const taskListSearchResult = handleActions({
  'request taskList list'(state, action) {
    return { ...state, loading: false }
  },
  'receive taskList list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res, loading: false }
  },
}, taskListResultState)


//删除工作任务
const taskDeleteResultState = {
  list: []
}
export const taskDeletetSearchResult = handleActions({
  'request taskDelete list'(state, action) {
    return { ...state, loading: false }
  },
  'receive taskDelete list'(state, action){
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, taskDeleteResultState)




//获取工作任务详情
const taskDetailResultState = {
  list: []
}
export const taskDetailSearchResult = handleActions({
  'request taskDetail list'(state, action) {
    return { ...state, loading: false }
  },
  'receive taskDetail list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res, loading: false }
  },
}, taskDetailResultState)

//获取子任务列表
const childTaskListResultState = {
  list: []
}
export const childTaskListSearchResult = handleActions({
  'request childTaskList list'(state, action) {
    return { ...state, loading: false }
  },
  'receive childTaskList list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res, loading: false }
  },
}, taskDetailResultState)

//新增工作任务
const addDetailResultState = {
  list: []
  
}
export const taskAddSearchResult = handleActions({
  'request taskDetail list'(state, action) {
    return { ...state, loading: false }
  },
  'receive taskDetail list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, addDetailResultState)
