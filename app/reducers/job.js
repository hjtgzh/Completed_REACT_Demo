import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

const listResultState = {//请求时候的默认参数
    list: [],
    currentPage: 1,
    pageCount: 0,
    pageSize: 20,
    totalCount: 0,
}
//获取从业人员列表
export const jobListSearchResult = handleActions({//请求的结果
    'request jobList list'(state, action) {//请求前的状态
        return { ...state, loading: false }
    },
    'receive jobList list'(state, action) {//请求后的状态
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, listResultState)

const peopleResultState = {//请求时候的默认参数
    data:{}
}
//获取详情
export const peopleDetailsSearchResult = handleActions({//请求的结果
    'request job detail'(state, action) {//请求前的状态
        return { ...state, loading: false }
    },
    'receive job detail'(state, action) {//请求后的状态
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, peopleResultState)

const peopleUpdate = {//请求时候的默认参数
    data:{}
}

//编辑从业人员详情
export const peopleDetailsUpdate = handleActions({//请求的结果
    'request jobList update'(state, action) {//请求前的状态
        return { ...state, loading: false }
    },
    'receive jobList update'(state, action) {//请求后的状态
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
}, peopleUpdate)

const peopleDelete = {//请求时候的默认参数
    data:{}
}

//删除从业人员详情
export const peopleDetailsDelete = handleActions({//请求的结果
    'request job delete'(state, action) {//请求前的状态
        return { ...state, loading: false }
    },
    'receive job delete'(state, action) {//请求后的状态
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }else{
            message.success("删除成功！")
        }
        return { ...res.data, loading: false }
    },
}, peopleDelete)

const peoplePicResultState = {//请求时候的默认参数
}
//获取头像
export const peoplePicSearchResult = handleActions({//请求的结果
    'request job pic'(state, action) {//请求前的状态
        return { ...state, loading: false }
    },
    'receive job pic'(state, action) {//请求后的状态
        peoplePicSearchResult
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, peoplePicResultState)



