import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'

const groupControlledKnifeResultState = () => {}

export const groupControlledKnifeResult = handleActions({
  'request ControlledKnife info'(state, action) {
    return {...state, loading: true}
  },
  'receive ControlledKnife info'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, groupControlledKnifeResultState)



const groupUpdateControlledKnifecResultState = () => {}
export const groupUpdateControlledKnifeResult = handleActions({
  'request ControlledKnife update'(state, action) {
    return {...state, loading: true}
  },
  'receive ControlledKnife update'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return {...state, loading: false}
    }else{
      message.success(res.msg, 3)
    }
    return {...res.data, loading: false}
  },
}, groupUpdateControlledKnifecResultState)