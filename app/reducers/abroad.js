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

export const abroadListSearchResult = handleActions({
  'request abroad list'(state, action) {
    return {...state, loading: false}
  },
  'receive abroad list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, listResultState)

const queryResultState = () => ({
  keyword: {value: ''},
  institutions: {value: ''},
  division: {value: ''}
})

export const abroadListSearchQuery = handleActions({
  'update abroadList search query'(state, action) {
    return {...state, ...action.payload}
  },
  'reset abroadList search query'(state, action) {
    return {...queryResultState()}
  },
}, queryResultState())


const detailResultState = {
  allowRole: {},
  shopInfo: {},
}
export const abroadDetailResult = handleActions({
  'request abroad detail'(state, action) {
    return {...state, loading: false}
  },
  'receive abroad detail'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, detailResultState)