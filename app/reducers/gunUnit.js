import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

// 保存枪支单位信息
const saveGunUnitInfoState = {
  data: [],
  status:'1'
}

export const saveGunUnitInfoResponse = handleActions({
  'request save gun unit info'(state, action) {
    return state
  },
  'receive save gun unit info'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state}
    }
    return { ...res.data }
  },
}, saveGunUnitInfoState)

// 获取枪支单位的单位类别
const gunUnitTypeState = []

export const gunUnitTypeList = handleActions({
  'request company type'(state, action) {
    return state
  },
  'receive company type'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return [...state]
    }
    return [...res.data]
  },
}, gunUnitTypeState)

// 获取枪支单位的单位性质
const gunUnitPropState = []

export const gunUnitPropList = handleActions({
  'request company prop'(state, action) {
    return state
  },
  'receive company prop'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return [...state]
    }
    return [...res.data]
  },
}, gunUnitPropState)