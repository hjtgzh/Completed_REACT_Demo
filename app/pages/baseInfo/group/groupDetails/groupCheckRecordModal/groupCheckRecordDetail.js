/**
 * Created by 余金彪 on 2016/12/15.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Modal, message, Form, DatePicker } from 'antd'
import moment from 'moment'
import {fetchUpdateJcjl} from 'actions/groupCheckRecord'

const FormItem = Form.Item
@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,
  })
)
export default class GroupCheckRecordDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onCancel = this.onCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.disabledDate = this.disabledDate.bind(this)
  }

  componentDidMount() {
    if (this.props.detailValue.jcrq != undefined) {
      this.props.detailValue.jcrq = moment(this.props.detailValue.jcrq);
    }
    this.props.form.setFieldsValue(this.props.detailValue)
  }

  // 保存
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = {
        ...fieldsValue,
        jcrq: fieldsValue.jcrq ? fieldsValue.jcrq.format('YYYY-MM-DD HH:mm:ss') : '',
        dptId: this.props.dptId,
        id: this.props.detailValue.id,
        tjsj: this.props.detailValue.tjsj,
      };
      this.props.dispatch(fetchUpdateJcjl({ ...values }, (result) => {
        message.success(result.msg)
        this.props.onOk()
      }))
    });
  }

  // 选择日期不能大于今天
  disabledDate(value) {
    if (!value) {
      return false
    }
    return value.valueOf() > moment(new Date()).valueOf()
  }

  onCancel() {
    this.props.onCancel()
  }

  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit}>保存修改内容</Button>
        <Button type="" onClick={this.props.onCancel}>取消</Button>
      </div>
    )
  }

  render() {
    const { title = '检查记录详情' } = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
      hasFeedback: true,
    }

    return (
      <div>
        <Modal
          onOk={this.onhandleOk}
          onCancel={this.onCancel}
          className="modal-body modal-header "
          visible={this.props.visible}
          title={title}
          footer={this.footer()}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label="记录编号"
              {...formItemLayout}
            >
              {
                getFieldDecorator('jlbh', {})(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="检查日期"
              {...formItemLayout}
            >
              {
                getFieldDecorator('jcrq', {})(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={this.disabledDate}
                  />
                )
              }
            </FormItem>
            <FormItem
              label="检查部位"
              {...formItemLayout}

            >
              {
                getFieldDecorator('jcbw', {})(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="检查类别"
              {...formItemLayout}
            >
              {
                getFieldDecorator('jclb', {})(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="检查人"
              {...formItemLayout}
            >
              {
                getFieldDecorator('jcr', {})(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="建议形式"
              {...formItemLayout}
            >
              {
                getFieldDecorator('jyxs', {})(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="检查内容"
              {...formItemLayout}
            >
              {
                getFieldDecorator('jcnr', {})(
                  <Input placeholder="" type="textarea" autosize />
                )
              }
            </FormItem>
            <FormItem
              label="存在隐患情况"
              {...formItemLayout}
            >
              {
                getFieldDecorator('czyhqk', {})(
                  <Input placeholder="" type="textarea" autosize />
                )
              }
            </FormItem>
            <FormItem
              label="整改意见"
              {...formItemLayout}
            >
              {
                getFieldDecorator('zgyj', {})(
                  <Input placeholder="" type="textarea" autosize />
                )
              }
            </FormItem>
            <FormItem
              label="防范建议"
              {...formItemLayout}
            >
              {
                getFieldDecorator('ffjy', {})(
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
