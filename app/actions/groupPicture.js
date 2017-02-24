import {
  createAction,
} from 'redux-actions'
import {
  groupPicture,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取照片列表-ytt
export const requestGetPicList = createAction('request pic list');
export const recevieGetPicList = createAction('receive pic list');
export const fetchGetPicList = createAjaxAction(
  groupPicture.getPicList,
  requestGetPicList,
  recevieGetPicList
);

// 删除照片-ytt
export const requestDeletePic = createAction('request pic delete');
export const recevieDeletePic = createAction('receive pic delete');
export const fetchDeletePicList = createAjaxAction(
  groupPicture.deletePic,
  requestDeletePic,
  recevieDeletePic
);