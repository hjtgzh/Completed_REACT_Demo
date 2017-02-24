import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

//-----------管辖单位--------------

//获取管辖单位分局
const unitSubStationListResultState = {
    list: [],
}
export const unitSubStationListResult =handleActions({
  'request unitSubStationList list'(state,action){
    return{...state,loading:true}
  },
  'receive unitSubStationList list'(state,action){
    const {req,res } = action.payload
      if(hasResponseError(res)){
        message.error(res.msg,10)
        return {...state,loading:false}
      }
      return{...res.data,loading:false}
  },
},unitSubStationListResultState)

//获取管辖单位派出所
const unitPoliceStationListResultState = {
    list: [],
}
export const unitPoliceStationListResult =handleActions({
  'request unitPoliceStationList list'(state,action){
    return{...state,loading:true}
  },
  'receive unitPoliceStationList list'(state,action){
    const {req,res } = action.payload
    if(hasResponseError(res)){
        message.error(res.msg,10)
        return {...state,loading:false}
    }
    return{...res.data,loading:false}
  },
},unitPoliceStationListResultState)

//获取管辖单位责任区
const unitResponseAreaResultState = {
  list: [],
}
export const unitResponseAreaResult =handleActions({
  'request unitResponseAreaList list'(state,action){
    return{...state,loading:true}
  },
  'receive unitResponseAreaList list'(state,action){
    const {req,res} =action.payload
    if(hasResponseError(res)){
        message.error(res.msg,10)
        return{...state,loading:false}
    }
    return{...res.data,loading:false}
  },
},unitResponseAreaResultState)

