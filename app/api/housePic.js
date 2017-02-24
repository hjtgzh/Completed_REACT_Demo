import { ajax } from 'utils'

export const getPicList = ajax.fetchJSONByPost('/jcjw/building/queryPicList')
export const deletePicItem = ajax.fetchJSONByPost('/jcjw/building/deletePicture')
export const savePicItem = ajax.fetchJSONByPost('/jcjw/building/savePicInfo')


export const uploadPic = ajax.fetchJSONByPost('/jcjw/building/insertPic')
export const getAllPic = ajax.fetchJSONByPost('/housePic/getAllPic')