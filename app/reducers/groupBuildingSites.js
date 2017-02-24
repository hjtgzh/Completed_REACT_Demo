import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'


const buildingResultState = {
  list: [],
}
//建筑工地信息的查找
export const buildingResult = handleActions({
  'request building list'(state, action) {
    return {...state, loading: true}
  },
  'receive building list'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, buildingResultState)
//建筑工地信息的更新
const bulidingUpdateResultState  = () => ({  })
export const bulidingUpdateResult = handleActions({
  'request building update'(state, action) {
    return {...state, loading: false}
  },
  'receive building update'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, bulidingUpdateResultState)