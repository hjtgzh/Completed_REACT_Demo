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

export const flowListSearchResult = handleActions({
  'request flow list'(state, action) {
    return {...state, loading: true}
  },
  'receive flow list'(state, action) {
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

export const flowListSearchQuery = handleActions({
  'update flow search query'(state, action) {
    return {...state, ...action.payload}
  },
  'reset flow search query'(state, action) {
    return {...queryResultState()}
  },
}, queryResultState())

