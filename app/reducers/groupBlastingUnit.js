import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'


const blastingUnitState = {}

export const blastingUnitResult = handleActions({
  'request blasting unit'(state, action) {
    return { ...state, loading: true }
  },
  'receive blasting unit'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, blastingUnitState)

const blastingStoreState = {}

export const blastingStoreResult = handleActions({
  'request blasting store'(state, action) {
    return { ...state, loading: true }
  },
  'receive blasting store'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, blastingStoreState)

// 获取爆破项目列表
const blastingProjectState = {
	list:[]
}

export const blastingProjectResult = handleActions({
  'request blasting project'(state, action) {
    return { ...state, loading: true }
  },
  'receive blasting project'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { list:res.data, loading: false }
  },
}, blastingProjectState)
