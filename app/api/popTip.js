import { ajax } from 'utils'

export const tipList = ajax.fetchJSONByPost('/jcjw/resident/visit/getTotalVisit')
export const intoHouse=ajax.fetchJSONByPost('/jcjw/resident/visit/intoHouse')




