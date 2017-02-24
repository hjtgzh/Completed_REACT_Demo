/**
 * Created by 余金彪 on 2017/1/7. 从业人员
 */
import {handleActions} from 'redux-actions'
import {hasResponseError} from 'utils'
// import moment from 'moment'
import {message} from 'antd'

//查询单位的从业人员
const getQueryAllCyryResultState = {}
export const getQueryAllCyryResult = handleActions({
  'request queryAllCyry'(state, action) {
    return {...state, loading: true}
  },
  'receive queryAllCyry'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const {req, res} = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res, loading: false}
  },
}, getQueryAllCyryResultState)