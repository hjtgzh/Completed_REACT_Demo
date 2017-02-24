import { ajax } from 'utils'

export const localList = ajax.fetchJSONByPost('/jcjw/resident/getPermanentResident')
