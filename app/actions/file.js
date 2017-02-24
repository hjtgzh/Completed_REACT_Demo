//档案号管理
import {
  createAction,
} from 'redux-actions'
import {
  file,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取档案号列表的action
export const requestFileList= createAction('request fileList list');
export const recevieFileList = createAction('receive fileList list');
export const fetchFileList= createAjaxAction(
	file.fileList,
	requestFileList, 
	recevieFileList
);

// 绑定档案号action
export const requestInsertDah= createAction('request insertDah list');
export const recevieInsertDah = createAction('receive insertDah list');
export const fetchInsertDah= createAjaxAction(
	file.insertDah,
	requestInsertDah,
	recevieInsertDah
);

// 删除档案号action
export const requestDeleteDah= createAction('request deleteDah list');
export const recevieDeleteDah = createAction('receive deleteDah list');
export const fetchDeleteDah= createAjaxAction(
	file.deleteDah,
	requestDeleteDah,
	recevieDeleteDah
);

// 获取档案号统计列表的action
export const requestCountList= createAction('request countList list');
export const recevieCountList = createAction('receive countList list');
export const fetchCountList= createAjaxAction(
	file.fileCount,
	requestCountList, 
	recevieCountList
);