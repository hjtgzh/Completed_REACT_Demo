/*
* creator: 汤俊 2016-11-10 11:30
* editor: 汤俊 2017-2-13 16:00
*/

import React, { Component } from 'react'
import { Modal, Form, Input, DatePicker } from 'antd'

const FormItem = Form.Item

@Form.create({

})

export default class AddPunishModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.onOk = this.onOk.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  // 新增确认回调
  onOk() {
    const { addPunishOk } = this.props
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = {
        ...fieldsValue,
        cfrq: fieldsValue.cfrq ? fieldsValue.cfrq.format('YYYY-MM-DD') : '',
      };
      addPunishOk(values)
    });
  }

  // 取消回调
  onCancel() {
    const { addPunishCancle } = this.props
    addPunishCancle()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }

    return (
      <Modal title="新增处罚记录"
        visible={this.props.visiable}
        confirmLoading={this.props.loading}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="案件编号"
            hasFeedback
          >
            {getFieldDecorator('ajjlbh', {
              rules: [{
                required: true, message: '请输入案件编号',
              }],
            })(
              <Input placeholder="请输入案件编号" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="处罚时间"
            hasFeedback
          >
            {getFieldDecorator('cfrq', {
              rules: [{
                type: 'object', required: true, message: '请选择时间',
              }],
            })(
              <DatePicker showTime format="YYYY-MM-DD" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="处罚原因"
            hasFeedback
          >
            {getFieldDecorator('cfyy', {
              rules: [{
                required: true, message: '请输入处罚原因',
              }],
            })(
              <Input placeholder="请输入处罚原因" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="承办民警"
            hasFeedback
          >
            {getFieldDecorator('cbmj', {
              rules: [{
                required: true, message: '请输入承办民警',
              }],
            })(
              <Input placeholder="请输入承办民警" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="处罚措施"
            hasFeedback
          >
            {getFieldDecorator('cfcs', {
              rules: [{
                required: true, message: '请输入处罚措施',
              }],
            })(
              <Input placeholder="请输入处罚措施" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="处理内容"
            hasFeedback
          >
            {getFieldDecorator('clnr', {
              rules: [{
                required: true, message: '请输入处理内容',
              }],
            })(
              <Input placeholder="请输入处理内容" />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
