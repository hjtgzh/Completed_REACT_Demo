/**
 * Created by 余金彪 on 2016/12/15.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Input, Button, Modal, message, Form,DatePicker} from 'antd'
const FormItem = Form.Item
import moment from 'moment'
import {
  fetchCheckRecordInfo,
  fetchInsertCheckRecord,
} from 'actions/groupCheckRecord'
@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,
    getCheckRecordResult: state.getCheckRecordResult,
    insertCheckRecordResult: state.insertCheckRecordResult,
  })
)
export default class GroupCheckRecordModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.disabledDate = this.disabledDate.bind(this)
  }

  //选择日期不能大于今天
  disabledDate(value) {
    if (!value) {
      return false
    }
    return value.valueOf() > moment(new Date()).valueOf()
  }

  //保存检查记录
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = {
        ...fieldsValue,
        jcrq: fieldsValue.jcrq ? fieldsValue.jcrq.format('YYYY-MM-DD HH:mm:ss') : '',
        dptId: this.props.dptId
      };
      this.props.dispatch(fetchInsertCheckRecord({...values}, (result) => {
        message.success(result.msg)
        this.props.form.resetFields()
        this.props.onOk()
      }))
    });
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
    const {title = '检查记录'}=this.props
    const {getFieldDecorator}=this.props.form
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 15},
      hasFeedback: true
    }

    return (
      <div>
        <Modal
          onOk={this.props.onOk}
          onCancel={this.handleCancel}
          className=' modal-body modal-header '
          visible={this.props.visible}
          title={title}
          footer={this.footer()}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label='记录编号'
              {...formItemLayout}
            >
              {
                getFieldDecorator('jlbh', {
                  rules: [
                    {required: true, message: '请输入记录编号'},
                  ],
                })(
                  <Input placeholder=""/>
                )
              }
            </FormItem>
            <FormItem
              label='检查日期'
              {...formItemLayout}
            >
              {
                getFieldDecorator('jcrq', {
                  rules: [
                    {required: true, type: 'object', message: '请输入检查日期'},
                  ],
                })(
                  <DatePicker
                    disabledDate={this.disabledDate}
                    shoeTime
                    format="YYYY-MM-DD HH:mm:ss"/>
                )
              }
            </FormItem>
            <FormItem
              label='检查部位'
              {...formItemLayout}

            >
              {
                getFieldDecorator('jcbw', {})(
                  <Input placeholder=""/>
                )
              }
            </FormItem>

            <FormItem
              label='检查类别'
              {...formItemLayout}
            >
              {
                getFieldDecorator('jclb', {})(
                  <Input placeholder=""/>
                )
              }
            </FormItem>
            <FormItem
              label='检查人'
              {...formItemLayout}
            >
              {
                getFieldDecorator('jcr', {})(
                  <Input placeholder=""/>
                )
              }
            </FormItem>
            <FormItem
              label='建议形式'
              {...formItemLayout}
            >
              {
                getFieldDecorator('jyxs', {})(
                  <Input placeholder=""/>
                )
              }
            </FormItem>
            <FormItem
              label='检查内容'
              {...formItemLayout}
            >
              {
                getFieldDecorator('jcnr', {})(
                  <Input placeholder="" type='textarea' autosize/>
                )
              }
            </FormItem><FormItem
            label='存在隐患情况'
            {...formItemLayout}
          >
            {
              getFieldDecorator('czyhqk', {})(
                <Input placeholder="" type='textarea' autosize/>
              )
            }
          </FormItem><FormItem
            label='整改意见'
            {...formItemLayout}
          >
            {
              getFieldDecorator('zgyj', {})(
                <Input placeholder="" type='textarea' autosize/>
              )
            }
          </FormItem>
            <FormItem
              label='防范建议'
              {...formItemLayout}
            >
              {
                getFieldDecorator('ffjy', {})(
                  <Input placeholder="" type='textarea' autosize/>
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}