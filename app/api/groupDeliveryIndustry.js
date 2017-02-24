import { ajax } from 'utils'

export const baseInfoDelivery = ajax.fetchJSONByPost('/jcjw/department/jdyBaseInfo/getDepartmentJdy')
export const bussinessDelivery = ajax.fetchJSONByPost('/jcjw/dpt/jdyYywd/getDepartmentJdyYywd')
export const otherDelivery = ajax.fetchJSONByPost('/jcjw/dpt/jdyQt/getDepartmentJdyQt')
export const bussinessSaveDelivery = ajax.fetchJSONByPost('/jcjw/dpt/jdyYywd/saveDepartmentJdyYywd')
export const otherSaveDelivery = ajax.fetchJSONByPost('/jcjw/dpt/jdyQt/saveDepartmentJdyQt')
export const boxListDelivery = ajax.fetchJSONByPost('/jcjw/dpt/jdyZnkjx/getDepartmentZnkjxByCompanyid')
export const boxDelDelivery = ajax.fetchJSONByPost('/jcjw/dpt/jdyZnkjx/deleteparamobjById')
export const boxAddDelivery = ajax.fetchJSONByPost('/jcjw/dpt/jdyZnkjx/insertDepartmentZnkjx')
export const boxUpdateDelivery = ajax.fetchJSONByPost('/jcjw/dpt/jdyZnkjx/updateDepartmentZnkjx')
export const getOneBoxDeliveryInfo = ajax.fetchJSONByPost('/jcjw/dpt/jdyZnkjx/getDepartmentZnkjxByid')

