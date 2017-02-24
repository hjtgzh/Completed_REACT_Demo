import {
  createAction,
} from 'redux-actions'
import {
  housePic,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取房屋照片列表
export const requestGetPicList = createAction('request get pic list');
export const recevieGetPicList = createAction('receive get pic list');
export const getPicList = createAjaxAction(
    housePic.getPicList,
    requestGetPicList,
    recevieGetPicList
);

// 房屋照片表格中的保存
export const requestSavePicItem = createAction('request save pic item');
export const recevieSavePicItem = createAction('receive save pic item');
export const savePicItem = createAjaxAction(
    housePic.savePicItem,
    requestSavePicItem,
    recevieSavePicItem
);

// 房屋照片表格中的删除
export const requestDeletePicItem = createAction('request delete pic item');
export const recevieDeletePicItem = createAction('receive delete pic item');
export const deletePicItem = createAjaxAction(
    housePic.deletePicItem,
    requestDeletePicItem,
    recevieDeletePicItem
);

// 上传房屋照片
export const requestUploadPic = createAction('request upload pic');
export const recevieUploadPic = createAction('receive upload pic');
export const uploadPic = createAjaxAction(
    housePic.uploadPic,
    requestUploadPic,
    recevieUploadPic
);

// 获取全部房屋照片
export const requestGetAllPic = createAction('request get all pic');
export const recevieGetAllPic = createAction('receive get all pic');
export const getAllPic = createAjaxAction(
    housePic.getAllPic,
    requestGetAllPic,
    recevieGetAllPic
);
