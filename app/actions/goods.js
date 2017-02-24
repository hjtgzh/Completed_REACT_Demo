import {
  createAction,
} from 'redux-actions'
import {
  goods,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 物品管理列表的action
export const requestGoodsList = createAction('request goods list');
export const recevieGoodsList = createAction('receive goods list');
export const fetchGoodsList = createAjaxAction(
  goods.goodsList,
  requestGoodsList,
  recevieGoodsList
);

// 物品管理-物品详情
export const requestGoodsBasic = createAction('request goods detail')
export const recevieGoodsBasic = createAction('receive goods detail')
export const fetchGoodsBasic = createAjaxAction(
	goods.goodsBasic, 
	requestGoodsBasic, 
	recevieGoodsBasic
);

// 物品管理-物品详情
export const requestEditGoodsDetail = createAction('request edit detail')
export const recevieEditGoodsDetail = createAction('receive edit detail')
export const fetchEditGoodsDetail = createAjaxAction(
	goods.editGoodsDetail,
	requestEditGoodsDetail,
	recevieEditGoodsDetail
);

// 物品管理-删除物品信息
export const requestDeleteGoodsDetail = createAction('request delete detail')
export const recevieDeleteGoodsDetail = createAction('receive delete detail')
export const fetchDeleteGoodsDetail = createAjaxAction(
	goods.deleteGoodsDetail,
	requestDeleteGoodsDetail,
	recevieDeleteGoodsDetail
);


// 物品管理-解绑物品信息
export const requestUnbundlingGoodsdetail = createAction('request unbundling detail')
export const recevieUnbundlingGoodsdetail = createAction('receive unbundling detail')
export const fetchUnbundlingGoodsdetail = createAjaxAction(
	goods.unbundlingGoodsdetail, 
	requestUnbundlingGoodsdetail, 
	recevieUnbundlingGoodsdetail
);

// 物品管理-物品照片列表
export const requesGoodsPhotoList = createAction('request photo list')
export const recevieGoodsPhotoList = createAction('receive photo list')
export const fetchGoodsPhotoList = createAjaxAction(
	goods.goodsPhotoList,
	requesGoodsPhotoList,
	recevieGoodsPhotoList
);

// 物品管理-物品照片新增
export const requesAddGoodsPhoto = createAction('request photo add')
export const recevieAddGoodsPhoto = createAction('receive photo add')
export const fetchAddGoodsPhoto = createAjaxAction(
	goods.addGoodsPhoto,
	requesAddGoodsPhoto,
	recevieAddGoodsPhoto
);

// 物品管理-物品照片删除
export const requesDeleteGoodsPhoto = createAction('request photo delete')
export const recevieDeleteGoodsPhoto = createAction('receive photo delete')
export const fetchDeleteGoodsPhoto = createAjaxAction(
	goods.deleteGoodsPhoto,
	requesDeleteGoodsPhoto,
	recevieDeleteGoodsPhoto
);
