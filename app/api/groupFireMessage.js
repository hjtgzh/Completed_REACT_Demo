/**
 * Created by 余金彪 on 2017/1/10.消防信息
 */
import {ajax} from 'utils'

//查询单位的从业人员
export const insertSaveXfx = ajax.fetchJSONByPost('/jcjw/department/saveXfxx')

//单位消防信息查询
export const queryXfxx = ajax.fetchJSONByPost('/jcjw/department/queryXfxx')

//单位消防器材查询
export const queryXfxxXfqc = ajax.fetchJSONByPost('/jcjw/department/queryXfxxXfqc')

//单位消防器材新增或修改
export const saveXfxxXfqc = ajax.fetchJSONByPost('/jcjw/department/saveXfxxXfqc')

//单位消防器材信息删除
export const deleteXfxxXfqc = ajax.fetchJSONByPost('/jcjw/department/deleteXfxxXfqc')

//单位消防器材信息详情查询
export const queryXfqcDetail = ajax.fetchJSONByPost('/jcjw/department/queryXfqcDetail')