//获取分局对应的管辖单位列表
const unitSubstationRelDivisionResultState = {
    list: [],
}
export const unitSubstationRelDivisionResult =handleActions({
    'request UnitSubstationRelDivision list'(state,action){
      return{...state,loading:true}
    },
    'receive UnitSubstationRelDivision list'(state,action){
      const {req,res} =action.payload
        if(hasResponseError(res)){
            message.error(res.msg,10)
            return{...state,loading:false}
        }
        return{...res.data,loading:false}
    },
},unitSubstationRelDivisionResultState)
//修改管辖单位和行政区划关联关系
const unitEditRelationOfDivisionResultState = {
    list: [],
}
export const unitEditRelationOfDivisionResult =handleActions({
    'request UnitEditRelationOfDivision list'(state,action){
        return{...state,loading:true}
    },
    'receive UnitEditRelationOfDivision list'(state,action){
        const {req,res} =action.payload
        if(hasResponseError(res)){
            message.error(res.msg,10)
            return{...state,loading:false}
        }
        return{...res.data,loading:false}
    },
},unitEditRelationOfDivisionResultState)
//新增责任区
const addResponseAreaResultState = {
    rloe: [],
}
export const responseAreaAddResult = handleActions({
    'request responseArea insert'(state, action) {
        return {...state, loading: true}
    },
    'receive responseArea insert'(state, action) {
        const { res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return {...state, loading: false}
        }
        return {...res.data, loading: false}
    },
}, addResponseAreaResultState)
//责任区的修改
const updateResponseAreaResultState = {
    rloe: [],
}
export const responseAreaUpdateResult = handleActions({
    'request responseArea update'(state, action) {
        return {...state, loading: true}
    },
    'receive responseArea update'(state, action) {
        const { res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return {...state, loading: false}
        }
        return {...res.data, loading: false}
    },
}, updateResponseAreaResultState)
//查看责任区的民警
const responseAreaPoliceState = {
    list: [],
}
export const responseAreaPoliceResult =handleActions({
    'request responseAreaPolice list'(state,action){
        return{...state,loading:true}
    },
    'receive responseAreaPolice list'(state,action){
        const {req,res} =action.payload
        if(hasResponseError(res)){
            message.error(res.msg,10)
            return{...state,loading:false}
        }
        return{...res.data,loading:false}

    },
},responseAreaPoliceState)
//查看责任区可以添加的警员
const policeListResultState = {
    list1: [],
}
export const policeListResult =handleActions({
    'request policeList list'(state,action){
        return{...state,loading:true}
    },
    'receive policeList list'(state,action){
        const {req,res} =action.payload
        if(hasResponseError(res)){
            message.error(res.msg,10)
            return{...state,loading:false}
        }
        return{...res.data,loading:false}
    },
},policeListResultState)
//警员添加
const addPoliceResultState = {
    rloe: [],
}
export const policeAddResult = handleActions({
    'request police insert'(state, action) {
        return {...state, loading: false}
    },
    'receive police insert'(state, action) {
        const { res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return {...state, loading: false}
        }
        return {...res.data, loading: false}
    },
}, addPoliceResultState)
//责任区民警的删除
const responsePoliceDeleteState = {
    rloe: [],
}
export const responsePoliceDeleteResult = handleActions({
    'request responsePolice delete'(state, action) {
        return { ...state, loading: false }
        // const { id } = action.payload
        // return state.filter(item => item.id !== id)
    },
    'receive responsePolice delete'(state, action) {
        const { res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return {...state, loading: false}
        }
        return {...res.data, loading: false}
    },
}, responsePoliceDeleteState)
//查看责任区的关联地址
const responseAddressState = {
    list: [],
}
export const responseAddressResult =handleActions({
    'request responseAddress list'(state,action){
        return{...state,loading:true}
    },
    'receive responseAddress list'(state,action){
        const {req,res} =action.payload
        if(hasResponseError(res)){
            message.error(res.msg,10)
            return{...state,loading:false}
        }
        return{...res.data,loading:false}
    },
},responseAddressState)
//查看责任区需要添加的关联地址
const cognateAddressListResultState = {
    list: [],
}
export const cognateAddressListResult =handleActions({
    'request cognateAddressList list'(state,action){
        return{...state,loading:true}
    },
    'receive cognateAddressList list'(state,action){
        const {req,res} =action.payload
        if(hasResponseError(res)){
            message.error(res.msg,10)
            return{...state,loading:false}
        }
        return{...res.data,loading:false}
    },
},cognateAddressListResultState)
//关联地址添加
const addAddressResultState = {
    rloe: [],
}
export const addAddressResult = handleActions({
    'request addAddress insert'(state, action) {
        return {...state, loading: false}
    },
    'receive addAddress insert'(state, action) {
        const { res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return {...state, loading: false}
        }
        return {...res.data, loading: false}
    },
}, addAddressResultState)
//责任区地址的删除
const responseAddressDeleteState = {
    rloe: [],
}
export const responseAddressDeleteResult = handleActions({
    'request responseAddress delete'(state, action) {
        return { ...state, loading: false }
        // const { id } = action.payload
        // return state.filter(item => item.id !== id)
    },
    'receive responseAddress delete'(state, action) {
        const { res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return {...state, loading: false}
        }
        return {...res.data, loading: false}
    },
}, responseAddressDeleteState)
//----------------------------------
/*
* 行政区划
* */
//获取行政区划对应的管辖单位的请求与接收
const getDivisionRelUnitResultState = {
  list: [],
}
export const getDivisionRelUnitResult =handleActions({
  'request DivisionRelUnit list'(state,action){
    return{...state,loading:true}
  },
  'receive DivisionRelUnit list'(state,action){
    const {req,res } = action.payload
    if(hasResponseError(res)){
      message.error(res.msg,10)
      return {...state,loading:false}
    }
    return{...res.data,loading:false}
  },

},getDivisionRelUnitResultState)
//修改行政区划对应的管辖单位的请求与接收
const updateDivisionRelUnitResultState = {
    list: [],
}
export const updateDivisionRelUnitResult =handleActions({
    'request DivisionRelUnit update'(state,action){
        return{...state,loading:false}
    },
    'receive DivisionRelUnit update'(state,action){
        const {req,res } = action.payload
        if(hasResponseError(res)){
            message.error(res.msg,10)
            return {...state,loading:false}
        }
        return{...res.data,loading:false}
    },

},updateDivisionRelUnitResultState)
//根据村居委会id和类型查询1：道路；3：村组；
const getLoadOrVillageGroupListResultState = {
    list: [],
}
export const getLoadOrVillageGroupListResult =handleActions({
    'request LoadOrVillageGroup list'(state,action){
        return{...state,loading:true}
    },
    'receive LoadOrVillageGroup list'(state,action){
        const {req,res } = action.payload
        if(hasResponseError(res)){
            message.error(res.msg,10)
            return {...state,loading:false}
        }
        return{...res.data,loading:false}
    },

},getLoadOrVillageGroupListResultState)
//根据村居委会id查询街路巷列表(区域地址)
const getAreaAddressListResultState = {
    list: [],
}
export const getAreaAddressListResult =handleActions({
    'request AreaAddress list'(state,action){
        return{...state,loading:true}
    },
    'receive AreaAddress list'(state,action){
        const {req,res } = action.payload
        if(hasResponseError(res)){
            message.error(res.msg,10)
            return {...state,loading:false}
        }
        return{...res.data,loading:false}
    },
},getAreaAddressListResultState)
/*
 *申报管理
 */
