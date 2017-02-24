import { ajax } from 'utils'

export const abroadList = ajax.fetchJSONByPost('/abroad/abroadList')
export const abroadDetail = ajax.fetchJSONByPost('/abroad/detail')

