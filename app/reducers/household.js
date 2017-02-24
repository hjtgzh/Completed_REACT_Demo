import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

const listResultState = {//请求时候的默认参数
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 15,
    totalCount: 0,
}

export const householdManagementListSearchResult = handleActions({//请求的结果
    'request household list'(state, action) {//请求前的状态
        return { ...state, loading: false }
    },
    'receive household list'(state, action) {//请求后的状态
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, listResultState)


//获取户号统计列表
const basicResultState = {//请求时候的默认参数
     list: [],
}

export const householdStatisticsListSearchResult = handleActions({//请求的结果
    'request household detail'(state, action) {//请求前的状态
        return { ...state, loading: false }
    },
    'receive household detail'(state, action) {//请求后的状态
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, basicResultState)


//解绑地址
const unbundlingResultState = {//请求时候的默认参数
    data:{}
}

export const unbundlingHouseholdResult = handleActions({//请求的结果
    'request unbundling detail'(state, action) {//请求前的状态
        return { ...state, loading: false }
    },
    'receive unbundling detail'(state, action) {//请求后的状态
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
}, unbundlingResultState)

//解绑地址
const bundlingResultState = {//请求时候的默认参数
    data:{}
}

export const bundlingHouseholdResult = handleActions({//请求的结果
    'request bundling detail'(state, action) {//请求前的状态
        return { ...state, loading: false }
    },
    'receive bundling detail'(state, action) {//请求后的状态
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
}, bundlingResultState)