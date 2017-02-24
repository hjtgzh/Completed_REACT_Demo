/**
 * Created by 余金彪 on 2017/1/5.处罚记录
 */

import {ajax} from 'utils'

//获取单位处罚记录详情
export const getPunishRecordInfo = ajax.fetchJSONByPost('/jcjw/department/queryCfjl')

//新增单位处罚记录
export const insertPunishRecordInfo = ajax.fetchJSONByPost('/jcjw/department/insertCfjl')

//单位处罚记录查询详情
export const queryCfjlDetail = ajax.fetchJSONByPost('/jcjw/department/queryCfjlDetail')

//单位处罚记录删除
export const deleteCfjlDetail = ajax.fetchJSONByPost('/jcjw/department/deleteCfjl')

//单位处罚记录修改
export const updateCfjlDetail = ajax.fetchJSONByPost('/jcjw/department/updateCfjl')