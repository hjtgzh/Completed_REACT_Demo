import {
  createAction,
} from 'redux-actions'
import {
  manage,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取用户管理左侧分类列表的action
export const requestUserDeptList = createAction('request userDept list');
export const recevieUserDeptList = createAction('receive userDept list');
export const fetchUserDepttList = createAjaxAction(
  manage.userDept,
  requestUserDeptList,
  recevieUserDeptList
);

// 获取用户列表的action
export const requestUserList = createAction('request user list');
export const recevieUserList = createAction('receive user list');
export const fetchUserList = createAjaxAction(
  manage.userList,
  requestUserList,
  recevieUserList
);

// 获取用户详情的action
export const requestUserDetail = createAction('request user detail')
export const recevieUserDetail = createAction('receive user detail')
export const fetchUserDetail = createAjaxAction(
  manage.userDetail,
  requestUserDetail,
  recevieUserDetail
)
// 修改用户详情的action
export const requestUserDetailUpdate = createAction('request userUpdate detail')
export const recevieUserDetailUpdate = createAction('receive userUpdate detail')
export const fetchUserDetailUpdate = createAjaxAction(
  manage.userUpdate,
  requestUserDetailUpdate,
  recevieUserDetailUpdate
)
// 新增用户
export const requestUserAdd = createAction('request user add')
export const recevieUserAdd = createAction('receive user add')
export const fetchUserAdd = createAjaxAction(
  manage.userAdd,
  requestUserAdd,
  recevieUserAdd
)

//删除用户
export const requestDeleteUser = createAction('request user delete');
export const recevieDeleteUser = createAction('receive user delete');
export const fetchUserDelete = createAjaxAction(
  manage.userDelete,
  requestDeleteUser,
  recevieDeleteUser
);

// 获取角色列表的action
export const requestUserRoleList = createAction('request userRole list');
export const recevieUserRoleList = createAction('receive userRole list');
export const fetchUserRoleList = createAjaxAction(
  manage.roleList,
  requestUserRoleList,
  recevieUserRoleList
);

// 修改用户角色的action
export const requestUserSetRole = createAction('request userRole set')
export const recevieUserSetRole = createAction('receive userRole set')
export const fetchUserSetRole = createAjaxAction(
  manage.userSetRole,
  requestUserSetRole,
  recevieUserSetRole
)

