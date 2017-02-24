import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'


const ownerMessageResultState = {
  list: [],
}

export const ownerMessageResult = handleActions({
  'request ownerMessage list'(state, action) {
    return {...state, loading: true}
  },
  'receive ownerMessage list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
},ownerMessageResultState)

const addOwnerMessage = () => ({  })
export const areaAddressAddResult = handleActions({
  'request ownerMessage insert'(state, action) {
    return {...state, loading: false}
  },
  'receive ownerMessage insert'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, addOwnerMessage)


const ownerMessageDeleteState = () => ({  })
export const ownerMessageDeleteResult = handleActions({
  'request ownerMessage delete'(state, action) {
    return { ...state, loading: false }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive ownerMessage delete'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, ownerMessageDeleteState)

const renterMessageResultState = {
  list: [],
}

export const renterMessageResult = handleActions({
  'request renterMessage list'(state, action) {
    return {...state, loading: true}
  },
  'receive renterMessage list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, renterMessageResultState)

const addRenterMessage = () => ({  })
export const renterMessageAddResult = handleActions({
  'request renterMessage insert'(state, action) {
    return {...state, loading: false}
  },
  'receive renterMessage insert'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, addRenterMessage)




const renterMessageDeleteState = () => ({  })
export const renterMessageDeleteResult = handleActions({
  'request renterMessage delete'(state, action) {
    return { ...state, loading: false }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive renterMessage delete'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, renterMessageDeleteState)





