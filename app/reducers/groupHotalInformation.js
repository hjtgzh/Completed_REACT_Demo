import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'


const  hotalResultState = {
  list: [],
}
//获取旅馆信息
export const  hotalResult = handleActions({
  'request hotalMessage list'(state, action) {
    return {...state, loading: true}
  },
  'receive hotalMessage list'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, hotalResultState)