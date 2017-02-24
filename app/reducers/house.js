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

export const houseCheckSearchResult = handleActions({
  'request houseCheck list'(state, action) {
    return { ...state, loading: true }
  },
  'receive houseCheck list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listResultState)

const queryResultState = () => ({
  keyword: { value: '' },
  division: { value: '' },
  institutions: { value: '' },
  houseStatus: { value: '' },
  addressType: { value: '' },
})

export const houseCheckSearchQuery = handleActions({
  'update houseCheck search query'(state, action) {
    return { ...state, ...action.payload }
  },
  'reset houseCheck search query'(state, action) {
    return { ...queryResultState() }
  },
}, queryResultState())


const detailResultState = {
  allowRole: {},
  shopInfo: {},
}
export const houseDetailResult = handleActions({
  'request house detail'(state, action) {
    return { ...state, loading: false }
  },
  'receive house detail'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)


const detailFloorsResult = {
  status : 0,
  list : [],
}
export const fetchFloorsResult = handleActions({
  'request floors tree'(state, action) {
    return { ...state, loading: true } 
  },
  'receive floors tree'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailFloorsResult)

const detailSaveFloorsResult = {}
export const saveFloorsResult = handleActions({
  'request saveFloors tree'(state, action) {
    return state 
  },
  'receive saveFloors tree'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailSaveFloorsResult)

const deleteRoomResult = {}
export const deleteFloorsRoomResult = handleActions({
  'request deleteFloors room'(state, action) {
    return state 
  },
  'receive deleteFloors room'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, deleteRoomResult)

const addRoomResult = {}
export const addFloorsRoomResult = handleActions({
  'request addFloors room'(state, action) {
    return state 
  },
  'receive addFloors room'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, addRoomResult)

const updataRoomResult = {}
export const updataFloorsRoomResult = handleActions({
  'request updataFloors room'(state, action) {
    return state 
  },
  'receive updataFloors room'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, updataRoomResult)


const updataUniteResult = {}
export const updataFloorsUniteResult = handleActions({
  'request updataFloors unite'(state, action) {
    return state 
  },
  'receive updataFloors unite'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, updataUniteResult)

const visitConResult = {
  list : [],
}
export const fetchVisitConResult = handleActions({
  'request visitContent'(state, action) {
    return  { ...state, loading: true }
  },
  'receive visitContent'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, visitConResult)

const buildingCountResult = {}
export const fetchBuildingCountResult = handleActions({
  'request visitBuildingCount'(state, action) {
    return  state
  },
  'receive visitBuildingCount'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, buildingCountResult)

const uniteCountResult = {}
export const fetchUniteCountResult = handleActions({
  'request visitUniteCount'(state, action) {
    return  state
  },
  'receive visitUniteCount'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, uniteCountResult)
//地址访查日志
const buildgingLogResult = {
  list : [],
  totalCount : 0,
}
export const fetchBuildgingLogResult = handleActions({
  'request buildingLog'(state, action) {
    return  { ...state, loading : true }
  },
  'receive buildingLog'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, buildgingLogResult)

// 获取room列表--黄建停
const roomListResultState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}

export const roomCheckSearchResult = handleActions({
  'request roomCheck list'(state, action) {
    // debugger
    // state.loading=true
    // return state
    return { ...state, loading: true }
  },
  'receive roomCheck list'(state, action) {
    // debugger
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, roomListResultState)

//结束

//获取智能访查地址的信息--黄建停
const searchAddressState = {}
export const searchAddressResult = handleActions({
  'request searchAddress'(state, action) {
    // debugger
    return { ...state, loading: false }
  },
  'receive searchAddress'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, searchAddressState)
//获取 分局 列表--黄建停
const publicStationState = {}
export const publicStationResult = handleActions({
  'request publicStation'(state, action) {
    // debugger
    return { ...state, loading: true }
  },
  'receive publicStation'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, publicStationState)
//获取 派出所（管辖单位）列表--黄建停
const policeStationState = {}
export const policeStationResult = handleActions({
  'request policeStation'(state, action) {
    // debugger
    return { ...state, loading: true }
  },
  'receive policeStation'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, policeStationState)
//获取 行政区划 列表--黄建停
const areaState = {}
export const AreaResult = handleActions({
  'request area'(state, action) {
    // debugger
    return { ...state, loading: true }
  },
  'receive area'(state, action) {
    // debugger
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, areaState)
//获取 区县 列表--黄建停
const countryState = {}
export const countryResult = handleActions({
  'request country'(state, action) {
    // debugger
    return { ...state, loading: true }
  },
  'receive country'(state, action) {
    // debugger
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, countryState)
//获取 街道 列表--黄建停
const streetState = {}
export const streetResult = handleActions({
  'request street'(state, action) {
    // debugger
    return { ...state, loading: true }
  },
  'receive street'(state, action) {
    // debugger
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, streetState)
//获取 道路 列表--黄建停
const roadState = {}
export const roadResult = handleActions({
  'request road'(state, action) {
    // debugger
    return { ...state, loading: true }
  },
  'receive road'(state, action) {
    // debugger
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, roadState)
//获取小区标志物列表--黄建停
const houseMarkState = {}
export const houseMarkResult = handleActions({
  'request houseMark'(state, action) {
    // debugger
    return { ...state, loading: true }
  },
  'receive houseMark'(state, action) {
    // debugger
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, houseMarkState)
//获取小区标志物别称列表--黄建停
const houseMarkNameState = {}
export const houseMarkNameResult = handleActions({
  'request houseMarkName'(state, action) {
    // debugger
    return { ...state, loading: true }
  },
  'receive houseMarkName'(state, action) {
    // debugger
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, houseMarkNameState)
//新增地址提交--黄建停
const addressSubmitState = {}
export const addressSubmitResult = handleActions({
  'request addressSubmit'(state, action) {
    // debugger
    return { ...state, loading: true }
  },
  'receive addressSubmit'(state, action) {
    // debugger
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, addressSubmitState)

// 房间访查日志
const roomLogResult = {
  list : [],
  totalCount : 0,
}
export const fetchRoomLogResult = handleActions({
  'request roomLog'(state, action) {
    return  { ...state, loading: true }
  },
  'receive roomLog'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, roomLogResult)

// 地图地址-详情
const mapBuildingCountResult = {
}
export const fetchMapBuildingCountResult = handleActions({
  'request mapBuilding count'(state, action) {
    return  state
  },
  'receive mapBuilding count'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, mapBuildingCountResult)

// 地图房间-详情
const mapRoomCountResult = {
}
export const fetchMapRoomCountResult = handleActions({
  'request mapRoom count'(state, action) {
    return  state
  },
  'receive mapRoom count'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, mapRoomCountResult)
// 实有房屋地址头部-详情
const buildingCountsResultState = {
}
export const buildingCountsResult = handleActions({
  'request building count'(state, action) {
    return { ...state, loading: true }
  },
  'receive building count'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, buildingCountsResultState)
// 实有房屋room头部-详情
const roomCountsResultState = {
}
export const roomCountsResult = handleActions({
  'request room count'(state, action) {
    return { ...state, loading: true }
  },
  'receive room count'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, roomCountsResultState)

// 实有房屋名称
const roomNameResultState = {
  "bzdz" : '',
}
export const roomNameResult = handleActions({
  'request room name'(state, action) {
    return { ...state, loading: true }
  },
  'receive room name'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, roomNameResultState)