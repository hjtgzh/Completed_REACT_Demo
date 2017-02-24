import { ajax } from 'utils'

export const taskList = ajax.fetchJSONByPost('/jcjw/task/taskbig/getTaskBig')
export const taskDetail = ajax.fetchJSONByPost('/jcjw/task/taskbig/getTaskBigById')
export const childTaskList = ajax.fetchJSONByPost('/jcjw/task/task/getTaskByTaskBigId')
export const taskDelete = ajax.fetchJSONByPost('/jcjw/task/taskbig/deleteTaskBig')
export const taskAdd = ajax.fetchJSONByPost('/jcjw/task/taskbig/insertTaskBig')