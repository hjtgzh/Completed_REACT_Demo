/**
 * Created by 余金彪 on 2016/12/30.单位低慢小
 */
import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'


const getSmallUnitInfoResultState = {

}
//获取低慢小详情
export const getSmallUnitInfoResult = handleActions({
  'request slowlySmallUnit'(state, action) {
    return {...state, loading: true}
  },
  'receive slowlySmallUnit'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
},getSmallUnitInfoResultState)

//新增物品
const getSmallGoodsState = {

}
export const getSmallGoods = handleActions({
  'request SlowlyAddGoods'(state, action) {
    return {...state, loading: true}
  },
  'receive SlowlyAddGoods'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
},getSmallGoodsState)

//保存低慢小
const saveSmallInfo = {

}
export const updateSmallInfo = handleActions({
  'request SlowlyInfo'(state, action) {
    return {...state, loading: true}
  },
  'receive SlowlyInfo'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
},saveSmallInfo)

////低慢小关联物品身份证查询
const getSmallByIdnumber = {

}
export const searchSmalByIdnumber = handleActions({
  'request SlowlyIdnumber'(state, action) {
    return {...state, loading: true}
  },
  'receive SlowlyIdnumber'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
},getSmallByIdnumber)

//低慢小关联物品关联
const getBindSmallByIdnumber = {

}
export const searchBindSmalByIdnumber = handleActions({
  'request bindSlowlyIdnumber'(state, action) {
    return {...state, loading: true}
  },
  'receive bindSlowlyIdnumber'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res, loading: false}
  },
},getBindSmallByIdnumber)

//低慢小绑定查询
const receiveBindSmallByIdnumber = {

}
export const getBindSmalByIdnumber = handleActions({
  'request getBindSlowlyIdnumber'(state, action) {
    return {...state, loading: true}
  },
  'receive getBindSlowlyIdnumber'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res, loading: false}
  },
},receiveBindSmallByIdnumber)

//低慢小解绑
const unBindSmallByIdnumber = {

}
export const unBindSmalByIdnumber = handleActions({
  'request unBindSlowly'(state, action) {
    return {...state, loading: true}
  },
  'receive unBindSlowly'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
},unBindSmallByIdnumber)

//低慢小物品操作人详情
const detailSmall = {

}
export const searchSmalDetail = handleActions({
  'request SlowlyDetail'(state, action) {
    return {...state, loading: true}
  },
  'receive SlowlyDetail'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res, loading: false}
  },
},detailSmall)

//新增低慢小物品操作人
const getDetailSmall = {

}
export const saveSmalDetail = handleActions({
  'request saveSlowlyDetail'(state, action) {
    return {...state, loading: true}
  },
  'receive saveSlowlyDetail'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res, loading: false}
  },
},getDetailSmall)