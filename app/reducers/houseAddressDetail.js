import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

const detailResultState = {//请求时候的默认参数
  data:{

  }
}

const detailResultListState = {//请求时候的默认参数
  list:[
  ]
}
//房屋地址详情
export const houseAddressDetailSearchResult = handleActions({//请求的结果
  'request house address detail'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house address detail'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//修改地址
export const houseUpdateAddressResult = handleActions({//请求的结果
  'request house update address'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house update address'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//修改地址历史状态
export const houseUpdateHisStateResult = handleActions({//请求的结果
  'request house update hisState'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house update hisState'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//删除历史地址
export const houseDelAddressResult = handleActions({//请求的结果
  'request house del address'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house del address'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//修改地址经纬度
export const houseUpdateJwdResult = handleActions({//请求的结果
  'request house update jwd'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house update jwd'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)


//添加产权人
export const houseAddressCqrAddResult = handleActions({//请求的结果
  'request house cqr add'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house cqr add'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//删除产权人
export const houseAddressCqrDeleteResult = handleActions({//请求的结果
  'request house cqr delete'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house cqr delete'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//添加备注
export const houseRelatedbzAddResult = handleActions({//请求的结果
  'request house relatedbz add'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house relatedbz add'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//删除备注
export const houseRelatedbzDeleteResult = handleActions({//请求的结果
  'request house relatedbz delete'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house relatedbz delete'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//查询户号
export const houseHhResult = handleActions({//请求的结果
  'request house Hh'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house Hh'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultListState)

//绑定户号
export const houseAddBuildHhResult = handleActions({//请求的结果
  'request house addBuild Hh'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house addBuild Hh'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//解绑户号
export const houseDelBuildHhResult = handleActions({//请求的结果
  'request house delBuild Hh'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house delBuild Hh'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//查询档案号
export const houseDahResult = handleActions({//请求的结果
  'request house Dah'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house Dah'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//绑定档案号
export const houseAddBuildDahResult = handleActions({//请求的结果
  'request house addBuild Dah'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house addBuild Dah'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//解绑档案号
export const houseDelBuildDahResult = handleActions({//请求的结果
  'request house delBuild Dah'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house delBuild Dah'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//查询标准地址
export const houseBzdzResult = handleActions({//请求的结果
  'request house bzdz'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house bzdz'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultListState)

//绑定标准地址
export const houseAddBzdzResult = handleActions({//请求的结果
  'request house bd bzdz'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house bd bzdz'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//解绑标准地址
export const houseDelBzdzResult = handleActions({//请求的结果
  'request house del bzdz'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house del bzdz'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//添加责任区
export const houseAddZrqResult = handleActions({//请求的结果
  'request house add zrq'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house add zrq'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//解除责任区
export const houseDelZrqResult = handleActions({//请求的结果
  'request house del zrq'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house del zrq'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//绑定二维码
export const houseAddBarCodeResult = handleActions({//请求的结果
  'request house add barCode'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house add barCode'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//解绑二维码
export const houseDelBarCodeResult = handleActions({//请求的结果
  'request house del barCode'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house del barCode'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)

//地址合并
export const houseCombineBuildingResult = handleActions({//请求的结果
  'request house combine building'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive house combine building'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultListState)

//查询区域地址小区
export const getLoadOrVillageGroupListByDmResult =handleActions({
    'request LoadOrVillageGroup list byDm'(state,action){
        return{...state,loading:true}
    },
    'receive LoadOrVillageGroup list byDm'(state,action){
        const {req,res } = action.payload
        if(hasResponseError(res)){
            message.error(res.msg,10)
            return {...state,loading:false}
        }
        return{...res.data,loading:false}
    },

},detailResultListState)

//查询道路地址
export const getLoadListByDmResult =handleActions({
    'request load list byDm'(state,action){
        return{...state,loading:true}
    },
    'receive load list byDm'(state,action){
        const {req,res } = action.payload
        if(hasResponseError(res)){
            message.error(res.msg,10)
            return {...state,loading:false}
        }
        return{...res.data,loading:false}
    },

},detailResultListState)

//查询小区附属
export const houseXqFsByIdResult =handleActions({
    'request house xqFs byId'(state,action){
        return{...state,loading:true}
    },
    'receive house xqFs byId'(state,action){
        const {req,res } = action.payload
        if(hasResponseError(res)){
            message.error(res.msg,10)
            return {...state,loading:false}
        }
        return{...res.data,loading:false}
    },

},detailResultListState)

//发案情况的查询
export const caseMsgSearchResult = handleActions({//请求的结果
  'request case list'(state, action) {//请求前的状态
    return { ...state, loading: true }
  },
  'receive case list'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)
//关联发案情况
const addcaseMsg = () => ({  })
export const caseMsgAddResult = handleActions({
  'request caseMsg insert'(state, action) {
    return {...state, loading: false}
  },
  'receive caseMsg insert'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, addcaseMsg)
//删除发案情况
const caseMsgDelete= () => ({  })
export const caseMsgDeleteResult = handleActions({
  'request caseMsg delete'(state, action) {
    return { ...state, loading: false }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive caseMsg delete'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, caseMsgDelete)
//发案情况详情
const caseMsgResultState = {
  list: [],
}
export const caseMsgDetailResult = handleActions({
  'request caseMsg detail'(state, action) {
    return {...state, loading: true}
  },
  'receive caseMsg detail'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, caseMsgResultState)
//发案情况的修改
const updateCaseMsgResultState  = () => ({  })
export const updateCaseMsgResult = handleActions({
  'request caseMsg update'(state, action) {
    return {...state, loading: false}
  },
  'receive caseMsg update'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, updateCaseMsgResultState)

