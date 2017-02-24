/**
 * Created by 余金彪 on 2017/1/4.检查记录
 */
import {handleActions} from 'redux-actions'
import {hasResponseError} from 'utils'
// import moment from 'moment'
import {message} from 'antd'

//获取检查记录详情
const getCheckRecordResultState = {}
export const getCheckRecordResult = handleActions({
  'request checkRecord'(state, action) {
    return {...state, loading: true}
  },
  'receive checkRecord'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const {req, res} = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res, loading: false}
  },
}, getCheckRecordResultState)

//新增检查记录
const insertCheckRecordResultState = {}
export const insertCheckRecordResult = handleActions({
  'request insertCheckRecord'(state, action) {
    return {...state, loading: true}
  },
  'receive insertCheckRecord'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const {req, res} = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res, loading: false}
  },
}, insertCheckRecordResultState)

