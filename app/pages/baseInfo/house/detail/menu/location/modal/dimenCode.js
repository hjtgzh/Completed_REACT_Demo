/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { Input, Modal, Form } from 'antd'
import { connect } from 'react-redux'
import {
  fetchHouseAddBarCode,
} from 'actions/houseAddressDetail'

const FormItem = Form.Item

@connect(
  (state) => ({
    config: state.config,
    houseAddBarCodeResult: state.houseAddBarCodeResult,
  })
)

@Form.create({
  onFieldsChange(props, items) {
  },
})

export default class dimenCode extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.search = this.search.bind(this)
  }

  // 搜索二维码
  search() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.dispatch(fetchHouseAddBarCode({ id: this.props.addressId, ewmbm: values.ewmbm }, () => {
        this.props.bindBarCode(values.ewmbm)
      }))
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        className="modal-header"
        title={this.props.title}
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.search}
        confirmLoading={this.props.houseAddBarCodeResult.loading}
      >
        <FormItem hasFeedback>
          {getFieldDecorator('ewmbm', {
            rules: [{ required: true, message: '请输入二维码号' }],
          })(
            <Input placeholder="请输入二维码号" />
          )}
        </FormItem>
      </Modal>
    )
  }
}
