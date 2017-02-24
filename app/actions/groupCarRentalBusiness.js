//汽车租赁
import {
  createAction,
} from 'redux-actions'
import {
  groupCarRentalBusiness
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取经营区域的信息
export const requestAreaAddress= createAction('request areaAddress list')
export const recevieAreaAddress = createAction('receive areaAddress list')
export const fetchAreaAddress= createAjaxAction(
	groupCarRentalBusiness.areaAddress,
	requestAreaAddress, 
	recevieAreaAddress
);
//增加区域地址
export const requestAreaAddressAdd = createAction('request areaAddress insert')
export const recevieAreaAddressAdd = createAction('receive areaAddress insert')
export const fetchAreaAddressAdd = createAjaxAction(
  groupCarRentalBusiness.areaAddressAdd,
  requestAreaAddressAdd,
  recevieAreaAddressAdd
)
//删除区域地址
export const requestDeleteAreaAddress = createAction('request areaAddress delete')
export const recevieDeleteAreaAddress = createAction('receive areaAddress delete')
export const fetchAreaAddressDelete = createAjaxAction(
  groupCarRentalBusiness.areaAddressDelete,
  requestDeleteAreaAddress,
  recevieDeleteAreaAddress
);
// 获取租赁信息
export const requestRentMessage= createAction('request rentMessage list')
export const recevieRentMessage = createAction('receive rentMessage list')
export const fetchRentMessage= createAjaxAction(
	groupCarRentalBusiness.rentMessage,
	requestRentMessage, 
	recevieRentMessage
);
//增加租赁信息
export const requestRentMessageAdd = createAction('request rentMessage insert')
export const recevieRentMessageAdd = createAction('receive rentMessage insert')
export const fetchRentMessageAdd = createAjaxAction(
  groupCarRentalBusiness.rentMessageAdd,
  requestRentMessageAdd,
  recevieRentMessageAdd
)
//删除租赁信息
export const requestDeleteRentMessage = createAction('request rentMessages delete')
export const recevieDeleteRentMessage = createAction('receive rentMessage delete')
export const fetchRentMessageDelete = createAjaxAction(
  groupCarRentalBusiness.rentMessageDelete,
  requestDeleteRentMessage,
  recevieDeleteRentMessage
);

