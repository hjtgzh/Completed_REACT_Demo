import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'


const logisticsRoadResultState = {
  list: [],
}

export const logisticsRoadResult = handleActions({
  'request logisticsRoad list'(state, action) {
    return {...state, loading: true}
  },
  'receive logisticsRoad list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
},logisticsRoadResultState)

const addlogisticsRoad = () => ({  })
export const logisticsRoadAddResult = handleActions({
  'request logisticsRoad insert'(state, action) {
    return {...state, loading: false}
  },
  'receive logisticsRoad insert'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, addlogisticsRoad)


const logisticsRoadDeleteState = () => ({  })
export const logisticsRoadDeleteResult = handleActions({
  'request logisticsRoad delete'(state, action) {
    return { ...state, loading: false }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive logisticsRoad delete'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, logisticsRoadDeleteState)

const carMessageResultState = {
  list: [],
}

export const carMessageResult = handleActions({
  'request carMessage list'(state, action) {
    return {...state, loading: true}
  },
  'receive carMessage list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, carMessageResultState)

const addcarMessage = () => ({  })
export const carMessageAddResult = handleActions({
  'request carMessage insert'(state, action) {
    return {...state, loading: false}
  },
  'receive carMessage insert'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, addcarMessage)
const carMessageDeleteState = () => ({  })
export const carMessageDeleteResult = handleActions({
  'request carMessage delete'(state, action) {
    return { ...state, loading: false }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive carMessage delete'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, carMessageDeleteState)

const logisticsMsgResultState = {
  list: [],
}
export const logisticsMsgResult = handleActions({
  'request logisticsMsg list'(state, action) {
    return {...state, loading: true}
  },
  'receive logisticsMsg list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, logisticsMsgResultState)

const addlogisticsMsg = () => ({  })
export const logisticsMsgAddResult = handleActions({
  'request logisticsMsg insert'(state, action) {
    return {...state, loading: false}
  },
  'receive logisticsMsg insert'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, addcarMessage)
const logisticsMsgDeleteState = () => ({  })
export const logisticsMsgDeleteResult = handleActions({
  'request logisticsMsg delete'(state, action) {
    return { ...state, loading: false }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive logisticsMsg delete'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, logisticsMsgDeleteState)





