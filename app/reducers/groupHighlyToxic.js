import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'

const infoHighlyToxicResultState = () => {}

export const infoHighlyToxicResult = handleActions({
  'request highlyToxic info'(state, action) {
    return {...state, loading: true}
  },
  'receive highlyToxic info'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, infoHighlyToxicResultState)


const checkboxListHighlyToxicResultState = () => {}
export const checkboxListHighlyToxicResult = handleActions({
  'request highlyToxic checkbox'(state, action) {
    return {...state, loading: true}
  },
  'receive highlyToxic checkbox'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, checkboxListHighlyToxicResultState)


const updateHighlyToxicResultState = () => {}
export const updateHighlyToxicResult = handleActions({
  'request highlyToxic update'(state, action) {
    return {...state, loading: true}
  },
  'receive highlyToxic update'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return {...state, loading: false}
    }else{
      message.success(res.msg, 3)
    }
    return {...res.data, loading: false}
  },
}, updateHighlyToxicResultState)