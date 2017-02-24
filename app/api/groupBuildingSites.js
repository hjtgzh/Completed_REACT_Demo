import { ajax } from 'utils'

export const buildingMessage = ajax.fetchJSONByPost('/jcjw/department/getJzgd')

export const buildingUpdate = ajax.fetchJSONByPost('/jcjw/department/saveJzgd')

