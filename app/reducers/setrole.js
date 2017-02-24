import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'


const listResultState = {
  list: [],
}

export const roleListResult = handleActions({
  'request role list'(state, action) {
    return {...state, loading: true}
  },
  'receive role list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, listResultState)

const addResultState = () => ({  })
export const roleAddResult = handleActions({
  'request role add'(state, action) {
    return {...state, loading: false}
  },
  'receive role add'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, addResultState)


const detailResultState = {
  id: '',
  sort: '',
}
export const roleDetailManagResult = handleActions({
  'request role detail'(state, action) {
    return {...state, loading: false}
  },
  'receive role detail'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, detailResultState)


const roleUpdateResultState  = () => ({  })
export const roleDetailUpdateResult = handleActions({
  'request role update'(state, action) {
    return {...state, loading: false}
  },
  'receive role update'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, roleUpdateResultState)





const roleDeleteState = () => ({  })
export const roleDeleteResult = handleActions({
  'request role delete'(state, action) {
    return { ...state, loading: false }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive role delete'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, roleDeleteState)



const moduleListInRoleState = () => ({  })
export const roleModuleListInRoleResult = handleActions({
  'request moduleList inRole'(state, action) {
    return { ...state, loading: true }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive moduleList inRole'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, moduleListInRoleState)


const rloeResState = () => ({  })
export const rloeResResult = handleActions({
  'request role res'(state, action) {
    return { ...state, loading: false }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive role res'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, rloeResState)


const updateRloeResState = () => ({  })
export const updateRloeResResult = handleActions({
  'request roleRes update'(state, action) {
    return { ...state, loading: false }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive roleRes update'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, updateRloeResState)


const rolePeopleState = () => ({  })
export const rolePeopleResult = handleActions({
  'request role people'(state, action) {
    return { ...state, loading: true }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive role people'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }
    return {...res.data, loading: false}
  },
}, rolePeopleState)


const deleteRolePeopleState = () => ({  })
export const deleteRolePeopleResult = handleActions({
  'request rolePeople delete'(state, action) {
    return { ...state, loading: false }
    const { id } = action.payload
    //return state.filter(item => item.id !== id)
  },
  'receive rolePeople delete'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return {...state, loading: false}
    }else{
      message.success(res.msg)
    }
    return {...res.data, loading: false}
  },
}, deleteRolePeopleState)