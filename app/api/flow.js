import { ajax } from 'utils'

export const flowList = ajax.fetchJSONByPost('/jcjw/resident/getTemporaryResident')
