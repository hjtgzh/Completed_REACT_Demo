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

export const moduleListResult = handleActions({
  'request module list'(state, action) {
    return {...state, loading: true}
  },
  'receive module list'(state, action) {
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
})

export const moduleListSearchQuery = handleActions({
  'update moduleList search query'(state, action) {
    return {...state, ...action.payload}
  },
  'reset moduleList search query'(state, action) {
    return {...queryResultState()}
  },
}, queryResultState())


const detailResultState = {
  id: '',
  key: '',
  module: '',
  name: '',
  sort: '',
  type: '',
}
export const moduleDetailResult = handleActions({
  'request module detail'(state, action) {
    return {...state, loading: false}
  },
  'receive module detail'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, detailResultState)


const detailUpdateResultState = {

}
export const moduleDetailUpdateResult = handleActions({
  'request moduleUpdate detail'(state, action) {
    return {...state, loading: false}
  },
  'receive moduleUpdate detail'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, detailUpdateResultState)


const addResultState = {
  rloe: [],
}
export const moduleAddResult = handleActions({
  'request module add'(state, action) {
    return {...state, loading: false}
  },
  'receive module add'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, addResultState)


const moduleDeleteState = () => ({  })
export const moduleDeleteResult = handleActions({
  'request module delete'(state, action) {
    return { ...state, loading: false }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive module delete'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, moduleDeleteState)