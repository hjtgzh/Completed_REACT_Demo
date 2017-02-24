/**
 * Created by 余金彪 on 2017/1/4.检查记录
 */
import {ajax} from 'utils'

//获取单位检查记录详情
export const getCheckRecordInfo = ajax.fetchJSONByPost('/jcjw/department/queryJcjl')

//新增单位检查记录
export const insertCheckRecordInfo = ajax.fetchJSONByPost('/jcjw/department/insertJcjl')

//单位检查记录详情查询
export const queryJcjlDetail = ajax.fetchJSONByPost('/jcjw/department/queryJcjlDetail')

//单位检查记录修改保存
export const updateJcjl = ajax.fetchJSONByPost('/jcjw/department//updateJcjl')

//单位检查记录删除
export const deleteJcjl = ajax.fetchJSONByPost('/jcjw/department//deleteJcjl')

//根据dptid获取寄递业检查记录
export const getDepartmentJdyRecordByCompanyid = ajax.fetchJSONByPost('/jcjw/dpt/jdyrecord/getDepartmentJdyRecordByCompanyid')

//根据id获取寄递业检查记录
export const getDepartmentJdyRecordByid = ajax.fetchJSONByPost('/jcjw/dpt/jdyrecord/getDepartmentJdyRecordByid')

//删除获取寄递业检查记录
export const deleteDepartmentJdyRecordById = ajax.fetchJSONByPost('/jcjw/dpt/jdyrecord/deleteDepartmentJdyRecordById')

//
export const saveDepartmentJdyRecord = ajax.fetchJSONByPost('/jcjw/dpt/jdyrecord/saveDepartmentJdyRecord')