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

export const oldListSearchResult = handleActions({
    'request oldList list'(state, action) {
        return { ...state, loading: false }
    },
    'receive oldList list'(state, action) {
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, listResultState)

const queryResultState = () => ({
    keyword: { value: '' },
    division: { value: '' },
    institutions: { value: '' },
    oldStatus: { value: '' },
    addressType: { value: '' },
})

export const oldListSearchQuery = handleActions({
    'update oldList search query'(state, action) {
        return { ...state, ...action.payload }
    },
    'reset oldList search query'(state, action) {
        return { ...queryResultState() }
    },
}, queryResultState())


const detailResultState = {
    allowRole: {},
    shopInfo: {},
}
export const oldDetailsResult = handleActions({
    'request old details'(state, action) {
        return { ...state, loading: false }
    },
    'receive old details'(state, action) {
        const { res } = action.payload
        if (hasResponseError(res)) {
            message.error(res.msg)
            return { ...state, loading: false }
        }
        return { ...res.data, loading: false }
    },
}, detailResultState)