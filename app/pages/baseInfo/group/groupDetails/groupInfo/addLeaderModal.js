/**
 * Created by 余金彪 on 2017/1/5.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { Modal, Form, Input, message, Select } from 'antd'
import { connect } from 'react-redux'
import { regExpConfig } from 'utils/config'
import {
  fetchSaveDepartLeader,
} from 'actions/groupInformation'

const FormItem = Form.Item
const Option = Select.Option
@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,
    departmentDetailInfo: state.departmentDetailInfo,
  })
)
export default class AddLeaderModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleForModel: false,
    }
    this.onCancel = this.onCancel.bind(this)
    this.onOk = this.onOk.bind(this)
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (this.state.visibleForModel !== nextProps.visible) {
      this.setState({ visibleForModel: nextProps.visible })
    }
  }

  // 新增弹窗取消
  onCancel() {
    this.props.form.resetFields()
    this.props.addLeaderCancle()
  }

  // 新增弹窗Ok
  onOk() {
    const self = this
    self.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      self.props.dispatch(fetchSaveDepartLeader({ ...values, dwid: self.props.departmentId }, (result) => {
        message.success(result.msg)
        this.props.form.resetFields()
        this.props.addLeaderOk()
      }))
    })
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
        >
          <Form horizontal>
            <FormItem
              {...formItemLayout}
              label="人员姓名"
              hasFeedback
            >
              {getFieldDecorator('xm', {
                rules: [{ required: true, message: '请输入人员姓名' }],
              })(
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
              {getFieldDecorator('dwrylx', {
                rules: [{ required: true, message: '请选择人员类别' }],
              })(
                <Select>
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
