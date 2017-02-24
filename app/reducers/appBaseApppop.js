import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'

const listUnitResultState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 10,
  totalCount: 30,
}

export const unitListSearchResult = handleActions({
  'request apppopUnit list'(state, action) {
    return {...state, loading: false}
  },
  'receive apppopUnit list'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, listUnitResultState)


const listPersonalResultState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 10,
  totalCount: 0,
}

export const personalListSearchResult = handleActions({
  'request apppopPersonal list'(state, action) {
    return {...state, loading: false}
  },
  'receive apppopPersonal list'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, listPersonalResultState)



const historyPersonalResultState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 10,
  totalCount: 0,
}

export const personalHistorySearchResult = handleActions({
  'request apppopPersonal detail'(state, action) {
    return {...state, loading: false}
  },
  'receive apppopPersonal detail'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, historyPersonalResultState)

