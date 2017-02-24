import {
  createAction,
} from 'redux-actions'
import {
  manage,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取角色列表的action
export const requestRoleList = createAction('request role list');
export const recevieRoleList = createAction('receive role list');
export const fetchRoleList = createAjaxAction(
  manage.roleList,
  requestRoleList,
  recevieRoleList
);

// 新增角色的action
export const requestRoleAdd = createAction('request role add')
export const recevieRoleAdd = createAction('receive role add')
export const fetchRoleAdd = createAjaxAction(
  manage.roleAdd,
  requestRoleAdd,
  recevieRoleAdd
)


// 获取角色详情的action
export const requestRoleDetail = createAction('request role detail')
export const recevieRoleDetail = createAction('receive role detail')
export const fetchRoleDetail = createAjaxAction(
  manage.roleDetail,
  requestRoleDetail,
  recevieRoleDetail
)



// 修改角色详情的action
export const requestRoleUpdate = createAction('request role update')
export const recevieRoleUpdate = createAction('receive role update')
export const fetchRoleUpdate = createAjaxAction(
  manage.roleUpdate,
  requestRoleUpdate,
  recevieRoleUpdate
)

//删除角色
export const requestDeleteRole = createAction('request role delete');
export const recevieDeleteRole = createAction('receive role delete');
export const fetchRoleDelete = createAjaxAction(
  manage.roleDelete,
  requestDeleteRole,
  recevieDeleteRole
);

//模块列表
export const requestModuleListInRole = createAction('request moduleList inRole');
export const recevieModuleListInRole = createAction('receive moduleList inRole');
export const fetchModuleListInRole = createAjaxAction(
  manage.moduleListInRole,
  requestModuleListInRole,
  recevieModuleListInRole
);
//角色权限
export const requestRloeRes = createAction('request role res');
export const recevieRloeRes = createAction('receive role res');
export const fetchRloeRes = createAjaxAction(
  manage.getRloeRes,
  requestRloeRes,
  recevieRloeRes
);
//修改角色权限
export const requestUpdateRloeRes = createAction('request roleRes update');
export const recevieUpdateRloeRes = createAction('receive roleRes update');
export const fetchUpdateRloeRes = createAjaxAction(
  manage.updateRloeRes,
  requestUpdateRloeRes,
  recevieUpdateRloeRes
);
//角色下警员
export const requestRolePeople = createAction('request role people');
export const recevieRolePeople = createAction('receive role people');
export const fetchRolePeople = createAjaxAction(
  manage.getRolePeople,
  requestRolePeople,
  recevieRolePeople
);
//删除角色下警员
export const requestDeleteRolePeople = createAction('request rolePeople delete');
export const recevieDeleteRolePeople = createAction('receive rolePeople delete');
export const fetchRoleDeletePeople = createAjaxAction(
  manage.deleteRolePeople,
  requestDeleteRolePeople,
  recevieDeleteRolePeople
);


