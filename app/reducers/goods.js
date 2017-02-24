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

export const goodsListSearchResult = handleActions({//请求的结果
  'request goods list'(state, action) {//请求前的状态
    return {...state, loading: false}
  },
  'receive goods list'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, listResultState)

const basicResultState = {//请求时候的默认参数
  // list: [],
  // currentPage: 1,
  // pageCount: 0,
  // pageSize: 20,
  // totalCount: 0,
  data: {}
}

export const goodsBasicSearchResult = handleActions({//请求的结果
  'request goods detail'(state, action) {//请求前的状态
    return {...state, loading: false}
  },
  'receive goods detail'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, basicResultState)

const editResultState = {//请求时候的默认参数
  data: {}
}

export const editGoodsDetailResult = handleActions({//请求的结果
  'request edit detail'(state, action) {//请求前的状态
    return {...state, loading: false}
  },
  'receive edit detail'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    } else {
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, editResultState)

const deleteResultState = {//请求时候的默认参数
  data: {}
}

export const deleteGoodsDetailResult = handleActions({//请求的结果
  'request delete detail'(state, action) {//请求前的状态
    return {...state, loading: false}
  },
  'receive delete detail'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    } else {
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, deleteResultState)


const unbundlingResultState = {//请求时候的默认参数
  data: {}
}

export const unbundlingGoodsdetailResult = handleActions({//请求的结果
  'request unbundling detail'(state, action) {//请求前的状态
    return {...state, loading: false}
  },
  'receive unbundling detail'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    } else {
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, unbundlingResultState)


// 物品管理-物品照片列表
const goodsPhotoListResultState = {//请求时候的默认参数
  list: [],
}

export const goodsPhotoListSearchResult = handleActions({//请求的结果
  'request photo list'(state, action) {//请求前的状态
    return {...state, loading: false}
  },
  'receive photo list'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, goodsPhotoListResultState)

// 物品管理-物品照片列表
const addGoodsPhotoResultState = {//请求时候的默认参数
  list: [],
}

export const addGoodsPhotoResult = handleActions({//请求的结果
  'request photo add'(state, action) {//请求前的状态
    return {...state, loading: false}
  },
  'receive photo add'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.info(res.msg)
    }
    return {...res.data, loading: false}
  },
}, addGoodsPhotoResultState)

// 物品管理-物品照片列表
const deleteGoodsPhotoResultState = {//请求时候的默认参数
  list: [],
}

export const deleteGoodsPhotoResult = handleActions({//请求的结果
  'request photo delete'(state, action) {//请求前的状态
    return {...state, loading: false}
  },
  'receive photo delete'(state, action) {//请求后的状态
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.info(res.msg)
    }
    return {...res.data, loading: false}
  },
}, deleteGoodsPhotoResultState)