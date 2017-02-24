//汽车租赁
import {
  createAction,
} from 'redux-actions'
import {
  groupServicedApartment
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取业主的信息
export const requestOwnerMessage= createAction('request ownerMessage list')
export const recevieOwnerMessage=createAction('receive ownerMessage list')
export const fetchOwnerMessage= createAjaxAction(
	groupServicedApartment.ownerMessage,
	requestOwnerMessage, 
	recevieOwnerMessage
)
//增加业主
export const requestOwnerMessageAdd = createAction('request ownerMessage insert')
export const recevieOwnerMessageAdd = createAction('receive ownerMessage insert')
export const fetchOwnerMessageAdd = createAjaxAction(
  groupServicedApartment.ownerMessagAdd,
  requestOwnerMessageAdd,
  recevieOwnerMessageAdd
)
//删除业主
export const requestDeleteOwnerMessage = createAction('request ownerMessage delete')
export const recevieDeleteOwnerMessage = createAction('receive ownerMessage delete')
export const fetchOwnerMessageDelete = createAjaxAction(
  groupServicedApartment.ownerMessageDelete,
  requestDeleteOwnerMessage,
  recevieDeleteOwnerMessage
);
// 获取租客信息
export const requestRenterMessage= createAction('request renterMessage list')
export const recevieRenterMessage = createAction('receive renterMessage list')
export const fetchRenterMessage= createAjaxAction(
	groupServicedApartment.rentMessage,
	requestRenterMessage, 
	recevieRenterMessage
);
//增加租客信息
export const requestRenterMessageAdd = createAction('request renterMessage insert')
export const recevieRenterMessageAdd = createAction('receive renterMessage insert')
export const fetchRenterMessageAdd = createAjaxAction(
  groupServicedApartment.rentMessageAdd,
  requestRenterMessageAdd,
  recevieRenterMessageAdd
)
//删除租客信息
export const requestDeleteRenterMessage = createAction('request renterMessage delete')
export const recevieDeleteRenterMessage = createAction('receive renterMessage delete')
export const fetchRenterMessageDelete = createAjaxAction(
  groupServicedApartment.renterMessageDelete,
  requestDeleteRenterMessage,
  recevieDeleteRenterMessage
);

