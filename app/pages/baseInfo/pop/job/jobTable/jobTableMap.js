///**
// * Created by Administrator on 2016-12-26.
// */
///**
// * Created by Administrator on 2016-12-26.
// */
//import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { Link } from 'react-router'
//import { Table, Button, Tabs } from 'antd'
//import {fetchJobListList} from 'actions/job'
//import TypeMap from '../../../house/common/typeMap'
////连接公用常量、后端返回的数据方法  并放置在props里面调用
//@connect(
//  (state, props) => ({
//    config: state.config,
//    jobListSearchResult: state.jobListSearchResult,
//  })
//)
//
//export default class jobTableMap extends Component {
//  // 初始化页面常量 绑定事件方法
//  constructor(props) {
//    super(props)
//    this.state = {
//      currentPage:"1",
//    }
//
//  }
//  render(){
//    const {jobListSearchResult}=this.props
//    return(
//      <TypeMap
//        jobId={1}
//        dataSource={jobListSearchResult.list}
//        currentPage={jobListSearchResult.currentPage}
//        loading={jobListSearchResult.loading}
//      />
//
//    )
//  }
//}