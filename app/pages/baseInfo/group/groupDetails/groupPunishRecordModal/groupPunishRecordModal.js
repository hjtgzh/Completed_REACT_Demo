/**
 * Created by 余金彪 on 2016/12/14.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Modal, message, Form, DatePicker } from 'antd'
import moment from 'moment'
import {
  fetchInsertCheckRecordInfo,
} from 'actions/groupPunishRecord'

const FormItem = Form.Item
@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,
  })
)
export default class GroupPunishRecordModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.disabledDate = this.disabledDate.bind(this)
  }

  //保存处罚记录
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = {
        ...fieldsValue,
        cfrq: fieldsValue.cfrq ? fieldsValue.cfrq.format('YYYY-MM-DD HH:mm:ss') : '',
        dptId: this.props.dptId,
      };
      this.props.dispatch(fetchInsertCheckRecordInfo({ ...values }, (result) => {
        message.success(result.msg)
        this.props.form.resetFields()
        this.props.onOk()
      }))
    });
  }

  // 选择的日期时间不能大于今天
  disabledDate(value) {
    if (!value) {
      return false
    }
    return value.valueOf() > moment(new Date()).valueOf()
  }

  handleCancel() {
    this.props.onCancel()
    this.props.form.resetFields()
  }

  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
        <Button type="" onClick={this.handleCancel}>取消</Button>
      </div>
    )
  }

  render() {
    const { title = '新增犯罪记录' } = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
      hasFeedback: true,
    }

    return (
      <div>
        <Modal
          onOk={this.props.onOk}
          onCancel={this.handleCancel}
          className="modal-body modal-header "
          visible={this.props.visible}
          title={title}
          footer={this.footer()}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label="案件记录编号"
              {...formItemLayout}
            >
              {
                getFieldDecorator('ajjlbh', {
                  rules: [
                    { required: true, message: '请输入案件编号' },
                  ],
                })(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="处罚日期"
              {...formItemLayout}
            >
              {
                getFieldDecorator('cfrq', {})(
                  <DatePicker disabledDate={this.disabledDate} shoeTime format="YYYY-MM-DD HH:mm:ss" />
                )
              }
            </FormItem>
            <FormItem
              label="处罚原因"
              {...formItemLayout}
            >
              {
                getFieldDecorator('cfyy', {})(
                  <Input placeholder="" />
                )
              }
            </FormItem>

            <FormItem
              label="承办民警"
              {...formItemLayout}
            >
              {
                getFieldDecorator('cbmj', {})(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="处罚措施"
              {...formItemLayout}
            >
              {
                getFieldDecorator('cfcs', {})(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="处理内容"
              {...formItemLayout}
            >
              {
                getFieldDecorator('clnr', {})(
                  <Input placeholder="" type="textarea" autosize />
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
