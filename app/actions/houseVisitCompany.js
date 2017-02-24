import {
  createAction,
} from 'redux-actions'
import {
  houseVisitCompany,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取现在单位
export const requestcompanyNowList = createAction('request companyNow list');
export const receviecompanyNowList = createAction('receive companyNow list');
export const fetchcompanyNowList = createAjaxAction(
	houseVisitCompany.companyList,
	requestcompanyNowList,
	receviecompanyNowList
);

// 获取曾经单位
export const requestcompanyOnceList = createAction('request companyOnce list');
export const receviecompanyOnceList = createAction('receive companyOnce list');
export const fetchcompanyOnceList = createAjaxAction(
	houseVisitCompany.companyList,
	requestcompanyOnceList,
	receviecompanyOnceList
);
// 搜索法人代表信息
export const requestCompanyLegelPersonSearch = createAction('request CompanyLegelPerson list');
export const recevieCompanyLegelPersonSearch = createAction('receive CompanyLegelPerson list');
export const fetchCompanyLegelPersonSearch = createAjaxAction(
    houseVisitCompany.companyLegelPersonSearch,
    requestCompanyLegelPersonSearch,
    recevieCompanyLegelPersonSearch
);

// 新建单位
export const requestcompanyAddList = createAction('request companyAdd list');
export const receviecompanyAddList = createAction('receive companyAdd list');
export const fetchcompanyAddList = createAjaxAction(
	houseVisitCompany.companyAddList,
	requestcompanyAddList,
	receviecompanyAddList
);

// 删除曾经单位
export const requestcompanyOnceDelete = createAction('request companyOnce delete');
export const receviecompanyOnceDelete = createAction('receive companyOnce delete');
export const fetchcompanyOnceDelete = createAjaxAction(
	houseVisitCompany.companyOnceDelete,
	requestcompanyOnceDelete,
	receviecompanyOnceDelete
);

// 调档查询
export const requestcompanyTransSearch = createAction('request companyTrans search');
export const receviecompanyTransSearch = createAction('receive companyTrans search');
export const fetchcompanyTransSearch = createAjaxAction(
	houseVisitCompany.companyTransSearch,
	requestcompanyTransSearch,
	receviecompanyTransSearch
);


// 调档插入
export const requestcompanyTransInsert = createAction('request companyTrans insert');
export const receviecompanyTransInsert = createAction('receive companyTrans insert');
export const fetchcompanyTransInsert = createAjaxAction(
	houseVisitCompany.companyTransInsert,
	requestcompanyTransInsert,
	receviecompanyTransInsert
);