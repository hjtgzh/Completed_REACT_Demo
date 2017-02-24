/**
 * Created by 江夏云 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Modal } from 'antd'
import { regExpConfig } from 'utils/config'
import {
  fetchUserDetailUpdate,
  fetchUserAdd,
} from 'actions/manage'

const FormItem = Form.Item

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
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.form.setFieldsValue(this.props.values)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      if (this.props.type == 'edit') {
        this.props.dispatch(fetchUserDetailUpdate({
          ...values,
          policedeptid: this.props.deptId,
          id: this.props.currPeopleId,
        }, () => {
          this.props.handleOk()
          this.props.form.resetFields()
        }))
      } else {
        this.props.dispatch(fetchUserAdd({ ...values, policedeptid: this.props.deptId }, () => {
          this.props.handleOk()
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
          <Form horizontal>
            <FormItem {...formItemLayout} label="警员账号" hasFeedback>
              {getFieldDecorator('usercode', {
                rules: [{ required: true, message: '请输入警员账号' }],
              })(
                <Input disabled={this.props.type == 'edit' ? true : false} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="警员身份证" hasFeedback>
              {getFieldDecorator('idcard', {
                rules: [
                  { required: true, message: '请输入身份证号' },
                  { pattern: regExpConfig.IDcard, message: '身份证号格式不正确' },
                ],
              })(
                <Input disabled={this.props.type == 'edit' ? true : false} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="警员名称" hasFeedback>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入警员名称' }],
              })(
                <Input />
              )}
            </FormItem>
              {
                this.props.type == 'edit' ? (
                  <FormItem {...formItemLayout} label="修改密码">
                    {getFieldDecorator('userpwd', {
                      rules: [{ pattern: regExpConfig.pwd, message: '请输入6-16位数字或者字母' }],
                    })(
                      <Input type="password" placeholder="不改密码此项为空" />
                    )}
                  </FormItem>
                ) : (
                  <FormItem {...formItemLayout} label="账号密码" hasFeedback>
                    {getFieldDecorator('userpwd', {
                      rules: [
                        { required: true, message: '请设置账号密码' },
                        { pattern: regExpConfig.pwd, message: '密码请输入6-16位数字或者字母' },
                      ],
                    })(
                      <Input type="password" />
                    )}
                  </FormItem>
                )
              }
            <FormItem {...formItemLayout} label="手机号码" hasFeedback>
              {getFieldDecorator('longmobile', {
                rules: [
                  { required: true, message: '请输入手机号码' },
                  { pattern: regExpConfig.mobile, message: '手机号码格式不正确' },
                ],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="手机短号" hasFeedback>
              {getFieldDecorator('shortmobile', {
                rules: [
                  { required: true, message: '请输入手机短号' },
                ],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="警员职务" hasFeedback>
              {getFieldDecorator('post', {
                rules: [{ required: true, message: '请输入警员职务' }],
              })(
                <Input />
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}
