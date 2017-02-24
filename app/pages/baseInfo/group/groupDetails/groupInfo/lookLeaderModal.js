/**
 * Created by 余金彪 on 2017/1/5.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { Button, Modal, Form, Input, message, Select } from 'antd'
import { connect } from 'react-redux'
import {
  fetchSaveDepartLeader,
} from 'actions/groupInformation'
import { regExpConfig } from 'utils/config'

const FormItem = Form.Item
const Option = Select.Option


@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,
  })
)
export default class lookLeaderModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleForModel: false,
    }
    this.onCancel = this.onCancel.bind(this)
    this.onOk = this.onOk.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.detailValue.dwrylx !== undefined) {
      this.props.detailValue.dwrylx = this.props.detailValue.dwrylx.toString();
    }
    this.props.form.setFieldsValue(this.props.detailValue)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.visibleForModel !== nextProps.visible) {
      this.setState({ visibleForModel: nextProps.visible })
    }
  }

  // 新增弹窗取消
  onCancel() {
    this.props.lookLeaderCancle()
    this.props.form.resetFields()
  }

  // 新增弹窗Ok
  onOk() {
    this.props.lookLeaderCancle()
  }

  handleSubmit(e) {
    // debugger
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = {
        ...fieldsValue,
        dwid: this.props.departmentId,
        id: this.props.detailValue.id,
      };
      this.props.dispatch(fetchSaveDepartLeader({ ...values }, (result) => {
        message.success(result.msg)
        this.props.lookLeaderCancle()
      }))
    });
  }

  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit}>保存修改内容</Button>
        <Button type="" onClick={this.props.lookLeaderCancle}>取消</Button>
      </div>
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div>
        <Modal
          title="管理人员"
          className="modal-body modal-header "
          visible={this.state.visibleForModel}
          onOk={this.onOk}
          onCancel={this.onCancel}
          footer={this.footer()}
        >
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="人员姓名"
              hasFeedback
            >
              {getFieldDecorator('xm', {})(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="身份证号码"
              hasFeedback
            >
              {getFieldDecorator('sfzh', {
                rules: [
                  { required: true, message: '请输入正确的身份证' },
                  { pattern: regExpConfig.IDcard, message: '请输入正确的身份证' },
                ],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系方式"
              hasFeedback
            >
              {getFieldDecorator('dhhm', {
                rules: [
                  { required: true, message: '请输入联系方式' },
                  { pattern: regExpConfig.phoneNo, message: '请输入联系方式' },
                ],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="人员类别"
              hasFeedback
            >
              {getFieldDecorator('dwrylx', {})(
                <Select >
                  <Option value="1">场所法人代表</Option>
                  <Option value="2">产权单位法人或产权人</Option>
                  <Option value="3">签订租赁合同人员</Option>
                  <Option value="4">实际经营人</Option>
                  <Option value="5">承包人</Option>
                  <Option value="6">股东</Option>
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
