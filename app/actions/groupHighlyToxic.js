import {
  createAction,
} from 'redux-actions'
import {
  groupHighlyToxic,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

export const requestInfoHighlyToxic = createAction('request highlyToxic info');
export const recevieInfoHighlyToxic = createAction('receive highlyToxic info');
export const fetchInfoHighlyToxic = createAjaxAction(
  groupHighlyToxic.groupInfoHighlyToxic,
  requestInfoHighlyToxic,
  recevieInfoHighlyToxic
);


export const requestCheckboxListHighlyToxic = createAction('request highlyToxic checkbox');
export const recevieCheckboxListHighlyToxic = createAction('receive highlyToxic checkbox');
export const fetchCheckboxListHighlyToxic = createAjaxAction(
  groupHighlyToxic.groupCheckboxListHighlyToxic,
  requestCheckboxListHighlyToxic,
  recevieCheckboxListHighlyToxic
);


export const requestUpdateHighlyToxic = createAction('request highlyToxic update');
export const recevieUpdateHighlyToxic = createAction('receive highlyToxic update');
export const fetchUpdateHighlyToxic = createAjaxAction(
  groupHighlyToxic.groupUpdateHighlyToxic,
  requestUpdateHighlyToxic,
  recevieUpdateHighlyToxic
);
