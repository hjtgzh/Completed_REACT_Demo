import {
  createAction,
} from 'redux-actions'
import {
  gunUnit,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取枪支单位信息
export const requestGetGunUnitInfo = createAction('request get gun unit info');
export const recevieGetGunUnitInfo = createAction('receive get gun unit info');
export const getGunUnitInfo = createAjaxAction(
	gunUnit.getInfo, 
	requestGetGunUnitInfo, 
	recevieGetGunUnitInfo
);

// 保存枪支单位信息
export const requestSaveGunUnitInfo = createAction('request save gun unit info');
export const recevieSaveGunUnitInfo = createAction('receive save gun unit info');
export const saveGunUnitInfo = createAjaxAction(
	gunUnit.saveInfo, 
	requestSaveGunUnitInfo, 
	recevieSaveGunUnitInfo
);


// 查询单位类别
export const requestCompanyType = createAction('request company type');
export const recevieCompanyType = createAction('receive company type');
export const getCompanyType = createAjaxAction(
	gunUnit.getDwlb, 
	requestCompanyType, 
	recevieCompanyType
);

// 查询单位性质
export const requestCompanyProp = createAction('request company prop');
export const recevieCompanyProp = createAction('receive company prop');
export const getCompanyProp = createAjaxAction(
	gunUnit.getDwxz, 
	requestCompanyProp, 
	recevieCompanyProp
);