/**
 * Created by 余金彪 on 2017/1/7.从业人员
 */
import {ajax} from 'utils'

//查询单位的从业人员
export const getQueryAllCyry = ajax.fetchJSONByPost('/jcjw/cyry/queryAllCyry')

//单位从业人员导入
export const getImportCyry = ajax.fetchJSONByPost('/jcjw/cyry/importCyry')

//新增从业人员
export const getInsertCyry = ajax.fetchJSONByPost('/jcjw/cyry/insertCyry')

//根据从业人员id集合删除从业人员
export const deleteByIdList = ajax.fetchJSONByPost('/jcjw/cyry/deleteByIdList')

//查询人员
export const getBaseBySfzh = ajax.fetchJSONByPost('/jcjw/resident/getBaseBySfzh')

//查询国籍
export const findGjByGjmc = ajax.fetchJSONByPost('/jcjw/resident/findGjByGjmc')

//查询境外人员
export const getBaseFromJw = ajax.fetchJSONByPost('/jcjw/resident/getBaseFromJw')

//从业人员导入
export const exportTemplate = ajax.fetchJSONByPost('/jcjw/cyry/exportTemplate')
