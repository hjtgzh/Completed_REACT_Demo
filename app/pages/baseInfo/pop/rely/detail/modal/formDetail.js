/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import moment from 'moment'
import {
  Table, Modal, DatePicker, Select, Input,
} from 'antd';

const Option = Select.Option

export default class formDetail extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      record: this.props.record,
      typeval: {},
    }
    this.saveHandle = this.saveHandle.bind(this)
    this.setValueText = this.setValueText.bind(this)
    this.setValueSelect = this.setValueSelect.bind(this)
    this.setValueTime = this.setValueTime.bind(this)
  }

  // 保存
  saveHandle() {
    const typeval = this.state.typeval
    const record = this.state.record
    const value = {
      type: typeval.type ? typeval.type : record.type,
      jcsj: typeval.jcsjLabel ? typeval.jcsjLabel : record.jcsjLabel,
      jcnr: typeval.jcnr ? typeval.jcnr : record.jcnr,
    }
    if (record.id) {
      value.id = record.id
    } else {
      value.ykllBaseId = record.ykllBaseId
    }
    this.props.saveHandle(value)
  }

  // 设置奖惩内容
  setValueText(e) {
    const input = e.target
    this.state.typeval.jcnr = input.value
  }

  // 设置奖惩类型
  setValueSelect(e) {
    this.state.typeval.type = e
  }

  // 设置时间
  setValueTime(date, dateString) {
    this.state.typeval.jcsjLabel = dateString
  }

  // 表格信息
  columns() {
    return [{
      title: '奖惩记录类型',
      className: 'column-money',
      dataIndex: 'name',
    },
    {
      title: '',
      dataIndex: 'content',
    }]
  }

  render() {
    const record = this.state.record
    const data = [
      {
        key: '1',
        name: '奖惩记录类型',
        content:
          <Select
            size="large"
            defaultValue={record.type ? record.type : '1'}
            onChange={this.setValueSelect}
            style={{ width: 150 }}
          >

            <Option value="1">志愿者</Option>
            <Option value="2">群防群治</Option>
            <Option value="3">治安信息员</Option>
            <Option value="4">社区干部</Option>
            <Option value="5">社会知名人士</Option>
          </Select>,
      },
      {
        key: '2',
        name: '奖惩时间',
        content:
          <DatePicker
            showTime
            onChange={this.setValueTime}
            value={record.jcsjLabel ? moment(record.jcsj) : null}
            format="YYYY-MM-DD HH:mm:ss"
          />,
      },
      {
        key: '3',
        name: '奖惩内容',
        content:
          <Input
            name="jcnr"
            type="textarea"
            defaultValue={record.jcnr}
            onChange={this.setValueText}
            autosize={{ minRows: 1, maxRows: 6 }}
          />,
      },
    ]
    return (
      <Modal
        className="modal-header"
        visible title="奖惩信息"
        onCancel={this.props.onCancel}
        onOk={this.saveHandle}
      >
        <Table
          pagination={false}
          columns={this.columns()}
          dataSource={data}
          bordered
          showHeader={false}
        />
      </Modal>
    )
  }
}

