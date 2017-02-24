import { ajax } from 'utils'

/*
* 管辖单位
* */

//获取分局、派出所、责任区
export const unitStationList =ajax.fetchJSONByPost('/jcjw/gxdw/getByPdm')
//查询对应的行政区划
export const unitGetRelateDivisionList=ajax.fetchJSONByPost('/jcjw/gxdw/getRelateXzqh')
//修改管辖单位和行政区划关联关系
export const unitEditRelationOfDivision=ajax.fetchJSONByPost('/jcjw/gxdw/updateGxdwXzqhRelate')
//新增责任区
export const responseAreaAdd=ajax.fetchJSONByPost('/jcjw/gxdw/addZrq')
//修改责任区
export const responseAreaUpdate=ajax.fetchJSONByPost('/jcjw/gxdw/updateZrqName')
//查看责任区民警
export const responseAreaPoliceList = ajax.fetchJSONByPost('/jcjw/zrq/mjList')
//查看责任区可以添加的警员列表
export const policeList = ajax.fetchJSONByPost('/jcjw/sys/user/query')
//警员的新增
export const addPolice = ajax.fetchJSONByPost('/jcjw/zrq/insert')
//责任区民警的删除
export const deleteResponsePolice = ajax.fetchJSONByPost('/jcjw/zrq/delete')
//查看责任区关联地址/可关联地址
export const responseAddress = ajax.fetchJSONByPost('/jcjw/building/query')
//关联地址的新增
export const addAddress = ajax.fetchJSONByPost('/jcjw/building/relateZrq')
//责任区关联地址的删除
export const deleteResponseAddress = ajax.fetchJSONByPost('/jcjw/building/relieveZrqRelate')

//----------------------------------
/*
* 行政区划
* */

//查询行政区划下对应的管辖单位
export const getDivisionRelateUnitList=ajax.fetchJSONByPost('/jcjw/xzqh/getRelateGxdw')
//修改行政区划下对应的管辖单位
export const updateDivisionRelateUnit=ajax.fetchJSONByPost('/jcjw/xzqh/updateXzqhGxdwRelate')
//根据村居委会id和类型查询1：道路；3：村组；
export const loadOrVillageGroupList=ajax.fetchJSONByPost('/jcjw/czdlxq/getByCjwhId')
//根据村居委会id查询街路巷列表(区域地址)
export const areaAddressList=ajax.fetchJSONByPost('/jcjw/building/getJlxList')

//------------------------------------


/*
 *
 * 以下为申报管理接口
 *
 */
//县区-街道-社区
export const declarManage = ajax.fetchJSONByPost('/jcjw/xzqh/getByPdm')
//道路-小区-村组-附属区苑
export const declarManageBranch = ajax.fetchJSONByPost('/jcjw/dzsb/query')
//附属区苑小区列表
export const villageManageBranch = ajax.fetchJSONByPost('/jcjw/czdlxq/getByCjwhId')
//新增道路-小区-村组-附属区苑
export const addDeclar = ajax.fetchJSONByPost('/jcjw/dzsb/add')
//修改道路-小区-村组-附属区苑
export const updateDeclar = ajax.fetchJSONByPost('/jcjw/dzsb/editName')
//删除道路-小区-村组-附属区苑
export const deleteDeclar = ajax.fetchJSONByPost('/jcjw/dzsb/delete')
//通过道路-小区-村组-附属区苑
export const passDeclar = ajax.fetchJSONByPost('/jcjw/dzsb/auditPass')

//地址统计
export const fetchAddressStatisticsList = ajax.fetchJSONByPost('/jcjw/building/tongji')