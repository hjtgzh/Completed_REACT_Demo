import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

const listResultState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}

export const relyListSearchResult = handleActions({
  'request relyList list'(state, action) {//debugger
    return { ...state, loading: true }
  },
  'receive relyList list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listResultState)

const queryResultState = () => ({
  keyword: { value: '' },
  division: { value: '' },
  institutions: { value: '' },
  houseStatus: { value: '' },
  addressType: { value: '' },
})

export const relyListSearchQuery = handleActions({
  'update relyList search query'(state, action) {
    return { ...state, ...action.payload }
  },
  'reset relyList search query'(state, action) {
    return { ...queryResultState() }
  },
}, queryResultState())


const detailResultState = {
  allowRole: {},
  shopInfo: {},
}
export const relyDetailResult = handleActions({
  'request rely detail'(state, action) {
    return { ...state, loading: false }
  },
  'receive rely detail'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

export const IDcardDetailResult = handleActions({
  'request IDcard detail'(state, action) {
    // debugger
    return { ...state, loading: false }
  },
  'receive IDcard detail'(state, action) {
    // debugger
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

export const addRelyPowerResult = handleActions({
  'request addRelyPower detail'(state, action) {
    return { ...state, loading: false }
  },
  'receive addRelyPower detail'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

export const deleteDetailResult = handleActions({
  'request delete detail'(state, action) {
    return { ...state, loading: false }
  },
  'receive delete detail'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

export const exportDataResult = handleActions({
  'request exportData detail'(state, action) {
    return { ...state, loading: false }
  },
  'receive exportData detail'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//新增依靠力量里面个人情况--黄建停
const peopleSituationState = {
  RYKT: {},
  TYPE: {},
  errorCode: "",
  extraMsg: "",
  msg: "",
  status: 0
}
export const peopleSituationResult = handleActions({
  'request peopleSituation detail'(state, action) {
    // debugger
    return { ...state, loading: false }
  },
  'receive peopleSituation detail'(state, action) {
    // debugger
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, peopleSituationState)
//导入依靠力量模板的action--黄建停
const exportRelyPowerState = {
  RYKT: {},
  TYPE: {},
  errorCode: "",
  extraMsg: "",
  msg: "",
  status: 0
}
export const exportRelyPowerResult = handleActions({
  'request exportRelyPower detail'(state, action) {
    // debugger
    return { ...state, loading: false }
  },
  'receive exportRelyPower detail'(state, action) {
    // debugger
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, exportRelyPowerState)