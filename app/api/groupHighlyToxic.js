import { ajax } from 'utils'

export const groupInfoHighlyToxic = ajax.fetchJSONByPost('/jcjw/department/getJdhxpcydw')
export const groupCheckboxListHighlyToxic = ajax.fetchJSONByPost('/jcjw/department/getJdhxpcydwXkzsyzl')
export const groupUpdateHighlyToxic = ajax.fetchJSONByPost('/jcjw/department/saveJdhxpcydw')