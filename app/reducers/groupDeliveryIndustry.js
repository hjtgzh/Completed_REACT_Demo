import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'

const baseInfoDeliveryResultState = () => {}

export const baseInfoDeliveryResult = handleActions({
  'request deliveryBase info'(state, action) {
    return {...state, loading: true}
  },
  'receive deliveryBase info'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, baseInfoDeliveryResultState)


const bussinessDeliveryResultState = () => {}

export const businessDeliveryResult = handleActions({
  'request bussinessDelivery info'(state, action) {
    return {...state, loading: true}
  },
  'receive bussinessDelivery info'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, bussinessDeliveryResultState)



const bussinessSaveDeliveryResultState = () => {}

export const businessSaveDeliveryResult = handleActions({
  'request bussinessDelivery save'(state, action) {
    return {...state, loading: true}
  },
  'receive bussinessDelivery save'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, bussinessSaveDeliveryResultState)



const boxListDeliveryResultState = () => {}

export const boxListDeliveryResult = handleActions({
  'request boxDelivery list'(state, action) {
    return {...state, loading: true}
  },
  'receive boxDelivery list'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, boxListDeliveryResultState)



const boxAddDeliveryResultState = () => {}

export const boxAddDeliveryResult = handleActions({
  'request boxDelivery add'(state, action) {
    return {...state, loading: true}
  },
  'receive boxDelivery add'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, boxAddDeliveryResultState)



const boxDelDeliveryResultState = () => {}

export const boxDelDeliveryResult = handleActions({
  'request boxDelivery del'(state, action) {
    return {...state, loading: true}
  },
  'receive boxDelivery del'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, boxDelDeliveryResultState)

const boxOneInfoDeliveryResultState = () => {}

export const boxOneInfoDeliveryResult = handleActions({
    'request oneBoxDelivery info'(state, action) {
        return {...state, loading: true}
    },
    'receive oneBoxDelivery info'(state, action) {
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return {...state, loading: false}
        }
        return {...res.data, loading: false}
    },
}, boxOneInfoDeliveryResultState)

const boxUpdateDeliveryResultState = () => {}

export const boxUpdateDeliveryResult = handleActions({
  'request boxDelivery update'(state, action) {
    return {...state, loading: true}
  },
  'receive boxDelivery update'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, boxUpdateDeliveryResultState)



const otherDeliveryResultState = () => {}

export const otherDeliveryResult = handleActions({
  'request otherDelivery info'(state, action) {
    return {...state, loading: true}
  },
  'receive otherDelivery info'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, otherDeliveryResultState)



const otherSaveDeliveryResultState = () => {}

export const otherSaveDeliveryResult = handleActions({
  'request otherDelivery save'(state, action) {
    return {...state, loading: true}
  },
  'receive otherDelivery save'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, otherSaveDeliveryResultState)


