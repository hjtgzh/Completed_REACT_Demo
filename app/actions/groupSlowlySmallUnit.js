/**
 * Created by 余金彪 on 2016/12/30.//单位低慢小
 */
import {
  createAction,
} from 'redux-actions'
import {
  groupSlowlySmallUnit,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取低慢小详情
export const requestSlowlySmallUnit = createAction('request slowlySmallUnit');
export const recevieSlowlySmallUnit = createAction('receive slowlySmallUnit');
export const fetchSlowlySmallUnitInfo = createAjaxAction(
  groupSlowlySmallUnit.getSmallUnitInfo,
  requestSlowlySmallUnit,
  recevieSlowlySmallUnit
);

//新增物品
export const requestSlowlyAddGoods = createAction('request SlowlyAddGoods');
export const recevieSlowlyAddGoods = createAction('receive SlowlyAddGoods');
export const fetchSlowlyAddGoods = createAjaxAction(
  groupSlowlySmallUnit.getSlowlyAddGoods,
  requestSlowlyAddGoods,
  recevieSlowlyAddGoods
);

//保存低慢小
export const requestSlowly = createAction('request SlowlyInfo');
export const recevieSlowly = createAction('receive SlowlyInfo');
export const fetchSlowly = createAjaxAction(
  groupSlowlySmallUnit.saveSlowly,
  requestSlowly,
  recevieSlowly
);

//低慢小关联物品身份证查询
export const requestSlowlyIdnumber = createAction('request SlowlyIdnumber');
export const recevieSlowlyIdnumber = createAction('receive SlowlyIdnumber');
export const fetchSlowlyIdnumber = createAjaxAction(
  groupSlowlySmallUnit.searchSlowlyIdnumber,
  requestSlowlyIdnumber,
  recevieSlowlyIdnumber
);

//低慢小关联物品关联
export const requestBindSlowlyIdnumber = createAction('request bindSlowlyIdnumber');
export const recevieBindSlowlyIdnumber = createAction('receive bindSlowlyIdnumber');
export const fetchBindSlowlyIdnumber = createAjaxAction(
  groupSlowlySmallUnit.bindSmallUnitInfo,
  requestBindSlowlyIdnumber,
  recevieBindSlowlyIdnumber
);

//低慢小绑定查询：
export const requestBindSlowlyIdnumberSearch = createAction('request getBindSlowlyIdnumber');
export const recevieBindSlowlyIdnumberSearch = createAction('receive getBindSlowlyIdnumber');
export const fetchBindSlowlyIdnumberSearch = createAjaxAction(
  groupSlowlySmallUnit.getBindSmallUnitInfo,
  requestBindSlowlyIdnumberSearch,
  recevieBindSlowlyIdnumberSearch
);

//低慢小解绑
export const requestUnBindSlowly = createAction('request unBindSlowly');
export const recevieUnBindSlowly = createAction('receive unBindSlowly');
export const fetchUnBindSlowly = createAjaxAction(
  groupSlowlySmallUnit.unBindSmallUnitInfo,
  requestUnBindSlowly,
  recevieUnBindSlowly
);

//低慢小物品操作人详情
export const requestSlowlyDetail = createAction('request SlowlyDetail');
export const recevieSlowlyDetail= createAction('receive SlowlyDetail');
export const fetchSlowlyDetail = createAjaxAction(
  groupSlowlySmallUnit.smallUnitDetail,
  requestSlowlyDetail,
  recevieSlowlyDetail
);

//新增低慢小物品操作人
export const requestSaveSlowlyDetail = createAction('request saveSlowlyDetail');
export const recevieSaveSlowlyDetail= createAction('receive saveSlowlyDetail');
export const fetchSaveSlowlyDetail = createAjaxAction(
  groupSlowlySmallUnit.saveSmallUnitDetail,
  requestSaveSlowlyDetail,
  recevieSaveSlowlyDetail
);