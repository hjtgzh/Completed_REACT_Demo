/*
* creator: 汤俊 2016-11-10 11:30
* editor: 汤俊 2017-2-13 16:50
*/

import React, { Component } from 'react'
import { Pagination, Timeline } from 'antd'

import 'style/journal.css'

export default class Journal extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.OnChangePageSize = this.OnChangePageSize.bind(this)
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
    this.renderLiCom = this.renderLiCom.bind(this)
  }
  // 当组件加载完成是
  componentDidMount() {
  }

  // 分页函数
  OnChangePageSize(current) {
    const { changePageSize } = this.props
    changePageSize(current)
  }

  // 每页变化回调
  onShowSizeChange(current, size) {
    const { onShowSizeChange } = this.props
    onShowSizeChange(current, size)
  }

  // 展示列表内容
  renderLiCom(row, index) {
    const { current } = this.props
    let dotE = null
    if (current === 1 && index === 0) {
      dotE = (<div className="circle-log circle-cor"><span /></div>)
    } else {
      dotE = (<div className="circle-log" />)
    }

    return (
      <Timeline.Item key={index} dot={dotE}>
        <div className="text-box">
          <em className="addTime"> {row.czsjLabel} </em>
          <span className="contentLog"> {row.opcontent || ''} </span>
          <span className="userName"> {row.czr || ''} </span>
          <span className="gxdwname"> {row.gxdwqc || ''} </span>
        </div>
      </Timeline.Item>
      )
  }

  render() {
    const { current, pageSize, total, dataSource = [], showSizeChanger } = this.props
    if (dataSource.length === 0) {
      dataSource.push({ opcontent: '暂无数据' })
    }
    return (
      <div className="visitlog-tj">
        <div className="visitlogList">
          <Timeline>
          {
            dataSource.map((row, index) => (this.renderLiCom(row, index)))
          }
          </Timeline>
        </div>
        <Pagination
          total={total}
          current={current}
          pageSize={pageSize}
          showTotal={() => `共 ${total} 条`}
          onChange={this.OnChangePageSize}
          showSizeChanger={showSizeChanger}
          onShowSizeChange={this.onShowSizeChange}
        />
      </div>
    )
  }
}
