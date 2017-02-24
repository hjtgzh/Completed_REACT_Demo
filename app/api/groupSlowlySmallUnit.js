/**
 * Created by 余金彪 on 2016/12/30.单位低慢小
 */
import { ajax } from 'utils'

//获取单位低慢小详情
export const getSmallUnitInfo = ajax.fetchJSONByPost('/jcjw/dptArticle/detail')

//新增物品
export const getSlowlyAddGoods = ajax.fetchJSONByPost('/jcjw/article/insert')

//保存低慢小详情
export const saveSlowly = ajax.fetchJSONByPost('/jcjw/dptArticle/update')

//低慢小关联物品身份证查询
export const searchSlowlyIdnumber = ajax.fetchJSONByPost('/jcjw/article/searchBySfz')

//低慢小关联物品关联
export const bindSmallUnitInfo = ajax.fetchJSONByPost('/jcjw/article/bind')

//低慢小绑定查询
export const getBindSmallUnitInfo = ajax.fetchJSONByPost('/jcjw/article/getBindArticle')

//低慢小解绑
export const unBindSmallUnitInfo = ajax.fetchJSONByPost('/jcjw/article/unBind')

//低慢小物品操作人详情
export const smallUnitDetail = ajax.fetchJSONByPost('/jcjw/article/getOperator')

//新增低慢小物品操作人
export const saveSmallUnitDetail = ajax.fetchJSONByPost('/jcjw/article/saveOperator')