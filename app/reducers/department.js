import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'

// 获取组织结构的列表
const departmentState = {
	list:[]
}
export const departmentListResult = handleActions({
  'request department list'(state, action) {
    return { ...state, loading: true }
  },
  'receive department list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, departmentState)

// 获取组织结构的列表
const addDepartmentState = {}
export const addDepartmentResult = handleActions({
  'request add department'(state, action) {
    return { ...state, loading: true }
  },
  'receive add department'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 10)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, addDepartmentState)

// 在调档中根据单位名称查询的结果
const searchStateByDepartmentName = {list:[]}
export const searchResultByDepartmentName = handleActions({
  'request search department name'(state, action) {
    return state
  },
  'receive search department name'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return {...state}
    }
    return {...res.data}
  },
}, searchStateByDepartmentName)

// 调档中根据工商执照代码查询的结果
const searchStateByBusinessCode = {list:[]}
export const searchResultByBusinessCode = handleActions({
  'request search business code'(state, action) {
    return state
  },
  'receive search business code'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return {...state}
    }
    return {...res.data}
  },
}, searchStateByBusinessCode)

// 调档中根据法人查询的结果
const searchStateByLegalPerson = {list:[]}
export const searchResultByLegalPerson = handleActions({
  'request search legal person'(state, action) {
    return state
  },
  'receive search legal person'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return {...state}
    }
    return {...res.data}
  },
}, searchStateByLegalPerson)

const exeTransferFileState = {}
export const exeTransferFileResult = handleActions({
  'request transfer file'(state, action) {
    return state
  },
  'receive transfer file'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 10)
      return {...state,index:req[0].$$index}
    }
    return {...res.data,index:req[0].$$index}
  },
}, exeTransferFileState)

// 获取头部每项的统计值
const statisticsState = {}
export const statisticsResult = handleActions({
  'request all retrieval num'(state, action) {
    return {...state,loading:true}
  },
  'receive all retrieval num'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 5)
      return {...state,loading:false}
    }
    return {...res.data,loading:false}
  },
}, statisticsState)


//获取详情基本信息
const departmentDetail = {
  currentPage:1,
  totalCount:2,
  pageSize:10,
}
export const departmentDetailInfo = handleActions({
  'request detail info'(state, action) {
    return { ...state, loading: false }
  },
  'receive detail info'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { data: res.data, loading: false }
  },
}, departmentDetail)

//从业人员查询
const groupEmployee = {
  currentPage:1,
  totalCount:2,
  pageSize:10,
}
export const getGroupEmployeeInfo = handleActions({
  'request employee info'(state, action) {
    return { ...state, loading: false }
  },
  'receive employee info'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { data: res.data, loading: false }
  },
}, groupEmployee)

//处罚记录查询
const groupPunishRecord = {
  currentPage:1,
  totalCount:2,
  pageSize:10,
}
export const searchGroupPunishRecord = handleActions({
  'request punishRecord info'(state, action) {
    return { ...state, loading: false }
  },
  'receive punishRecord info'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { data: res.data, loading: false }
  },
}, groupPunishRecord)
//处罚记录新增
const groupPunishRecordAdd = {
  list:[]
}
export const addGroupPunishRecord = handleActions({
  'request addPunishRecord info'(state, action) {
    return { ...state, loading: false }
  },
  'receive addPunishRecord info'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { data: res.data, loading: false }
  },
},groupPunishRecordAdd)
//处罚记录详情
const groupPunishRecordDetail = {
  list:[]
}
export const getGroupPunishRecordDetail  = handleActions({
  'request addPunishDetail info'(state, action) {
    return { ...state, loading: false }
  },
  'receive addPunishDetail info'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { data: res.data, loading: false }
  },
}, groupPunishRecordDetail)

//消防信息查询
const GroupFireMessage = {
  list:[]
}
export const searchGroupFireMessage  = handleActions({
  'request groupFireMessage info'(state, action) {
    return { ...state, loading: false }
  },
  'receive groupFireMessage info'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { data: res.data, loading: false }
  },
}, GroupFireMessage)

//新增消防信息
const GroupFireMessageAdd = {
  list:[]
}
export const updateGroupFireMessage  = handleActions({
  'request updateGroupFireMessage info'(state, action) {
    return { ...state, loading: false }
  },
  'receive updateGroupFireMessage info'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { data: res.data, loading: false }
  },
}, GroupFireMessageAdd)

//消防器材查询
const GroupFireEquipment = {
  list:[]
}
export const searchGroupFireEquipment  = handleActions({
  'request getFireEquipment info'(state, action) {
    return { ...state, loading: false }
  },
  'receive getFireEquipment info'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { data: res.data, loading: false }
  },
}, GroupFireEquipment)

//消防器材保存
const saveFireEquipment = {
  list:[]
}
export const updateGroupFireEquipment  = handleActions({
  'request saveFireEquipment info'(state, action) {
    return { ...state, loading: false }
  },
  'receive saveFireEquipment info'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { data: res.data, loading: false }
  },
}, saveFireEquipment)

//单位-访查日志

const departmentLogResult = {
  list : [],
  totalCount : 0,
}
export const fetchDepartmentLogResult = handleActions({
  'request departmentLog'(state, action) {
    return  { ...state, loading: true }
  },
  'receive departmentLog'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, departmentLogResult)

//获取单位名称
const departmentNameResult = {
  dwmc : ""
}
export const fetchDepartmentNameResult = handleActions({
  'request department name'(state, action) {
    return  state
  },
  'receive department name'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, departmentNameResult)