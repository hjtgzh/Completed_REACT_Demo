/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { Input, Form, Button, Row, Col, Table, Modal } from 'antd'
import { connect } from 'react-redux'
import {
  fetchHousebzdz,
  fetchHouseBdbzdz,
} from 'actions/houseAddressDetail'

const FormItem = Form.Item
@connect(
  (state) => ({
    config: state.config,
    houseBzdzResult: state.houseBzdzResult,
  })
)

@Form.create({
  onFieldsChange(props, items) {
  },
})

export default class bundAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          id: '122',
          bzdz: 'John Brown',
          handle: '绑定',
        },
      ],
    }
    this.search = this.search.bind(this)
  }

  search(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.dispatch(fetchHousebzdz({ keyword: values.bzdz }))
    });
  }

  bindHandle(record) {
    this.props.dispatch(fetchHouseBdbzdz({ bldid: this.props.addressId, bindbldid: record.id }, () => {
      this.props.search({ id: record.id, bindbldmc: record.bzdz })
    }))
  }

  // 表格信息
  columns() {
    const self = this
    return [
      {
        title: '地址名称',
        dataIndex: 'bzdz',
        key: 'bzdz',
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
    const { getFieldDecorator } = this.props.form
    const houseBzdzResult = this.props.houseBzdzResult
    return (
      <Modal
        className="modal-header"
        title={this.props.title}
        footer=""
        visible={this.props.visible}
        onCancel={this.props.onCancel}
      >
        <div className="detail-content detail-content-input">
          <Row gutter={16}>
            <Col span={20}>
              <FormItem hasFeedback>
                {getFieldDecorator('bzdz', {
                  rules: [{ required: true, message: '请输入标准地址' }],
                })(
                  <Input placeholder="请输入标准地址" />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={this.search} loading={houseBzdzResult.loading}>搜索</Button>
            </Col>
          </Row>
          <Table
            pagination={false}
            dataSource={houseBzdzResult.list}
            columns={this.columns()}
            className="tip-postion"
          />
        </div>
      </Modal>
    )
  }
}
