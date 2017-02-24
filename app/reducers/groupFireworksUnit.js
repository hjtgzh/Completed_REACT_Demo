import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'


const fireResultState = {
  list: [],
}
//烟花信息信息的查找
export const fireResult = handleActions({
  'request fire list'(state, action) {
    return {...state, loading: true}
  },
  'receive fire list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, fireResultState)
//烟花爆竹信息的更新
const fireUpdateResultState  = () => ({  })
export const fireUpdateResult = handleActions({
  'request fire update'(state, action) {
    return {...state, loading: false}
  },
  'receive fire update'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, fireUpdateResultState)