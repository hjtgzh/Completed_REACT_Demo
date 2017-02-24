import React, { Component } from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { fetchDepartmentLog } from 'actions/department'
import Journal from 'baseInfo/pop/visit/detail/journal'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    fetchDepartmentLogResult: state.fetchDepartmentLogResult,
  })
)

export default class Log extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.params = {
      pageNo: 1,
      pageSize: 10,
    }
    this.onChangePageSize = this.onChangePageSize.bind(this)
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
  }
  componentDidMount() {
    this.state.loading = true
    this.props.dispatch(fetchDepartmentLog({ ...this.params, id: this.departmentId }))
  }

  // props状态更新回调
  componentWillReceiveProps(nextProps) {
    if (this.props.fetchDepartmentLogResult !== nextProps.fetchDepartmentLogResult) {
      this.setState({ loading: false })
    }
  }

  // 页数改变回调
  onChangePageSize(current) {
    this.params.pageNo = current
    this.props.dispatch(fetchDepartmentLog({ ...this.params, id: this.departmentId }))
  }

  // 改变每页数回调
  onShowSizeChange(current, size) {
    this.params.pageNo = 1
    this.params.pageSize = size
    this.props.dispatch(fetchDepartmentLog({ ...this.params, id: this.departmentId }))
  }

  render() {
    this.departmentId = this.props.departmentId || this.props.params.departmentId || 1
    const { fetchDepartmentLogResult } = this.props
    const { list, totalCount } = fetchDepartmentLogResult

    return (
      <div className="detail-content">
        <Spin tip="Loading..." spinning={this.state.loading}>
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
