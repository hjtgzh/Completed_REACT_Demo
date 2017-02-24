/**
 * Created by 余金彪 on 2016/12/12.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Modal, message, Form, Select, DatePicker } from 'antd'
import { regExpConfig } from 'utils/config'
import {
  fetchSaveOperator,
} from 'actions/people'

const FormItem = Form.Item
const Option = Select.Option
@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,

  })
)
export default class GroupSlowlySmallAddPeo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      loading: false,
    }

    this.onCancel = this.onCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //保存低慢小操作人
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = {
        ...fieldsValue,
        czsj: fieldsValue.czsj ? fieldsValue.czsj.format('YYYY-MM-DD HH:mm:ss') : '',
      };
      this.props.dispatch(fetchSaveOperator({ ...values, wpId: this.props.wpId }, (reslut) => {
        message.success(reslut.msg)
        this.props.onCancel()
      }))
    });
  }

  onCancel() {
    this.props.onCancel()
  }

  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
        <Button type="" onClick={this.onCancel}>取消</Button>
      </div>
    )
  }

  render() {
    const { title = '低慢小操作人' } = this.props
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
          title={title} footer={this.footer()}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label="姓名"
              {...formItemLayout}
            >
              {
                getFieldDecorator('czrxm', {
                  rules: [
                    { required: true, message: '请输入姓名' },
                  ],
                })(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="身份证"
              {...formItemLayout}
            >
              {
                getFieldDecorator(' czrsfz', {
                  rules: [
                    {required: true, message: '请输入身份证'},
                    {pattern:regExpConfig.IDcard, message:'请输入正确的身份证'}
                  ],
                })(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="工作单位"
              {...formItemLayout}

            >
              {
                getFieldDecorator(' czrgzdw', {})(
                  <Input />
                )
              }
            </FormItem>

            <FormItem
              label="联系电话"
              {...formItemLayout}
            >
              {
                getFieldDecorator('czrlxdh', {})(
                  <Input />
                )
              }
            </FormItem>
            <FormItem
              label="操作时间"
              {...formItemLayout}
            >
              {
                getFieldDecorator('czsj', {})(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                )
              }
            </FormItem>
            <FormItem
              label="有无航空器驾驶执照"
              {...formItemLayout}
            >
              {
                getFieldDecorator(' ywzz', {})(
                  <Select placeholder="">
                    <Option value="1">有</Option>
                    <Option value="0">无</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem
              label="执照号码"
              {...formItemLayout}
            >
              {
                getFieldDecorator(' zzhm', {})(
                  <Input placeholder="" />
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
