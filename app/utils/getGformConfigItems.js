/*
 *Create By 韩卿
 *删除 if(!sessionStorage.getItem('divisionid')){
        setTimeout(()=>{
          fn(component,args,overWirte)
        },1000)
      }
      这段导致重复发请求的代码  
      2017-02-20 14:27
 */
import React, { Component } from 'react'
import {getAllRetrieval}from 'actions/common'

/*
 *根据args里的配置项去请求gForm中的条件中文
 *@param 
 *@param component [React Component]  要刷新视图的react组件
 *@param args      [Object]           请求参数的配置项
 *@param overWirte [Boolean]          是否强制重新请求已存在的数据
 *
 *@return [String]  返回的条件字符串
 */
export default function fn(component,args,overWirte=false){
  // console.log('args',args)
  const {dispatch}=component.props
  if(!(component instanceof Component)){
    return console.error('The component not a React-Component')
  }
  if(!(args instanceof Object)){
    return console.error('The args not a Object')
  }
  const keys=Object.keys(args)
  const request={}
  const map={}
  keys.forEach((key,index)=>{
    var temp=key
    if($GLOBALCONFIG[key]&&!overWirte){
      console.warn(`${key} is already been declared`)
    }else{
      // if(args[key]==='null'||args[key]===null){
      //   debugger
      // }
      request[temp.toUpperCase()]=args[key]
      map[temp.toUpperCase()]=key
    }
  })
  console.log('component',component)
  if(Object.keys(request).length===0){
    component.setState&&component.setState({_requestLoading:false})
    return
  }
  // console.log('gxdw',sessionStorage.getItem('divisionid'))
  // debugger
  dispatch(getAllRetrieval(request,(response)=>{
    for(let key in response.data){
      $GLOBALCONFIG[map[key]]=response.data[key]
    }
    // console.log('gxdw',sessionStorage.getItem('divisionid'))
    // debugger
    component.setState&&component.setState({_requestLoading:false})
    // component.setState({})
  }))
}

/*
 *对于在Gform中调用superSelect的
 *根据type（多选或者单选）值返回要查询的条件
 *
 *例如以下的数据格式：
 *gxdw:[{},{},{}]
 *
 *@return [String]  返回的条件字符串
 */
export function getItemByType(array){
  if(!Array.isArray(array)){
    console.warn('闯入的参数不是Array')
    // debugger
    return
  }
  const ids=[]
  let lastType=''
  for(let i=array.length-1;i>=0;i--){
    if(!array[i].type){
      console.error('此对象无type属性',array[i])
      return
    }
    // 第一次循环就匹配到type为single的项
    if(array[i].type==='single'&&lastType===''){
      ids.push(array[i].id)
      return ids.join(';')
    }
    // 在当前循环中匹配到type为single的项且在前一次匹配到type为multiple的项时
    if(array[i].type==='single'&&lastType==='multiple'){
      return ids.join(';')
    }
    ids.push(array[i].id)
    lastType=array[i].type
  }
  return ids.join(';')
}