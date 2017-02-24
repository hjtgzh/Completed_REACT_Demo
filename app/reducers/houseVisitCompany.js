import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

const listNowResultState = {
  list: [],
  // currentPage: 1,
  // pageCount: 5,
  // pageSize: 10,
  // totalCount: 50,
}

export const companyNowListResult = handleActions({
  'request companyNow list'(state, action) {
    return { ...state, loading: false }
  },
  'receive companyNow list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listNowResultState)


//获取曾经单位信息
const listOnceResultState = {
  list: [],
  // currentPage: 1,
  // pageCount: 0,
  // pageSize: 20,
  // totalCount: 3,
}
export const companyOnceListResult = handleActions({
  'request companyOnce list'(state, action) {
    return { ...state, loading: false }
  },
  'receive companyOnce list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listOnceResultState)

//获取法人代表
const companyLegelPersonResultState = {
    list: [],
}
export const companyLegelPersonListResult = handleActions({
    'request CompanyLegelPerson list'(state, action) {
        return { ...state, loading: false }
    },
    'receive CompanyLegelPerson list'(state, action) {
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, companyLegelPersonResultState)

const listAddResultState = () =>({})

export const companyAddListResult = handleActions({
  'request companyAdd list'(state, action) {
    return { ...state, loading: false }
  },
  'receive companyAdd list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listAddResultState)


const OnceDeleteResultState = () =>({})

export const companyOnceDeleteResult = handleActions({
  'request companyOnce delete'(state, action) {
    return { ...state, loading: false }
  },
  'receive companyOnce delete'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, OnceDeleteResultState)


const transSearchResultState = () =>({})

export const transSearchListResult = handleActions({
  'request companyTrans search'(state, action) {
    return { ...state, loading: false }
  },
  'receive companyTrans search'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, transSearchResultState)


const listTransInsertResultState = () =>({})

export const companyTransInsertResult = handleActions({
  'request companyTrans insert'(state, action) {
    return { ...state, loading: false }
  },
  'receive companyTrans insert'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listTransInsertResultState)



