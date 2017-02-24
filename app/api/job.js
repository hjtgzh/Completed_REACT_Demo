import { ajax } from 'utils'

//从业人员列表
export const jobListList = ajax.fetchJSONByPost('/jcjw/cyry/query')
// 从业人员详情
export const peopleDetails = ajax.fetchJSONByPost('/jcjw/cyry/getDetailById')
//编辑从业人员数据
export const updatePeople = ajax.fetchJSONByPost('/jcjw/cyry/update')
//删除从业人员信息
export const deletePeople = ajax.fetchJSONByPost('/jcjw/cyry/deleteById')
//查询人员头像
export const peoplePic = ajax.fetchJSONByPost('/jcjw/resident/getPicBySfzh')
