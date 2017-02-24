import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'


// 获取案发情况列表
const incidenceConditionListState = {
  list: [
  ]
}

export const incidenceConditionList = handleActions({
  'request incidence condition list'(state, action) {
    return { ...state, loading: true }
  },
  'receive incidence condition list'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, incidenceConditionListState)

// 获取案发情况的详情
const incidenceConditionDetailState = {}

export const incidenceConditionDetail = handleActions({
  'request incidence condition detail'(state, action) {
    return {...state,loading:true}
  },
  'receive incidence condition detail'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state,loading:false }
    }
    return { ...res.data,loading:false }
  },
}, incidenceConditionDetailState)


