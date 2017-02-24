/**
 * Created by 余金彪 on 2016/12/12.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Modal, message, Form, Select } from 'antd'
import { regExpConfig } from 'utils/config'
import {
  fetchInsert,
} from 'actions/people'

const FormItem = Form.Item
const Option = Select.Option
@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,
  })
)
export default class GroupSlowlySmallAddModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      loading: false,
    }

    this.onCancel = this.onCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //新增物品保存
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.setState({ loading: true })
      this.props.dispatch(fetchInsert({ ...values, bdrId: this.props.baseId }, (result) => {
        this.props.form.resetFields()
        message.success(result.msg)
        this.props.onCancel()
      }))
      this.setState({ loading: false })
    });
  }

  onCancel() {
    this.props.form.resetFields()
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
    const { title = '新增物品' } = this.props
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
          className="modal-body modal-header " visible={this.props.visible}
          title={title} footer={this.footer()}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label="物品名称"
              {...formItemLayout}
            >
              {
                getFieldDecorator('wpmc', {
                  rules: [
                    { required: true, message: '请输入物品名称' },
                  ],
                })(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="物品品牌"
              {...formItemLayout}
            >
              {
                getFieldDecorator('wppp', {
                  rules: [
                    { required: true, message: '请选择物品品牌' },
                  ],
                })(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="物品种类"
              {...formItemLayout}
            >
              {
                getFieldDecorator('wpzl', {
                  rules: [
                    { required: true, message: '请选择物品种类' },
                  ],
                })(
                  <Select placeholder="">
                    <Option value="0">无人机</Option>
                    <Option value="1">滑翔机</Option>
                    <Option value="2">三角翼</Option>
                    <Option value="3">滑翔伞</Option>
                    <Option value="4">动力伞</Option>
                    <Option value="5">热气球</Option>
                    <Option value="6">飞艇</Option>
                    <Option value="7">航空模型</Option>
                  </Select>
                )
              }
            </FormItem>

            <FormItem
              label="物品来源"
              {...formItemLayout}
            >
              {
                getFieldDecorator('wply', {
                  rules: [
                    { required: true, message: '请选择物品来源' },
                  ],
                })(
                  <Select placeholder="">
                    <Option value="1">自制</Option>
                    <Option value="2">购买</Option>
                    <Option value="3">租用</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem
              label="物品持有人"
              {...formItemLayout}
            >
              {
                getFieldDecorator('wpcyr', {
                  rules: [
                    { required: true, message: '请输入物品持有人' },
                  ],
                })(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="持有人身份证"
              {...formItemLayout}
            >
              {
                getFieldDecorator('cyrsfz', {
                  rules: [
                    { required: true, message: '请输入身份证' },
                    { pattern: regExpConfig.IDcard, message: '请输入正确的身份证' },
                  ],
                })(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="持有人电话"
              {...formItemLayout}
            >
              {
                getFieldDecorator('cyrdh', {
                  rules: [
                    { required: true, message: '请输入持有人电话' },
                    { pattern: regExpConfig.phoneNo, message: '请输入正确的持有人电话' },
                  ],
                })(
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
