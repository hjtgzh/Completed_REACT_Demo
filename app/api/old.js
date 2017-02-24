import { ajax } from 'utils'

export const oldListList = ajax.fetchJSONByPost('/old/oldList')
export const oldDetails = ajax.fetchJSONByPost('/old/details')
