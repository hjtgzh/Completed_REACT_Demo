import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'

const listResultState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 10,
  totalCount: 0,
}

export const localListSearchResult = handleActions({
  'request local list'(state, action) {
    return {...state, loading: true}
  },
  'receive local list'(state, action) {
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
})

export const localListSearchQuery = handleActions({
  'update local search query'(state, action) {
    return {...state, ...action.payload}
  },
  'reset local search query'(state, action) {
    return {...queryResultState()}
  },
}, queryResultState())

