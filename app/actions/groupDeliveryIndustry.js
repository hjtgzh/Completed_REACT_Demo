import {
  createAction,
} from 'redux-actions'
import {
  groupDeliveryIndustry,
} from 'api'
import {
  createAjaxAction,
} from 'utils'
//获取寄递业其他信息详情
export const requestBaseInfoDelivery = createAction('request deliveryBase info');
export const recevieBaseInfoDelivery = createAction('receive deliveryBase info');
export const fetchBaseInfoDelivery = createAjaxAction(
  groupDeliveryIndustry.baseInfoDelivery,
  requestBaseInfoDelivery,
  recevieBaseInfoDelivery
);
//获取寄递业营业网点详情
export const requestBussinessDelivery = createAction('request bussinessDelivery info');
export const receiveBussinessDelivery = createAction('receive bussinessDelivery info');
export const fetchBussinessDelivery = createAjaxAction(
  groupDeliveryIndustry.bussinessDelivery,
  requestBussinessDelivery,
  receiveBussinessDelivery
);

//保存寄递业营业网点数据
export const requestBussinessSaveDelivery = createAction('request bussinessDelivery save');
export const recevieBussinessSaveDelivery = createAction('receive bussinessDelivery save');
export const fetchBussinessSaveDelivery = createAjaxAction(
  groupDeliveryIndustry.bussinessSaveDelivery,
  requestBussinessSaveDelivery,
  recevieBussinessSaveDelivery
);
//获取寄递业其他信息详情
export const requestOtherDelivery = createAction('request otherDelivery info');
export const recevieOtherDelivery = createAction('receive otherDelivery info');
export const fetchOtherDelivery = createAjaxAction(
    groupDeliveryIndustry.otherDelivery,
    requestOtherDelivery,
    recevieOtherDelivery
);
//保存寄递业其他信息数据
export const requestOtherSaveDelivery = createAction('request otherDelivery save');
export const recevieOtherSaveDelivery = createAction('receive otherDelivery save');
export const fetchOtherSaveDelivery = createAjaxAction(
    groupDeliveryIndustry.otherSaveDelivery,
    requestOtherSaveDelivery,
    recevieOtherSaveDelivery
);
//根据dptId获取智能快递箱列表
export const requestBoxListDelivery = createAction('request boxDelivery list');
export const recevieBoxListDelivery = createAction('receive boxDelivery list');
export const fetchBoxListDelivery = createAjaxAction(
  groupDeliveryIndustry.boxListDelivery,
  requestBoxListDelivery,
  recevieBoxListDelivery
);
//根据Id删除智能快递箱列表
export const requestBoxDelDelivery = createAction('request boxDelivery del');
export const receiveBoxDelDelivery = createAction('receive boxDelivery del');
export const fetchBoxDelDelivery = createAjaxAction(
    groupDeliveryIndustry.boxDelDelivery,
    requestBoxDelDelivery,
    receiveBoxDelDelivery
);
//新增智能快递箱列表
export const requestBoxAddDelivery = createAction('request boxDelivery add');
export const recevieBoxAddDelivery = createAction('receive boxDelivery add');
export const fetchBoxAddDelivery = createAjaxAction(
  groupDeliveryIndustry.boxAddDelivery,
  requestBoxAddDelivery,
  recevieBoxAddDelivery
);
//修改智能快递箱列表
export const requestBoxGetOneDelivery = createAction('request oneBoxDelivery info');
export const receiveBoxGetOneDelivery = createAction('receive oneBoxDelivery info');
export const fetchBoxGetOneDeliveryInfo = createAjaxAction(
    groupDeliveryIndustry.getOneBoxDeliveryInfo,
    requestBoxGetOneDelivery,
    receiveBoxGetOneDelivery
);
//修改智能快递箱列表
export const requestBoxUpdateDelivery = createAction('request boxDelivery update');
export const recevieBoxUpdateDelivery = createAction('receive boxDelivery update');
export const fetchBoxUpdateDelivery = createAjaxAction(
  groupDeliveryIndustry.boxUpdateDelivery,
  requestBoxUpdateDelivery,
  recevieBoxUpdateDelivery
);

