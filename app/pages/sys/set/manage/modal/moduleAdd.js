/**
 * Created by 江夏云 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Select, Modal } from 'antd'
import { regExpConfig } from 'utils/config'
import {
    fetchModuleUpdateDetail,
    fetchModuleAdd,
} from 'actions/setmodule'

const FormItem = Form.Item
const Option = Select.Option

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
  })
)

@Form.create({

})

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      isFirst: this.props.isFirst,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.upDateValue = this.upDateValue.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {

  }

  upDateValue() {
    if (this.props.pid) {
      this.props.form.setFieldsValue({
        parentid: this.props.pid,
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      this.setState({ loading: true })
      if (this.props.type === 'modify') {
        this.props.dispatch(fetchModuleUpdateDetail({ ...values, id: this.props.itemId }, (result) => {
          this.props.handleOk()
          this.setState({ loading: false })
          this.props.form.resetFields()
        }))
      } else {
        this.props.dispatch(fetchModuleAdd(values, (result) => {
          this.props.handleOk()
          this.setState({ loading: false })
          this.props.form.resetFields()
        }))
      }
    });
  }

  footer() {
    return (
      <div>
        <Button size={'large'} onClick={this.props.onCancel}>取消</Button>
        <Button type="primary" size={'large'} onClick={this.handleSubmit}>确定</Button>
      </div>
    )
  }
  render() {
    const {
      visible, onCancel, title,
    } = this.props
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    }
    return (
      <Modal
        visible={visible}
        title={title}
        onCancel={onCancel}
        footer={this.footer()}
        className="modal-header modal-body"
      >
        <div className="modalcontent">
          <Form horizontal autoComplete="off">
            <FormItem {...formItemLayout} label="上级菜单id">
              {getFieldDecorator('parentid', {
                initialValue: this.props.pid,
              })(
                <Input disabled />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="新增菜单名称">
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '请输入菜单名称' },
                ],
                initialValue: this.props.values.name,
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="排序数字">
              {getFieldDecorator('sort', {
                rules: [
                  { required: true, message: '请输入排序数字' },
                  { pattern: regExpConfig.num, message: '请输入数字' },
                ],
                initialValue: `${this.props.values.sort}`,
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="模块名称">
              {getFieldDecorator('module', {
                rules: [
                  { required: true, message: '请输入模块名称' },
                ],
                initialValue: this.props.values.module,
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="关键字	">
              {getFieldDecorator('key', {
                rules: [
                  { required: true, message: '请输入关键字' },
                ],
                initialValue: `${this.props.values.key}`,
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="类型">
              {getFieldDecorator('type', {
                rules: [
                  { required: true, message: '请选择类型' },
                ],
                initialValue: `${this.props.values.type}`,
              })(
                <Select size="large">
                  <Option value="1">菜单</Option>
                  <Option value="2">操作地址</Option>
                  <Option value="3">页面按钮</Option>
                </Select>
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}
