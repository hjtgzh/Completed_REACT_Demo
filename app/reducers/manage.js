import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

const deptResultState = {
  list: [],
}

export const userDeptResult = handleActions({
  'request userDept list'(state, action) {
    return {...state, loading: false}
  },
  'receive userDept list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, deptResultState)


const listResultState = {
  list: [],
}

export const userListResult = handleActions({
  'request user list'(state, action) {
    return {...state, loading: false}
  },
  'receive user list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, listResultState)



const detailResultState = {
  list: [],
}
export const userDetailResult = handleActions({
  'request user detail'(state, action) {
    return {...state, loading: false}
  },
  'receive user detail'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, detailResultState)


const detailUpdateResultState  = () => ({  })
export const userDetailUpdateResult = handleActions({
  'request userUpdate detail'(state, action) {
    return {...state, loading: false}
  },
  'receive userUpdate detail'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, detailUpdateResultState)


const userAddResultState  = () => ({  })
export const userAddResult = handleActions({
  'request user add'(state, action) {
    return {...state, loading: false}
  },
  'receive user add'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, userAddResultState)



const rloeDaleteState = {
  rloe: [],
}
export const deleteUserResult = handleActions({
  'request user delete'(state, action) {
    //return { ...state, loading: false }
    return {...state, loading: false}
  },
  'receive user delete'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, rloeDaleteState)


const userRolelistResultState = {
  list: [],
}

export const userRoleSetResult = handleActions({
  'request userRole list'(state, action) {
    return {...state, loading: true}
  },
  'receive userRole list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, userRolelistResultState)


const rloeSetState = () => {}
export const setUserRoleResult = handleActions({
  'request userRole set'(state, action) {
    //return { ...state, loading: false }
    return {...state, loading: false}
  },
  'receive userRole set'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, rloeSetState)
