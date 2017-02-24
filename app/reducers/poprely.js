/**
 * Created by lzr on 2016/11/22 0022.
 */
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

const queryResultState = () => ({
  keyword: { value: '' },
  division: { value: '' },
  institutions: { value: '' },
  houseStatus: { value: '' },
  addressType: { value: '' },
})

export const relyPeople = handleActions({
  'request rely'(state, action) {
    return { ...state, ...action.payload,loading: true }
},
'receive rely'(state, action) {
    return { ...listResultState}
  },
}, listResultState)


const detailResultState = {
  allowRole: {},
  shopInfo: {},
}

const basicInfoResultState ={
  data:{
  },
  // errorCode:"",
  // extraMsg:"",
  // msg:"",
  // status:'',
}
export const relyBasicResult = handleActions({
  'request basic info'(state, action) {
    console.log(state)
    return { ...state, loading: true }
  },
  'receive basic info'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg, 3)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, basicInfoResultState)

//更新详情表单
export const updateRelyBasicResult = handleActions({
  'request rely basic form query'(state, action) {
    console.log(state)
    return { ...state, loading: true }
  },
  'receive rely basic form query'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg, 3)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listResultState)

//更新详情类型
export const updateRelyBasicTypeResult = handleActions({
  'request rely basic type query'(state, action) {
    console.log(state)
    return { ...state, loading: true }
  },
  'receive rely basic type query'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg, 3)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listResultState)

//删除依靠力量
export const deleteRelyPeopleReuslt = handleActions({
  'request rely delete people'(state, action) {
    console.log(state)
    return { ...state, loading: true }
  },
  'recevie rely delete people'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg, 3)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listResultState)

//获取奖惩信息列表
export const relyRewardListResult = handleActions({
  'request rely reward list'(state, action) {
    return { ...state, loading: true }
  },
  'receive rely reward list'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg, 3)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, basicInfoResultState)


//更新奖惩信息
export const updateRewardListResult = handleActions({
  'request rely reward list update'(state, action) {
    return { ...state, loading: true }
  },
  'receive rely reward list update'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg, 3)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listResultState)

//添加奖惩信息
export const insertRewardListResult = handleActions({
  'request rely reward list insert'(state, action) {
    return { ...state, loading: true }
  },
  'receive rely reward list insert'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg, 3)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listResultState)

//删除奖惩信息
export const deleteRewardListResult = handleActions({
  'request rely reward list delete'(state, action) {
    return { ...state, loading: true }
  },
  'receive rely reward list delete'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg, 3)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listResultState)

export const relyBasicFormResult = handleActions({
  'request basic form detail'(state, action) {
    return { ...state, loading: false }
  },
  'receive basic form detail'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
        message.error(res.msg, 3)
        return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listResultState)