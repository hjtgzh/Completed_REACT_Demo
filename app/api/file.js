import { ajax } from 'utils'
export const fileList = ajax.fetchJSONByPost('/jcjw/building/dah/getTotalDah')
export const insertDah = ajax.fetchJSONByPost('/jcjw/building/dah/insertDah')
export const deleteDah = ajax.fetchJSONByPost('/jcjw/building/dah/deleteDah')
export const fileCount = ajax.fetchJSONByPost('/jcjw/building/dah/getTotalDahCounts')


