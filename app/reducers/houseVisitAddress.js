import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

const addressInfoResultState = () =>({})

export const addressInfoResult = handleActions({
  'request address info'(state, action) {
    return { ...state, loading: true }
  },
  'receive address info'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, addressInfoResultState)



const deletdOwnerResultState = () =>({})

export const deletdOwnerResult = handleActions({
  'request addressOwner deletd'(state, action) {
    return { ...state, loading: false }
  },
  'receive addressOwner deletd'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, deletdOwnerResultState)


const deletdQrcodeResultState = () =>({})

export const deletdQrcodeResult = handleActions({
  'request addressQrcode deletd'(state, action) {
    return { ...state, loading: false }
  },
  'receive addressQrcode deletd'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, deletdQrcodeResultState)



const deletdHouldNumResultState = () =>({})

export const deletdHouldNumResult = handleActions({
  'request addressHouldNum deletd'(state, action) {
    return { ...state, loading: false }
  },
  'receive addressHouldNum deletd'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, deletdHouldNumResultState)




const deletdHouseFileResultState = () =>({})

export const deletdHouseFileResult = handleActions({
  'request addressHouseFile deletd'(state, action) {
    return { ...state, loading: false }
  },
  'receive addressHouseFile deletd'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, deletdHouseFileResultState)




const addOwnerResultState = () =>({})

export const addOwnerResult = handleActions({
  'request addressOwner add'(state, action) {
    return { ...state, loading: false }
  },
  'receive addressOwner add'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, addOwnerResultState)



const addQrcodeResultState = () =>({})

export const addQrcodeResult = handleActions({
  'request addressQrcode add'(state, action) {
    return { ...state, loading: false }
  },
  'receive addressQrcode add'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, addQrcodeResultState)

const searchHouldNumResultState = () =>({})
export const searchHouldNumResult = handleActions({
  'request addressHouldNum search'(state, action) {
    return { ...state, loading: true }
  },
  'receive addressHouldNum search'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, searchHouldNumResultState)


const addHouldNumResultState = () =>({})

export const addHouldNumResult = handleActions({
  'request addressHouldNum add'(state, action) {
    return { ...state, loading: false }
  },
  'receive addressHouldNum add'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, addHouldNumResultState)



const searchHouseFileResultState = () =>({})
export const searchHouseFileResult = handleActions({
  'request addressHouseFile search'(state, action) {
    return { ...state, loading: true }
  },
  'receive addressHouseFile search'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, searchHouseFileResultState)



const addHouseFileResultState = () =>({})

export const addHouseFileFileResult = handleActions({
  'request addressHouseFile add'(state, action) {
    return { ...state, loading: false }
  },
  'receive addressHouseFile add'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, addHouseFileResultState)



const saveScoreResultState = () =>({})

export const saveScoreResult = handleActions({
  'request addresScores save'(state, action) {
    return { ...state, loading: false }
  },
  'receive addresScores save'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, saveScoreResultState)



const saveRoomSelectResultState = () =>({})

export const saveRoomSelectResult = handleActions({
  'request addressRoomSelect save'(state, action) {
    return { ...state, loading: false }
  },
  'receive addressRoomSelect save'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, saveRoomSelectResultState)