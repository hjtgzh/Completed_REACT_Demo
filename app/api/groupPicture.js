/**
 * Created by Administrator on 2017/1/18.
 */
import { ajax } from 'utils'

//获取照片列表-ytt
export const getPicList = ajax.fetchJSONByPost('/jcjw/dpt/picture/getDepartmentPicture')
//删除图片-ytt
export const deletePic = ajax.fetchJSONByPost('/jcjw/dpt/picture/deleteDepartmentPicture')
