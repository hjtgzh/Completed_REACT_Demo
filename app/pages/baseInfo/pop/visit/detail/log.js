/*
* creator: 汤俊 2016-11-10 11:30
* editor: 汤俊 2017-2-13 16:50
*/

import React, { Component } from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { fetchVisitLog } from 'actions/people'
import Journal from './journal'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    fetchVisitLogResult: state.fetchVisitLogResult,
  })
)

export default class Log extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.params = {
      pageNo: 1,
      pageSize: 10,
    }
    this.onChangePageSize = this.onChangePageSize.bind(this)
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
  }
  
  componentDidMount() {
    this.props.dispatch(fetchVisitLog({ ...this.params, id: this.visitId }))
  }

  // props状态更新回调
  componentWillReceiveProps(nextProps) {
    if (this.props.visitId !== nextProps.visitId) {
      this.props.dispatch(fetchVisitLog({ ...this.params, id: nextProps.visitId }))
    }
  }

  // 页数改变回调
  onChangePageSize(current) {
    this.params.pageNo = current
    this.props.dispatch(fetchVisitLog({ ...this.params, id: this.visitId }))
  }

  // 改变每页数回调
  onShowSizeChange(current, size) {
    this.params.pageNo = 1
    this.params.pageSize = size
    this.props.dispatch(fetchVisitLog({ ...this.params, id: this.visitId }))
  }

  render() {
    this.visitId = this.props.visitId || this.props.params.visitId || 1
    const { fetchVisitLogResult } = this.props
    const { list, totalCount, loading } = fetchVisitLogResult

    return (
      <div className="detail-content">
        <Spin tip="Loading..." spinning={loading}>
          <Journal
            total={totalCount}
            current={this.params.pageNo}
            pageSize={this.params.pageSize}
            dataSource={list}
            changePageSize={this.onChangePageSize} // 页数改变回调
            showSizeChanger  // 显示改变每页数
            onShowSizeChange={this.onShowSizeChange} // 改变每页数回调
          />
        </Spin>
      </div>
    )
  }
}
