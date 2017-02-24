import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

// 治安情况列表的action-ytt
const listResultState = {//请求时候的默认参数
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
}

export const securityListSearchResult = handleActions({//请求的结果
    'request security list'(state, action) {//请求前的状态
        return { ...state, loading: false }
    },
    'receive security list'(state, action) {//请求后的状态
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, listResultState)


// 治安详情action-ytt
const detailResultState = {//请求时候的默认参数
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
}

export const securityDetailSearchResult = handleActions({//请求的结果
    'request security detail'(state, action) {//请求前的状态
        return { ...state, loading: false }
    },
    'receive security detail'(state, action) {//请求后的状态
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, detailResultState)

// 治安详情action-ytt
const addResultState = {//请求时候的默认参数
}

export const securityAddSearchResult = handleActions({//请求的结果
    'request security add'(state, action) {//请求前的状态
        return { ...state, loading: false }
    },
    'receive security add'(state, action) {//请求后的状态
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg,3)
            return { ...state, loading: false }
        }else{
            message.success(res.msg,3)
        }
        return { ...res.data, loading: false }
    },
}, addResultState)


// 治安日志action-ytt
const securityLogListState = {//请求时候的默认参数
    list : [],
    pageCount : 0
}

export const securityLogListResult = handleActions({//请求的结果
    'request securityLog list'(state, action) {//请求前的状态
        return state
    },
    'receive securityLog list'(state, action) {//请求后的状态
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg,3)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, securityLogListState)


