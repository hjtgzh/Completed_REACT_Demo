import { ajax } from 'utils'

//物品数据列表
export const goodsList = ajax.fetchJSONByPost('/jcjw/article/getTotalArticle')
//物品详情
export const goodsBasic = ajax.fetchJSONByPost('/jcjw/article/detail')
//修改物品信息
export const editGoodsDetail = ajax.fetchJSONByPost('/jcjw/article/update')
//删除物品信息
export const deleteGoodsDetail = ajax.fetchJSONByPost('/jcjw/article/delete')
//解绑物品信息
export const unbundlingGoodsdetail = ajax.fetchJSONByPost('/jcjw/article/unBind')
//物品照片列表
export const goodsPhotoList = ajax.fetchJSONByPost('/jcjw/article/queryPicList')
//物品照片上传
export const addGoodsPhoto = ajax.fetchJSONByPost('/jcjw/article/addPicture')
//物品照片删除
export const deleteGoodsPhoto = ajax.fetchJSONByPost('/jcjw/article/deletePicture')
