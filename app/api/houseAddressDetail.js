import { ajax } from 'utils'
//地址详情
export const houseAddressDetail = ajax.fetchJSONByPost('/jcjw/building/detail')
//修改地址
export const houseUpdateAddress = ajax.fetchJSONByPost('/jcjw/building/update')
//修改地址历史状态
export const houseUpdateHisState = ajax.fetchJSONByPost('/jcjw/building/updateHisState')
//删除历史地址
export const houseDelAddress = ajax.fetchJSONByPost('/jcjw/building/delete')
//修改经纬度
export const houseUpdateJwd = ajax.fetchJSONByPost('/jcjw/building/updateJwd')
//添加产权人
export const houseCqrAdd = ajax.fetchJSONByPost('/jcjw/building/addCqr')
//删除产权人
export const houseCqrDelete = ajax.fetchJSONByPost('/jcjw/cqr/delete')
//添加备注
export const houseRelatedbzAdd = ajax.fetchJSONByPost('/jcjw/related/addDzRelated')
//删除备注
export const houseRelatedbzDelete = ajax.fetchJSONByPost('/jcjw/related/delDzRelated')
//查询户号
export const HouseHh = ajax.fetchJSONByPost('/jcjw/hh/query')
//绑定户号
export const houseAddBuildHh = ajax.fetchJSONByPost('/jcjw/building/addBuildHh')
//解绑户号
export const houseDelBuildHh = ajax.fetchJSONByPost('/jcjw/building/delBuildHh')
//查询档案号
export const houseDah = ajax.fetchJSONByPost('/jcjw//dah/query')
//绑定档案号
export const houseAddBuildDah = ajax.fetchJSONByPost('/jcjw/building/addBuildDah')
//解绑档案号
export const houseDelBuildDah = ajax.fetchJSONByPost('/jcjw/building/delBuildDah')
//绑定地址二维码
export const houseAddBarCode = ajax.fetchJSONByPost('/jcjw/building/addBarCode')
//解绑地址二维码
export const houseDelBarCode = ajax.fetchJSONByPost('/jcjw/building/delBarCode')
//查询标准地址
export const houseBzdz = ajax.fetchJSONByPost('/jcjw/building/queryByUserGxdw')
//绑定标准地址
export const houseBdBzdz = ajax.fetchJSONByPost('/jcjw/building/bdBzdz')
//解绑标准地址
export const houseDelBzdz = ajax.fetchJSONByPost('/jcjw/building/delBdBzdz')
//添加责任区
export const houseAddZrq = ajax.fetchJSONByPost('/jcjw/building/relateZrq')
//解除责任区
export const houseDelZrq = ajax.fetchJSONByPost('/jcjw/building/relieveZrqRelate')
//合并地址
export const houseCombineBuilding = ajax.fetchJSONByPost('/jcjw/building/combineBuilding')
//区域地址
export const loadOrVillageGroupListByDm = ajax.fetchJSONByPost('/jcjw/czdlxq/getByCjwhDm')
//小区附属
export const houseXqFsById = ajax.fetchJSONByPost('/jcjw/fsqy/getByXqId')
//发案情况查询
export const caseMsg = ajax.fetchJSONByPost('/jcjw/case/queryCase.json')
//新增发案情况
export const caseMsgAdd = ajax.fetchJSONByPost('/jcjw/case/insertCase.json')
//发案情况的修改
export const caseMsgUpdate = ajax.fetchJSONByPost('/jcjw/case/updateCase.json')
//发案情况的详情
export const caseMsgDetail = ajax.fetchJSONByPost('/jcjw/case/getCaseDetail.json')

//发案情况的删除
export const caseMsgDelete = ajax.fetchJSONByPost('/jcjw/case/deleteCase.json')


