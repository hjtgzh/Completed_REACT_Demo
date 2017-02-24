import {
  createAction,
} from 'redux-actions'
import {
  rely
} from 'api'
import {
  createAjaxAction,
} from 'utils'
console.log(rely)
// debugger
// 获取采集人口的action
export const requestRelyList = createAction('request relyList list');
export const recevieRelyList = createAction('receive relyList list');
export const fetchRelyList = createAjaxAction(
	rely.RelyList, 
	requestRelyList, 
	recevieRelyList
);

// 房屋列表更新以及重置的action
export const updateRelyListQuery  = createAction('update relyList search query', payload => payload);
export const resetRelyListQuery = createAction('reset relyList search query');

// 获取建筑物详情的action
export const requestRelyDetail = createAction('request rely detail')
export const recevieRelyDetail = createAction('receive rely detail')
export const fetchRelyDetail = createAjaxAction(rely.RelyDetail, requestRelyDetail, recevieRelyDetail)
// 获取身份证详情查询的action
export const requestIDcardDetail = createAction('request IDcard detail');
export const recevieIDcardDetail = createAction('receive IDcard detail');
export const fetchIDcard = createAjaxAction(
	rely.IDcardDetail, 
	requestIDcardDetail, 
	recevieIDcardDetail
);
// 保存新增依靠力量的action
export const requestAddRelyPower = createAction('request addRelyPower detail');
export const recevieAddRelyPower = createAction('receive addRelyPower detail');
export const fetchAddRelyPower = createAjaxAction(
	rely.AddRelyPower, 
	requestAddRelyPower, 
	recevieAddRelyPower
);
// 删除依靠力量的action
export const requestDeleteDetail = createAction('request delete detail');
export const recevieDeleteDetail = createAction('receive delete detail');
export const fetchDeleteDetail = createAjaxAction(
	rely.DeleteDetail, 
	requestDeleteDetail, 
	recevieDeleteDetail
);
// 导出数据的action
export const requestExportData = createAction('request exportData detail');
export const recevieExportData = createAction('receive exportData detail');
export const fetchExportData = createAjaxAction(
	rely.ExportData, 
	requestExportData, 
	recevieExportData
);
// 新增依靠力量里面个人情况的action--黄建停
export const requestPeopleSituation = createAction('request peopleSituation detail');
export const receviePeopleSituation = createAction('receive peopleSituation detail');
export const fetchPeopleSituation = createAjaxAction(
	rely.PeopleSituation, 
	requestPeopleSituation, 
	receviePeopleSituation
);
// 导入依靠力量模板的action--黄建停
export const requestExportRelyPower = createAction('request exportRelyPower detail');
export const recevieExportRelyPower = createAction('receive exportRelyPower detail');
export const fetchExportRelyPower = createAjaxAction(
	rely.exportRelyPower, 
	requestExportRelyPower, 
	recevieExportRelyPower
);
// 身份证详情更新的action
export const updateIDcardQuery  = createAction('update IDcard search query', payload => payload);