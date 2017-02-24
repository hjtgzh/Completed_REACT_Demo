import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'


const areaAddressResultState = {
  list: [],
}

export const areaAddressResult = handleActions({
  'request areaAddress list'(state, action) {
    return {...state, loading: true}
  },
  'receive areaAddress list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, areaAddressResultState)

const addAreaAddress = () => ({  })
export const areaAddressAddResult = handleActions({
  'request areaAddress insert'(state, action) {
    return {...state, loading: false}
  },
  'receive areaAddress insert'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, addAreaAddress)


const areaAddressDeleteState = () => ({  })
export const areaAddressDeleteResult = handleActions({
  'request areaAddress delete'(state, action) {
    return { ...state, loading: false }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive areaAddress delete'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, areaAddressDeleteState)

const rentMessageResultState = {
  list: [],
}
export const rentMessageResult = handleActions({
  'request rentMessage list'(state, action) {
    return {...state, loading: true}
  },
  'receive rentMessage list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, rentMessageResultState)

const addRentMessage = () => ({  })
export const rentMessageAddResult = handleActions({
  'request rentMessage insert'(state, action) {
    return {...state, loading: false}
  },
  'receive rentMessage insert'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, addRentMessage)
const rentMessageDeleteState = () => ({  })
export const rentMessageDeleteResult = handleActions({
  'request rentMessage delete'(state, action) {
    return { ...state, loading: false }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive rentMessage delete'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, rentMessageDeleteState)





