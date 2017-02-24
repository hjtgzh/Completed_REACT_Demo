/*
* creator: 汤俊 2016-11-10 11:30
* editor: 汤俊 2017-2-13 16:50
*/

import React, { Component } from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { fetchBuildingLog } from 'actions/house'
import Journal from 'baseInfo/pop/visit/detail/journal'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    fetchBuildgingLogResult: state.fetchBuildgingLogResult,
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
    this.props.dispatch(fetchBuildingLog({ ...this.params, id: this.bldid }))
  }

  // props状态更新回调
  componentWillReceiveProps(nextProps) {
    if(this.props.houseId !== nextProps.houseId){
      this.props.dispatch(fetchBuildingLog({ ...this.params, id: nextProps.houseId }))
    }
  }

  // 页数改变回调
  onChangePageSize(current) {
    this.params.pageNo = current
    this.props.dispatch(fetchBuildingLog({ ...this.params, id: this.bldid }))
  }

  // 改变每页数回调
  onShowSizeChange(current, size) {
    this.params.pageNo = 1
    this.params.pageSize = size
    this.props.dispatch(fetchBuildingLog({ ...this.params, id: this.bldid }))
  }

  render() {
    this.bldid = this.props.houseId || this.props.params.houseId || 1
    const { fetchBuildgingLogResult } = this.props
    const { list, totalCount, loading } = fetchBuildgingLogResult

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
