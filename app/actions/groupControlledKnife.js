import {
  createAction,
} from 'redux-actions'
import {
  groupControlledKnife,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

export const requestGroupControlledKnife = createAction('request ControlledKnife info');
export const recevieGroupControlledKnife = createAction('receive ControlledKnife info');
export const fetchGroupControlledKnife = createAjaxAction(
  groupControlledKnife.groupControlledKnife,
  requestGroupControlledKnife,
  recevieGroupControlledKnife
);


export const requestUpdateGroupControlledKnife = createAction('request ControlledKnife update');
export const recevieUpdateGroupControlledKnife = createAction('receive ControlledKnife update');
export const fetchUpdateGroupControlledKnife = createAjaxAction(
  groupControlledKnife.groupUpdateControlledKnife,
  requestUpdateGroupControlledKnife,
  recevieUpdateGroupControlledKnife
);
