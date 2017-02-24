import {
  createAction,
} from 'redux-actions'
import {
  manage,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取模块列表的action
export const requestModuleList = createAction('request module list');
export const recevieModuleList = createAction('receive module list');
export const fetchModuleList = createAjaxAction(
  manage.moduleList,
  requestModuleList,
  recevieModuleList
);


// 模块列表更新以及重置的action
export const updateModuleListQuery = createAction('update moduleList search query', payload => payload);
export const resetModuleListQuery = createAction('reset moduleList search query');


//删除模块
export const requestDeleteModule = createAction('request module delete', payload => payload);
export const recevieDeleteModule = createAction('receive module delete', payload => payload);
export const fetchModuleDelete = createAjaxAction(
  manage.moduleDelete,
  requestDeleteModule,
  recevieDeleteModule
);

// 获取模块详情的action
export const requestModuleDetail = createAction('request module detail')
export const recevieModuleDetail = createAction('receive module detail')
export const fetchModuleDetail = createAjaxAction(
  manage.moduleDetail,
  requestModuleDetail,
  recevieModuleDetail
)

// 修改模块详情的action
export const requestModuleUpdateDetail = createAction('request moduleUpdate detail')
export const recevieModuleUpdateDetail = createAction('receive moduleUpdate detail')
export const fetchModuleUpdateDetail = createAjaxAction(
  manage.moduleUpdateDetail,
  requestModuleUpdateDetail,
  recevieModuleUpdateDetail
)


// 新增模块的action
export const requestModuleAdd = createAction('request module add')
export const recevieUModuleAdd = createAction('receive module add')
export const fetchModuleAdd = createAjaxAction(
  manage.moduleAdd,
  requestModuleAdd,
  recevieUModuleAdd
)

