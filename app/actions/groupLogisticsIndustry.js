//汽车租赁
import {
  createAction,
} from 'redux-actions'
import {
  groupLogisticsIndustry
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 获取物流线路的信息
export const requestLogisticsRoad= createAction('request logisticsRoad list')
export const recevieLogisticsRoad=createAction('receive logisticsRoad list')
export const fetchLogisticsRoad= createAjaxAction(
	groupLogisticsIndustry.logisticsRoad,
	requestLogisticsRoad, 
	recevieLogisticsRoad
)
//增加物流线路
export const requestLogisticsRoadAdd = createAction('request logisticsRoad insert')
export const recevieLogisticsRoadAdd = createAction('receive logisticsRoad insert')
export const fetchLogisticsRoadAdd = createAjaxAction(
  groupLogisticsIndustry.logisticsRoadAdd,
  requestLogisticsRoadAdd,
  recevieLogisticsRoadAdd
)
//删除物流线路
export const requestDeleteLogisticsRoad = createAction('request logisticsRoad delete')
export const recevieDeleteLogisticsRoad = createAction('receive logisticsRoad delete')
export const fetchLogisticsRoadDelete = createAjaxAction(
  groupLogisticsIndustry.logisticsRoadDelete,
  requestDeleteLogisticsRoad,
  recevieDeleteLogisticsRoad
);
// 获取车辆的信息
export const requestCarMessage= createAction('request carMessage list')
export const recevieCarMessage=createAction('receive carMessage list')
export const fetchCarMessage= createAjaxAction(
  groupLogisticsIndustry.carMessage,
  requestCarMessage, 
  recevieCarMessage
)
//增加车辆
export const requestCarMessageAdd = createAction('request carMessage insert')
export const recevieCarMessageAdd = createAction('receive carMessage insert')
export const fetchCarMessageAdd = createAjaxAction(
  groupLogisticsIndustry.carMessageAdd,
  requestCarMessageAdd,
  recevieCarMessageAdd
)
//删除车辆
export const requestDeleteCarMessage = createAction('request carMessage delete')
export const recevieDeleteCarMessage= createAction('receive carMessage delete')
export const fetchCarMessageDelete = createAjaxAction(
  groupLogisticsIndustry.carMessageDelete,
  requestDeleteCarMessage,
  recevieDeleteCarMessage
);
// 获取物流的信息
export const requestLogisticsMsg= createAction('request logisticsMsg list')
export const recevieLogisticsMsg=createAction('receive logisticsMsg list')
export const fetchLogisticsMsg= createAjaxAction(
  groupLogisticsIndustry.logisticsMsg,
  requestLogisticsMsg, 
  recevieLogisticsMsg
)
//增加物流信息
export const requestLogisticsMsgAdd = createAction('request logisticsMsg insert')
export const recevieLogisticsMsgAdd = createAction('receive logisticsMsg insert')
export const fetchLogisticsMsgAdd = createAjaxAction(
  groupLogisticsIndustry.logisticsMsgAdd,
  requestLogisticsMsgAdd,
  recevieLogisticsMsgAdd
)
//删除物流信息
export const requestDeleteLogisticsMsg = createAction('request logisticsMsg delete')
export const recevieDeleteLogisticsMsg= createAction('receive logisticsMsg delete')
export const fetchLogisticsMsgDelete = createAjaxAction(
  groupLogisticsIndustry.logisticsMsgDelete,
  requestDeleteLogisticsMsg,
  recevieDeleteLogisticsMsg
);


