import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

//房屋地址全称
const registerFullNameResultState = {
  data:{}
}
export const registerFullNameSearchResult = handleActions({
  'request address fullName'(state, action) {
    return { ...state, loading: false }
  },
  'receive address fullName'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, registerFullNameResultState)

// 获取人口详情-登记/居住
const registerListResultState = {
  changkou: [],
  zankou:[],
  jingwai:[]
}
export const registerListSearchResult = handleActions({
  'request house popLive'(state, action) {
    return { ...state, loading: false }
  },
  'receive house popLive'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, registerListResultState)

//人口详情-登记/居住人员状态改变
const registerPopStatusChangeResultState = {}
export const registerPopStatusChangeResult = handleActions({
    'request popstatus change'(state, action) {
      return { ...state, loading: false }
    },
    'receive popstatus change'(state, action) {
      // eslint-disable-next-line no-unused-vars
      const { req, res } = action.payload
      if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
      }
      return { ...res.data, loading: false }
    },
}, registerPopStatusChangeResultState)

//人口详情-登记/居住绑定访查人员
const registerBindRoomOrDzResultState = {}
export const registerBindRoomOrDzResult = handleActions({
    'request RoomOrDz bind'(state, action) {
        return { ...state, loading: false }
    },
    'receive RoomOrDz bind'(state, action) {
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, registerBindRoomOrDzResultState)
// 获取人口详情-曾登记/居住的action
const registerOnceListResultState = {
  changkou: [],
  zankou:[],
  jingwai:[]
}
export const registerOnceListSearchResult = handleActions({
  'request RegisterOnce list'(state, action) {
    return { ...state, loading: false }
  },
  'receive RegisterOnce list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, registerOnceListResultState)

// 获取人口详情-曾登记/居住的删除人员接口
const registerOnceDeletePopResultState = {}
export const registerOnceDeletePopSearchResult = handleActions({
    'request oncepop delete'(state, action) {
        return { ...state, loading: false }
    },
    'receive oncepop delete'(state, action) {
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, registerOnceDeletePopResultState)

// 获取人口详情-门禁卡持有人的action
const cardHolderListResultState = {
  list: [],
}
export const cardHolderListSearchResult = handleActions({
  'request CardHolder list'(state, action) {
    return { ...state, loading: false }
  },
  'receive CardHolder list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, cardHolderListResultState)

// 获取人口详情-社会申报的action
const declareListResultState = {
  sbdj: [],
  sbzx: [],
}
export const declareListSearchResult = handleActions({
  'request Declare list'(state, action) {
    return { ...state, loading: false }
  },
  'receive Declare list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, declareListResultState)

//系统登记入口的action
const sysRegisterListResultState = {
    czrk: [],
    zzrk: []
}
export const sysRegisterListSearchResult = handleActions({
  'request SysRegister list'(state, action) {
    return { ...state, loading: false }
  },
  'receive SysRegister list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, sysRegisterListResultState)


//新增安全防范--ytt
const addSafeKeepState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const addSafeKeepSearchResult = handleActions({
  'request group addSafeKeep'(state, action) {
    return { ...state, loading: false }
  },
  'receive group addSafeKeep'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }else{
      message.success(res.msg);
    }
    return { ...res.data, loading: false }
  },
}, addSafeKeepState)

//修改安全防范--ytt
const updateSafeKeepState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const updateSafeKeepSearchResult = handleActions({
  'request group updateSafeKeep'(state, action) {
    return { ...state, loading: false }
  },
  'receive group updateSafeKeep'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }else{
      message.success(res.msg);
    }
    return { ...res.data, loading: false }
  },
}, updateSafeKeepState)

//新增安全防范列表
//const addSafeKeepListState = {
//  list: [],
//  currentPage: 1,
//  pageCount: 0,
//  pageSize: 20,
//  totalCount: 0,
//}
//export const addSafeKeepListSearchResult = handleActions({
//  'request group addSafeKeep'(state, action) {
//    return { ...state, loading: false }
//  },
//  'receive group addSafeKeep'(state, action) {
//    // eslint-disable-next-line no-unused-vars
//    const { req, res } = action.payload
//    if (hasResponseError(res)) {
//      message.error(res.msg)
//      return { ...state, loading: false }
//    }
//    return { ...res.data, loading: false }
//  },
//}, addSafeKeepListState)


//安全防范-ytt
const safeKeepListState = {
  list: [],
}
export const safeKeepListSearchResult = handleActions({
  'request group safeKeep'(state, action) {
    return { ...state, loading: false }
  },
  'receive group safeKeep'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, safeKeepListState)


//安全防范详情-ytt
const safeKeepDetailState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const safeKeepDetailSearchResult = handleActions({
  'request group safeKeepDetail'(state, action) {
    return { ...state, loading: false }
  },
  'receive group safeKeepDetail'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, safeKeepDetailState)


//删除安全防范-ytt
const deleteSafeKeepState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const deleteSafeKeepSearchResult = handleActions({
  'request group delete'(state, action) {
    return { ...state, loading: false }
  },
  'receive group delete'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }else{
      message.success(res.msg)
    }
    return { ...res.data, loading: false }
  },
}, deleteSafeKeepState)


//二维码管理列表-ytt
const qrcodeManagementState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const qrcodeManagementSearchResult = handleActions({
  'request rqcode list'(state, action) {
    return { ...state, loading: false }
  },
  'receive rqcode list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, qrcodeManagementState)


//二维码统计列表-ytt
const qrcodeStatisticsState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const qrcodeStatisticsSearchResult = handleActions({
  'request rqtjcode list'(state, action) {
    return { ...state, loading: false }
  },
  'receive rqtjcode list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, qrcodeStatisticsState)


//二维码绑定-ytt
const qrcodeBindState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const qrcodeBindSearchResult = handleActions({
  'request qrcode bind'(state, action) {
    return { ...state, loading: false }
  },
  'receive qrcode bind'(state, action) {
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }else{
      message.success(res.msg)
    }
    return { ...res.data, loading: false }
  },
}, qrcodeBindState)

//二维码管理解绑-ytt
const qrcodeUnbundlingState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const qrcodeUnbundlingSearchResult = handleActions({
  'request rqcode unbundling'(state, action) {
    return { ...state, loading: false }
  },
  'receive rqcode unbundling'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }else{
      message.success(res.msg)
    }
    return { ...res.data, loading: false }
  },
}, qrcodeUnbundlingState)


//访查日志
const groupVisitRecordState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}
export const groupVisitRecordSearchResult = handleActions({
  'request group record'(state, action) {
    return { ...state, loading: false }
  },
  'receive group record'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, groupVisitRecordState)




//批量访查
const houseRoomVisitState = {}
export const houseRoomVisitSearchResult = handleActions({
  'request HouseRoom visit'(state, action) {
    return { ...state, loading: false }
  },
  'receive HouseRoom visit'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, houseRoomVisitState)


//批量关联入户
const houseRelatedHomeState = {}
export const houseRelatedHomeSearchResult = handleActions({
  'request HouseRelatedHome relate'(state, action) {
    return { ...state, loading: false }
  },
  'receive HouseRelatedHome relate'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, houseRelatedHomeState)