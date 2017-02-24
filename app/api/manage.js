import { ajax } from 'utils'

export const userDept = ajax.fetchJSONByPost('/jcjw/sys/policedept/list')
export const userList = ajax.fetchJSONByPost('/jcjw/sys/user/list')
export const userDetail = ajax.fetchJSONByPost('/jcjw/sys/user/detail')
export const userUpdate = ajax.fetchJSONByPost('/jcjw/sys/user/update')
export const userAdd = ajax.fetchJSONByPost('/jcjw/sys/user/save')
export const userSetRole = ajax.fetchJSONByPost('/jcjw/sys/user/updateRole')
export const userDelete = ajax.fetchJSONByPost('/jcjw/sys/user/delete')


//角色管理
export const roleList = ajax.fetchJSONByPost('/jcjw/sys/role/list')
export const moduleListInRole = ajax.fetchJSONByPost('/jcjw/sys/resource/list')
export const roleAdd = ajax.fetchJSONByPost('/jcjw/sys/role/save')
export const roleDetail = ajax.fetchJSONByPost('/jcjw/sys/role/detail')
export const roleUpdate = ajax.fetchJSONByPost('/jcjw/sys/role/update')
export const roleDelete = ajax.fetchJSONByPost('/jcjw/sys/role/delete')
export const getRloeRes = ajax.fetchJSONByPost('/jcjw/sys/resource/listByRole')
export const updateRloeRes = ajax.fetchJSONByPost('/jcjw/sys/role/updateRoleRes')
//传roleid
export const getRolePeople = ajax.fetchJSONByPost('/jcjw/sys/user/list')
export const deleteRolePeople = ajax.fetchJSONByPost('/jcjw/sys/user/removeRole')




//模块管理后台接口
export const moduleList = ajax.fetchJSONByPost('/jcjw/sys/resource/list')
export const moduleAdd = ajax.fetchJSONByPost('/jcjw/sys/resource/save')
export const moduleDetail = ajax.fetchJSONByPost('/jcjw/sys/resource/detail')
export const moduleUpdateDetail = ajax.fetchJSONByPost('/jcjw/sys/resource/update')
export const moduleDelete = ajax.fetchJSONByPost('/jcjw/sys/resource/delete')
