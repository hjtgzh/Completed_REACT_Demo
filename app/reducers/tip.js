import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

const listResultState = {
  list: [],
 
}

export const tipListSearchResult = handleActions({
  'request tipList list'(state, action) {
    return { ...state, loading: true }
  },
  'receive tipList list'(state, action){
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

export const tipListSearchQuery = handleActions({
  'update tipList search query'(state, action) {
    return { ...state, ...action.payload }
  },
  'reset tipList search query'(state, action) {
    return { ...queryResultState() }
  },
}, queryResultState())

//查询楼幢信息
const buildingResultState = ()=>({
  list:[
        {code:'01',name:'杭州上城区近江时代大厦A座'},
        {code:'02',name:'杭州下城区'},
        {code:'03',name:'杭州江干区'},
        {code:'04',name:'杭州下城区1'}
  ]
})
export const searchBuildingResult=handleActions({
  'request buildingList list'(state, action) {
    // debugger
    return { ...state, loading: false }
  },
  'receive buildingList list'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, buildingResultState())
// 模糊查询户室信息
const roomResultState = ()=>({
  list:[
        {code:'01',name:'1001'},
        {code:'02',name:'102'},
        {code:'03',name:'103'},
        {code:'04',name:'104'},
        {code:'05',name:'104'}
  ]
})
// const roomResultState = []
export const searchRoomResult=handleActions({
  'request roomList list'(state, action) {
    return { ...state, loading: false }
  },
  'receive roomList list'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, roomResultState())
//关联入户
const GlAddressState=()=>({
  data:'',
  msg:'',
  status:''
})
export const intoHouseState=handleActions({
  'request insert address'(state, action) {
    debugger
    return { ...state }
  },
  'receive insert address'(state, action) {
    debugger
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state }
    }else{
       message.success(res.msg)
    }
    return { ...res.data }
 
  }
}, GlAddressState())