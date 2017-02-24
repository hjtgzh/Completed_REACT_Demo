/**
 * Created by 余金彪 on 2017/1/5.检查记录
 */
import {handleActions} from 'redux-actions'
import {hasResponseError} from 'utils'
// import moment from 'moment'
import {message} from 'antd'

//获取检查记录详情
const getPunishRecordResultState = {}
export const getPunishRecordResul = handleActions({
  'request punishRecord'(state, action) {
    return {...state, loading: true}
  },
  'receive punishRecord'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const {req, res} = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res, loading: false}
  },
}, getPunishRecordResultState)

//新增检查记录
const insertPunishRecordResultState = {}
export const insertPunishRecordResult = handleActions({
  'request insertPunishRecord'(state, action) {
    return {...state, loading: true}
  },
  'receive insertPunishRecord'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const {req, res} = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res, loading: false}
  },
}, insertPunishRecordResultState)

//单位处罚记录查询详情
const queryCfjlDetailResultState = {}
export const queryCfjlDetailResult = handleActions({
  'request queryCfjlDetail'(state, action) {
    return {...state, loading: true}
  },
  'receive queryCfjlDetail'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const {req, res} = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res, loading: false}
  },
}, queryCfjlDetailResultState)

//单位处罚记录删除
const deleteCfjlDetailResultState = {}
export const deleteCfjlDetailResult = handleActions({
  'request queryCfjlDetail'(state, action) {
    return {...state, loading: true}
  },
  'receive queryCfjlDetail'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const {req, res} = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res, loading: false}
  },
}, deleteCfjlDetailResultState)