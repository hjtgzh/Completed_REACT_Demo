import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'

// 获取房屋照片的列表
const getPicListState = {
    data:[],
}

export const picListResult = handleActions({
    'request get pic list'(state, action) {
        return { ...state, loading: true }
    },
    'receive get pic list'(state, action) {
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg, 3)
            return { ...state, loading: false }
        }
        return { ...res, loading: false }
    },
}, getPicListState)

// 获取全部房屋照片
const getAllPicState = {
    status:'',
}

export const AllPicResult = handleActions({
    'request get all pic'(state, action) {
        return { ...state, loading: false }
    },
    'receive get all pic'(state, action) {
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg, 3)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, getAllPicState)

// 保存房屋照片中的一条数据的变化
const savePicItemState = {
    status:'',
}

export const savePicItemResponse = handleActions({
    'request save pic item'(state, action) {
        return { ...state, loading: true }
    },
    'receive save pic item'(state, action) {
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg, 3)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, savePicItemState)

// 删除房屋照片表格中的一条数据
const deletePicItemState = {
    status:'',
}

export const deletePicItemResponse = handleActions({
    'request delete pic item'(state, action) {
        return { ...state, loading: true }
    },
    'receive delete pic item'(state, action) {
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg, 3)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, deletePicItemState)

const uploadPicState = {
    status:'',
}

// 上传图片
export const uploadPicResponse = handleActions({
    'request upload pic'(state, action) {
        return { ...state, loading: true }
    },
    'receive upload pic'(state, action) {
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg, 3)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, uploadPicState)