import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

// 获取头部每项的统计值
const peopleStatisticsState = {}
export const peopleStatisticsResult = handleActions({
  'request people item nums'(state, action) {
    return {...state,loading:true}
  },
  'receive people item nums'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 5)
      return {...state,loading:false}
    }
    return {...res.data,loading:false}
  },
}, peopleStatisticsState)

const listResultState = {
  currentPage:1,
  currentPageIndex:0,
  list: [],
  offset:0,
  pageCount: 0,
  pageNo:0,
  pageSize:10,
  totalCount:0,
  totalPage:0
}

export const peopleCheckSearchResult = handleActions({
  'request peopleCheck list'(state, action) {
    return { ...state, loading: true }
  },
  'receive peopleCheck list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listResultState)

const queryResultState = () => ({
  keyword: { value: '' },
  division: { value: '' },
  institutions: { value: '' },
  peopleStatus: { value: '' },
  addressType: { value: '' },
})

export const peopleCheckSearchQuery = handleActions({
  'update peopleCheck search query'(state, action) {
    return { ...state, ...action.payload }
  },
  'reset peopleCheck search query'(state, action) {
    return { ...queryResultState() }
  },
}, queryResultState())

// 模糊查询楼幢信息-------------------------------------------------------------------------------------
const buildingResultState = ()=>({
  list:[{code:'01',name:'e鄂尔多斯'},{code:'02',name:'h杭州'}]
})
export const searchBuildingResult=handleActions({
  'request search building'(state, action) {
    return { ...state, loading: true }
  },
  'receive search building'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res, loading: false }
  },
}, buildingResultState())
// 模糊查询户室信息-------------------------------------------------------------------------------------
const roomResultState = ()=>({
  list:[{code:'01',name:'1001'},{code:'02',name:'101'}]
})
// const roomResultState = []
export const searchRoomResult=handleActions({
  'request search room'(state, action) {
    return { ...state, loading: true }
  },
  'receive search room'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, roomResultState())

// 新增访查人员-------------------------------------------------------------------------------------
// const insertVisitPeopleState = {
//   name: { value: '' },
//   sex: { value: '' },
//   idnumber: { value: '' },
//   buildingcode: { value: '' },
//   roomcode: { value: '' },
//   state:'1'
// }

// export const insertVisitPeopleResult = handleActions({
//   'request visitablePeople'(state, action) {
//     debugger
//     state.loading=true
//     return {...state}
//   },
//   'receive visitablePeople'(state, action) {
//     const { res } = action.payload
//     if (hasResponseError(res)) {
//       message.error(res.msg)
//       return { ...state, loading: false }
//     }
//     return { ...res.data, loading: false }
//   },
// }, insertVisitPeopleState)
// 模糊查询国籍-------------------------------------------------------------------------------------
const searchCountryState={
  list:[]
}
export const searchCountryResult=handleActions({
  'request search country'(state, action) {
    // debugger
    return { ...state }
  },
  'receive search country'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { list:res.data, loading: false }
  },
}, searchCountryState)

// 查询境外人员-------------------------------------------------------------------------------------
const foreignerState={
  // 姓名
  xm:'',
  // 性别
  xb:'',
  // 中文名
  bm:'',
  // 出生日期
  csrqStr:'',
  // 国籍
  gj:'',
  // 国家名称
  gjmc:'',
  // base表id
  id:'',
  // 重点国家标记
  sfzdgj:'',
  // 证件号码
  sfzh:'',
  // 证件有效截止日期
  zjyxqstr:'',
  // 证件类型
  zjzl:''
}
export const foreignerInfo=handleActions({
  'request get foreigner'(state, action) {
    // return {...state,loading:true}
    return {...state,loading:true}
  },
  'receive get foreigner'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  }
}, foreignerState)
// 新增境外人员--------------------------------------------------------------------------------------
// const insertForeignerState=()=>({state:1})
// export const insertForeignerResponse=handleActions({
//   'request add foreigner'(state, action) {
//     return { ...state}
//   },
//   'receive add foreigner'(state, action) {
//     const { res } = action.payload
//     if (hasResponseError(res)) {
//       message.error(res.msg)
//       return { ...state }
//     }
//     return { ...res.data }
//   }
// }, insertForeignerState())
// 查询访查人口---------------------------------------------------------------------------------------
const visitPeopleState={
  id:'',
  xm:'',
  xb:'',
  sfzh:'',
  hjxz:'',
  gkzdry:'',
  djdz:'',
}
export const visitPeopleResult=handleActions({
  'request get visitPeople'(state, action) {
    // debugger
    // state.loading=true
    return {...state,loading:true}
  },
  'receive get visitPeople'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state,loading:false }
    }
    return { ...res.data,loading:false }
  }
}, visitPeopleState)
// 关联入户-------------------------------------------------------------------------------------------
// const GlAddressState=()=>({
//   data:'',
//   msg:'success',
//   state:'1'
// })
// export const GlAddressResponse=handleActions({
//   'request insert address'(state, action) {
//     debugger
//     return { ...state }
//   },
//   'receive insert address'(state, action) {
//     const { res } = action.payload
//     if (hasResponseError(res)) {
//       message.error(res.msg)
//       return { ...state }
//     }
//     return { ...res.data }
//   }
// }, GlAddressState())



