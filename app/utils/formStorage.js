/*
* creator: 汤俊 2016-11-10 11:30
* editor: 汤俊 2017-2-22 14:05
*/

const storage = window.sessionStorage  //默认表单数据保存在session中
const storageKey = "formValues"  // 默认键值

//{key : fields}对象保存到storage storageKey对象中
export function setFormStorageItem(fields = {},key){
  const locationStr = getLocation()
  const keyStr = key || locationStr
  const formValues = JSON.parse(getFormValues())
  formValues[keyStr] = {...fields}
  insertToFormValues(formValues)
}

//获取storage中保存的 storageKey对象中key对应的value值
export function getFormStorageItem(key){
  const locationStr = getLocation()
  const keyStr = key || locationStr
  const formValues = JSON.parse(getFormValues())
  return formValues[keyStr] 
}

//删除storage中保存的 storageKey对象中对应key
export function removeFormStorageItem(key){
  const locationStr = getLocation()
  const keyStr = key || locationStr
  const storage = getStorageObj()
  const formValues = JSON.parse(getFormValues())
  delete formValues[keyStr]
  insertToFormValues(formValues)
}

//删除storage中保存的storageKey对象
export function removeFormStorage(){
  const key = getStorageKey()
  const storage = getStorageObj()
  storage.removeItem(key)
}

//获取storage 中key
export function getStorageKey(){
  return storageKey || "formValues"
}

function insertToFormValues(formValues){
  const key = getStorageKey()
  const storage = getStorageObj()
  storage.setItem(key,JSON.stringify(formValues))
}

//获取storage 中key对应的value
function getFormValues(){
  const key = getStorageKey()
  const storage = getStorageObj()
  return storage.getItem(key) || {}
}

//获取url路径
function getLocation(){
  return location.pathname || getLocationFormUrl()
}

function getLocationFormUrl(){
  const url = window.location.href
  return url.subString(url.indexOf("#")+1)
}

function getStorageObj(){
  return storage || window.sessionStorage
}

