/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { Input, Form, Modal } from 'antd'

const FormItem = Form.Item

@Form.create({
  onFieldsChange(props, items) {
  },
})

export default class dimenCode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkName = this.checkName.bind(this)
  }

  // 验证身份证号
  checkName(rule, value, callback) {
    if (value) {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!reg.test(value)) {
        callback('请输入正确身份证号码')
      }
      // validateFields([''])
    }
    callback()
  }

  // 提交
  handleSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.search(values.idnumber)
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        className="modal-header"
        title={this.props.title}
        visible={this.props.visible}
        confirmLoading={this.props.loading}
        onCancel={this.props.onCancel}
        onOk={this.handleSubmit}
      >
        {
          <FormItem hasFeedback>
            {getFieldDecorator('idnumber', {
              rules: [{ required: true, message: '请输入正确身份证号码' }, { validator: this.checkName }],
            })(
              <Input placeholder="产权人身份证" />
            )}
          </FormItem>
        }
      </Modal>
    )
  }
}
