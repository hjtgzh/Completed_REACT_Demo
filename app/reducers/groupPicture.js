/**
 * Created by 余金彪 on 2017/1/18.
 */
import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'

// 获取照片的列表
const getPicListState = {
  list: [],
}

export const groupPicListResult = handleActions({
  'request pic list'(state, action) {
    return {...state, loading: false}
  },
  'receive pic list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, getPicListState)

// 删除照片
const deletePicState = {
  data:[],
}

export const deleteGroupPicResult = handleActions({
  'request pic delete'(state, action) {
    return { ...state, loading: true }
  },
  'receive pic delete'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }else{
      message.success(res.msg)
    }
    return { ...res, loading: false }
  },
}, deletePicState)