// =================================================
// 余金彪
const detailResultState = {
  allowRole: {},
  shopInfo: {},
  base : {},
  link : {},
}
export const peopleDetailResult = handleActions({
  'request people detail'(state, action) {
    return { ...state, loading: false }
  },
  'receive people detail'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

export const archivesCheckSearchResult = handleActions({
  'request people archives'(state, action) {
    return { ...state, loading: true }
  },
  'receive people archives'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listResultState)
//低慢小详情点击
export const dateSmallSearchResult = handleActions({
  'request people deteSmall'(state, action) {
    return { ...state, loading: true }
  },
  'receive people deteSmall'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
})
//保存basic详情
export const updateBasicPeopleDetail = handleActions({
  'request savePeople detail'(state, action) {
    return { ...state, ...action.payload }
  },
  'receive savePeople detail'(state, action) {
    return { ...queryResultState() }
  },
}, queryResultState())

/************************处罚记录begin  tj****************************/
//处罚记录列表
const getPunishListState = {
  list: [],
}
export const peoplePunishResule = handleActions({
  'request peoplePunish list'(state, action) {
    return state
  },
  'receive peoplePunish list'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, getPunishListState)

//删除处罚记录
const deletePunishResultState = {

}
export const deletePunishResult = handleActions({
  'request deletePunish item'(state, action) {
    return state
  },
  'receive deletePunish item'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, deletePunishResultState)

//更新处罚记录
const updataPunishResultState = {

}
export const updataPunishResult = handleActions({
  'request updataPunish item'(state, action) {
    return state
  },
  'receive updataPunish item'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, updataPunishResultState)

//新增处罚记录
const addPunishResultState = {

}
export const addPunishResult = handleActions({
  'request addPunish item'(state, action) {
    return state
  },
  'receive addPunish item'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, addPunishResultState)

//获取处罚记录
const getPunishItemResultState = {

}
export const getPunishItemResult = handleActions({
  'request getPunish item'(state, action) {
    return state
  },
  'receive getPunish item'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, getPunishItemResultState)

/************************处罚记录end  tj****************************/

//获取访查日志
const visitLogResult = {
  list : [],
  totalCount : 0,
}
export const fetchVisitLogResult = handleActions({
  'request visitLog'(state, action) {
    return { ...state, loading: true }
  },
  'receive visitLog'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, visitLogResult)

// =================================================
// 厉樟瑞

const clueResultState = {//请求时候的默认参数
  data:{

  }
}
const clueListResultState = {//请求时候的默认参数
  data:[]
}
//获取线索记录列表（分页）
export const clueListSearchResult = handleActions({
  'request clue list'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueListResultState)

//获取线索记录详情
export const clueDetailResult = handleActions({
  'request clue detail'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue detail'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//获取线索记录人员信息
export const cluePeopleMesgSearchResult = handleActions({
  'request clue people message'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue people message'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//获取线索记录案件信息
export const clueLawMesgSearchResult = handleActions({
  'request clue law message'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue law message'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//获取线索记录警情信息
export const clueAlarmMesgSearchResult = handleActions({
  'request clue alarm message'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue alarm message'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//获取线索记录电动车信息
export const clueBikeMesgSearchResult = handleActions({
  'request clue bike message'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue bike message'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//获取线索记录机动车信息
export const clueCarMesgSearchResult = handleActions({
  'request clue car message'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue car message'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//获取线索记录单位信息
export const clueUnitMesgSearchResult = handleActions({
  'request clue unit message'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue unit message'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//获取线索记录照片
export const cluePhotoMesgSearchResult = handleActions({
  'request clue photo message'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue photo message'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listResultState)

//查询关联人员（通用）
export const cluePeopleSearchResult = handleActions({
  'request clue people'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue people'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//查询关联机动车（通用）
export const clueCarSearchResult = handleActions({
  'request clue car'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue car'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//查询关联电动车（通用）
export const clueBikeSearchResult = handleActions({
  'request clue bike'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue bike'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//查询关联单位（通用）
export const clueUnitSearchResult = handleActions({
  'request clue unit'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue unit'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//查询关联案件（通用）
export const clueLawSearchResult = handleActions({
  'request clue law'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue law'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//查询关联警情（通用）
export const clueAlarmSearchResult = handleActions({
  'request clue alarm'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue alarm'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//新增检索记录的标签保存（通用）
export const clueLabelSaveHandle = handleActions({
  'request clue label'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue label'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listResultState)

//保存新增的检索记录（通用）
export const clueSaveHandleResult = handleActions({
  'request clue save'(state, action) {
    return { ...state, loading: true }
  },
  'receive clue save'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listResultState)

//修改检索记录（通用）
export const clueUpadteAllResult = handleActions({
  'request upadte all record'(state, action) {
    return { ...state, loading: true }
  },
  'receive upadte all record'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//获取地址关联线索记录列表
export const clueListFromBldResult = handleActions({
  'request record list fromBld'(state, action) {
    return { ...state, loading: true }
  },
  'receive record list fromBld'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//获取房间关联线索记录列表
export const clueListFromFjResult = handleActions({
  'request record list fromFj'(state, action) {
    return { ...state, loading: true }
  },
  'receive record list fromFj'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//获取人员关联线索记录列表
export const clueListFromRyResult = handleActions({
  'request record list fromRy'(state, action) {
    return { ...state, loading: true }
  },
  'receive record list fromRy'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//获取单位关联线索记录列表
export const clueListFromDwResult = handleActions({
  'request record list fromDw'(state, action) {
    return { ...state, loading: true }
  },
  'receive record list fromDw'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//获取案件关联线索记录列表
export const clueListFromAjResult = handleActions({
  'request record list fromAj'(state, action) {
    return { ...state, loading: true }
  },
  'receive record list fromAj'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//删除线索关联机动车
export const clueDeleteLinkJdcResult = handleActions({
  'request delete link jdc'(state, action) {
    return { ...state, loading: true }
  },
  'receive delete link jdc'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//删除线索关联电动车
export const clueDeleteLinkDdcResult = handleActions({
  'request delete link ddc'(state, action) {
    return { ...state, loading: true }
  },
  'receive delete link ddc'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//删除线索关联单位
export const clueDeleteLinkDwResult = handleActions({
  'request delete link dw'(state, action) {
    return { ...state, loading: true }
  },
  'receive delete link dw'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//删除线索关联人员
export const clueDeleteLinkRyResult = handleActions({
  'request delete link ry'(state, action) {
    return { ...state, loading: true }
  },
  'receive delete link ry'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//删除线索关联案件
export const clueDeleteLinkAjResult = handleActions({
  'request delete link aj'(state, action) {
    return { ...state, loading: true }
  },
  'receive delete link aj'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//删除线索关联警情
export const clueDeleteLinkJqResult = handleActions({
  'request delete link jq'(state, action) {
    return { ...state, loading: true }
  },
  'receive delete link jq'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, clueResultState)

//获取人员姓名 证件号
const peopleNameResultState = {
  "xm":"",      
  "sfzh":"",
}
export const fetchPeopleNameResult = handleActions({
  'request people name'(state, action) {
    return { ...state, loading: true }
  },
  'receive people name'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, peopleNameResultState)