/*
 *Create By 韩卿
 */
import React, { Component } from 'react'
import {Icon} from 'antd'

// 转换单位类别和人员关注类别为对应的图标
// 处理"330100;330100;"这种情况
// @String  type    指定转化的是哪种类型图标
// @String  string  后台返回的关于的类别标签的文本
export default function returnIcon(type,string=''){
  if(!type){
    console.error('type未指定')
    return
  }
  if(typeof(string)!=='string'){
    console.error('第一个参数请传入字符串类型的值')
    return
  }
  const arr=string.split(';')
  let bgClass=''
  arr.length=arr.length-1
  const gk=/(^RS[0-9]{2})|(^R5$)|(^R07$)/g
  // const gl=[]
  const returnArr=arr.map((str,index)=>{
    if(type==='department'){
      bgClass='green-bg'
    }
    if(type==='people'){
      if(gk.test(str)){
        // backgroundColor='#26abe2'
        bgClass='red-bg'
      }else{
        // backgroundColor='#ec0505'
        bgClass='blue-bg'
      }
    }
    return <i key={index} className={`custIcon ${bgClass}`} title={str}>{str[0]}</i>
  })
  return returnArr
}