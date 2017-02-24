import fetch from 'isomorphic-fetch'
import { API_PREFIX, API_SUFFIX } from '../constants'

// todo : 连接store
// const code = global.$GLOBALCONFIG.STAFF.code


export function fetchJSON(url, params) {
  params = {
    ...params,
    headers: {
      // 'User-Code': '',
      // 'mode': 'cors',
      // credentials: 'include',
      // 'X-Requested-With': 'XMLHttpRequest',
      // Connection: 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      ...params.headers,
    },
  }
  // eslint-disable-next-line no-param-reassign
  url = `${API_PREFIX}${url}${API_SUFFIX}`
  return fetch(url, params)
}
function buildParams(obj) {
  if (!obj) {
    return ''
  }
  const params = []
  for (const key in obj) {
    if ({}.hasOwnProperty.call(obj, key)) {
      const value = obj[key] === undefined ? '' : obj[key]
      params.push(`${key}=${encodeURIComponent(value)}`)
      // params.push(`${key}=${value}`)
    }
  }
  // let arr = []
  // params.map(function(_item){
  //   let item=_item
  //   // item=item.replace(/&/g, '%26')
  //   // item=item.replace(/#/g, '%23')
  //   // item=item.replace(/%/g, '%25')
  //   // // item=item.replace(/\+/g, '%2B')
  //   // item=item.replace(/\//g, '%2F')
  //   // item=item.replace(/\\/g, '%5C')
  //   // item=item.replace(/\?/g, '%3F')
  //   // item=item.replace(/ /g, '%20')
  //   // item=item.replace(/\./g, '%2E')
  //   // item=item.replace(/:/g, '%3A')

  //   // item=encodeURIComponent(item)
    
  //   // 下一行的代码会使uri编码出错
  //   // 原因是在fetch.js中decode函数使用=做分割符，在执行完fetch前不能转码
  //   // item=item.replace(/=/g, '%3D')
    
  //   arr.push(item)
  // })
  // const arg = arr.join('&')
  const arg = params.join('&')
  return arg
}
// eslint-disable-next-line arrow-parens
export const fetchJSONByPost = url => query => {
  const params = {
    method: 'POST',
    body: buildParams(query),
  }
  return fetchJSON(url, params)
}

export const fetchJSONStringByPost = url => query => {
  const params = {
    method: 'POST',
    body: query,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }
  return fetchJSON(url, params)
}
