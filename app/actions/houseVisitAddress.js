import {
  createAction,
} from 'redux-actions'
import {
  houseVisitAddress,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取房屋地址信息
export const requestAddressInfo = createAction('request address info');
export const receiveAddressInfo = createAction('receive address info');
export const fetchaddressInfo = createAjaxAction(
	houseVisitAddress.addressInfo,
    requestAddressInfo,
    receiveAddressInfo
);

export const requestdeletdOwner = createAction('request addressOwner deletd');
export const receviedeletdOwner = createAction('receive addressOwner deletd');
export const fetchdeletedOwner = createAjaxAction(
	houseVisitAddress.deletedOwner,
	requestdeletdOwner,
	receviedeletdOwner
);

export const requestdeletdQrcode = createAction('request addressQrcode deletd');
export const recevieadeletdQrcode = createAction('receive addressQrcode deletd');
export const fetchdeletdQrcode = createAjaxAction(
	houseVisitAddress.deletdQrcode,
	requestdeletdQrcode,
	recevieadeletdQrcode
);

export const requestdeletdHouldNum = createAction('request addressHouldNum deletd');
export const receviedeletdHouldNum = createAction('receive addressHouldNum deletd');
export const fetchdeletdHouldNum = createAjaxAction(
	houseVisitAddress.deletdHouldNum,
	requestdeletdHouldNum,
	receviedeletdHouldNum
);

export const requestdeletdHouseFile = createAction('request addressHouseFile deletd');
export const receviedeletdHouseFile = createAction('receive addressHouseFile deletd');
export const fetchdeletdHouseFile = createAjaxAction(
	houseVisitAddress.deletdHouseFile,
	requestdeletdHouseFile,
	receviedeletdHouseFile
);

export const requestaddOwner = createAction('request addressOwner add');
export const recevieaddOwner = createAction('receive addressOwner add');
export const fetchaddOwner = createAjaxAction(
	houseVisitAddress.addOwner,
	requestaddOwner,
	recevieaddOwner
);

export const requestaddQrcode = createAction('request addressQrcode add');
export const recevieaddQrcode = createAction('receive addressQrcode add');
export const fetchaddQrcode = createAjaxAction(
	houseVisitAddress.addQrcode,
	requestaddQrcode,
	recevieaddQrcode
);

export const requestsearchHouldNum = createAction('request addressHouldNum search');
export const receviesearchHouldNum = createAction('receive addressHouldNum search');
export const fetchsearchHouldNum = createAjaxAction(
	houseVisitAddress.searchHouldNum,
	requestsearchHouldNum,
	receviesearchHouldNum
);


export const requestaddHouldNum = createAction('request addressHouldNum add');
export const recevieaddHouldNum = createAction('receive addressHouldNum add');
export const fetchaddHouldNum = createAjaxAction(
	houseVisitAddress.addHouldNum,
	requestaddHouldNum,
	recevieaddHouldNum
);

export const requestSearchHouseFile = createAction('request addressHouseFile search');
export const receiveSearchHouseFile = createAction('receive addressHouseFile search');
export const fetchSearchHouseFile = createAjaxAction(
	houseVisitAddress.searchHouseFile,
    requestSearchHouseFile,
    receiveSearchHouseFile
);

export const requestaddHouseFile = createAction('request addressHouseFile add');
export const recevieaddHouseFile = createAction('receive addressHouseFile add');
export const fetchaddHouseFile = createAjaxAction(
	houseVisitAddress.addHouseFile,
	requestaddHouseFile,
	recevieaddHouseFile
);

export const requestsaveScore = createAction('request addresScores save');
export const receviesaveScore = createAction('receive addressScore save');
export const fetchsaveScore = createAjaxAction(
	houseVisitAddress.saveScore,
	requestsaveScore,
	receviesaveScore
);

export const requestsaveRoomSelect = createAction('request addressRoomSelect save');
export const receviesaveRoomSelect = createAction('receive addressRoomSelect save');
export const fetchsaveRoomSelect = createAjaxAction(
	houseVisitAddress.saveRoomSelect,
	requestsaveRoomSelect,
	receviesaveRoomSelect
);
