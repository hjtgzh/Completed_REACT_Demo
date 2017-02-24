import {
  createAction,
} from 'redux-actions'

import {
  task,
} from 'api'
import {
  createAjaxAction,
} from 'utils'


// 获取工作任务列表的action
export const requestTaskList= createAction('request taskList list');
export const recevieTaskList = createAction('receive taskList list');
export const fetchTaskList= createAjaxAction(
	task.taskList,
	requestTaskList, 
	recevieTaskList
);

// 删除工作任务action
export const requestTaskDelete= createAction('request taskDelete list');
export const recevieTaskDelete = createAction('receive taskDelete list');
export const fetchTaskDelete= createAjaxAction(
	task.taskDelete,
	requestTaskDelete,
	recevieTaskDelete
);

// 获取工作任务详情的action
export const requestTaskDetail= createAction('request taskDetail list');
export const recevieTaskDetail = createAction('receive taskDetail list');
export const fetchTaskDetail= createAjaxAction(
	task.taskDetail,
	requestTaskDetail, 
	recevieTaskDetail
);

// 获取子任务列表action
export const requestChildTaskList= createAction('request childTaskList list');
export const recevieChildTaskList = createAction('receive childTaskList list');
export const fetchChildTaskList= createAjaxAction(
	task.childTaskList,
	requestTaskDetail,
	recevieTaskDetail
);

export const requestTaskAdd= createAction('request taskAdd list');
export const recevieTaskAdd = createAction('receive taskAdd list');
export const fetchTaskAdd= createAjaxAction(
	task.taskAdd,
	requestTaskAdd, 
	recevieTaskAdd
);