//区县
const countyListResultState = {list: []}
export const countyListSearchResult = handleActions({
  'request countyList list'(state, action) {
    return { ...state, loading: true }
  },
  'receive countyList list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, countyListResultState)

//街道
const streetListResultState = {list: []}
export const streetListSearchResult = handleActions({
  'request streetList list'(state, action) {
    return { ...state, loading: true }
  },
  'receive streetList list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, streetListResultState)

//社区，村委会
const villageCommitteeListState = {list: []}
export const villageCommitteeListSearchResult = handleActions({
  'request villageCommitteeList list'(state, action) {
    return { ...state, loading: true }
  },
  'receive villageCommitteeList list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, villageCommitteeListState)

//道路-小区-村组-附属区苑
const commonListResultState = {list: []}
export const commonListSearchResult = handleActions({
  'request roadList list'(state, action) {
    return { ...state, loading: true }
  },
  'receive roadList list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, commonListResultState)

//附属区苑--小区接口
const villageListResultState = {list: []}
export const villageListSearchResult = handleActions({
  'request villageList list'(state, action) {
    return { ...state, loading: true }
  },
  'receive villageList list'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, villageListResultState)

//新增道路-小区-村组-附属区苑
const addDeclarResultState = () => ({  })
export const addDeclarResult = handleActions({
  'request addDeclar add'(state, action) {
    return {...state, loading: false}
  },
  'receive addDeclar add'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, addDeclarResultState)

//修改道路-小区-村组-附属区苑
const updateDeclarResultState  = () => ({  })
export const updateDeclarResult = handleActions({
  'request updateDeclar update'(state, action) {
    return {...state, loading: false}
  },
  'receive updateDeclar update'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, updateDeclarResultState)

//删除道路-小区-村组-附属区苑
const deleteDeclarState = () => ({  })
export const deleteDeclarResult = handleActions({
  'request deleteDeclar delete'(state, action) {
    return { ...state, loading: false }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive deleteDeclar delete'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, deleteDeclarState)

//通过道路-小区-村组-附属区苑
const passDeclarState = () => ({  })
export const passDeclarResult = handleActions({
  'request passDeclar pass'(state, action) {
    return { ...state, loading: false }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive passDeclar pass'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, passDeclarState)

//地址统计
const addressStatisticsList = {list: []}
export const searchAddressStatisticsList = handleActions({
  'request AddressList'(state, action) {
    return { ...state, loading: true }
  },
  'receive AddressList'(state, action){
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, addressStatisticsList)