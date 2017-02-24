/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { Table, Modal } from 'antd'
import { connect } from 'react-redux'
import {
  fetchHouseAddZrq,
} from 'actions/houseAddressDetail'

@connect(
  (state) => ({
    config: state.config,
    houseDelZrqResult: state.houseDelZrqResult,
  })
)

export default class bundDuty extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.bindHandle = this.bindHandle.bind(this)
  }

  // 绑定操作
  bindHandle(record) {
    this.props.dispatch(fetchHouseAddZrq({ zrqdm: record.zrqdm, id: this.props.addressId }, (result) => {
      this.props.bindResult(record)
    }))
  }

  // 表格信息
  columns() {
    const pcsmc = this.props.pcsmc
    const self = this
    return [
      {
        title: '责任区名称',
        dataIndex: 'gxdwqc',
        key: 'gxdwqc',
      },
      {
        title: '责任区管辖单位  ',
        dataIndex: 'pcsmc',
        key: 'pcsmc',
        render: (text, record, index) => <span>{pcsmc}</span>,
      },
      {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        render: (text, record, index) => <a onClick={() => self.bindHandle(record)}>绑定</a>,
      },
    ]
  }

  render() {
    return (
      <Modal
        className="modal-header"
        title={this.props.title}
        footer=""
        visible={this.props.visible}
        onCancel={this.props.onCancel}
      >
        <Table
          className="tip-postion"
          pagination={false}
          dataSource={this.props.list}
          columns={this.columns()}
        />
      </Modal>
    )
  }
}
