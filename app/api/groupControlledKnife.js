import { ajax } from 'utils'

export const groupControlledKnife = ajax.fetchJSONByPost('/jcjw/department/getGzdj')
export const groupUpdateControlledKnife = ajax.fetchJSONByPost('/jcjw/department/saveGzdj')