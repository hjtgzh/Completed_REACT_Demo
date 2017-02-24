/**
 * Created by 余金彪 on 2016/12/13.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Modal, message, Form, Select } from 'antd'
import { regExpConfig } from 'utils/config'
import {
  fetchSaveXfx,
} from 'actions/groupFireMessage'

const FormItem = Form.Item
const Option = Select.Option
@Form.create({})
@connect(
  (state, props) => ({})
)
export default class GroupFireMessageModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalState: false,
      visible: false,
      loading: false,
    }
    this.onCancel = this.onCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {

  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.setState({ loading: true })
      this.props.dispatch(fetchSaveXfx({ ...values, dptId: this.props.dptId }, (result) => {
        message.success(result.msg)
        this.props.onOk()
        this.props.form.resetFields()
      }))
    });
  }


  onCancel() {
    this.props.onCancel()
    this.props.form.resetFields()
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
    const { title = '新增消防信息' } = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 },
      hasFeedback: true,
    }
    return (
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
            label="机构名称"
            {...formItemLayout}
          >
            {
              <Input value={sessionStorage.getItem('dwmc')} disabled />
            }
          </FormItem>
          <FormItem
            label="单位地址"
            {...formItemLayout}
          >
            {
              <Input value={sessionStorage.getItem('sjdz')} disabled />
            }
          </FormItem>
          <FormItem
            label="是否消防重点单位"
            {...formItemLayout}

          >
            {getFieldDecorator('sfxfzddw', { initialValue: sessionStorage.getItem('sfxfzddw') })(
              <Select placeholder="" disabled>
                <Option value="0">不是</Option>
                <Option value="1">是</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            label="消防安全重点部位"
            {...formItemLayout}
          >
            {
              getFieldDecorator('xfaqzdbw', {})(
                <Input placeholder="" />
              )
            }
          </FormItem>
          <FormItem
            label="义务消防队队数"
            {...formItemLayout}
          >
            {
              getFieldDecorator('ywxfdds', {
                rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '格式不正确' }],
              })(
                <Input placeholder="" />
              )
            }
          </FormItem>
          <FormItem
            label="专职消防队队数"
            {...formItemLayout}
          >
            {
              getFieldDecorator('zzxfdds', {
                rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '格式不正确' }],
              })(
                <Input placeholder="" />
              )
            }
          </FormItem>
          <FormItem
            label="义务消防队消防人数"
            {...formItemLayout}
          >
            {
              getFieldDecorator('ywxfdxfrs', {
                rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '格式不正确' }],
              })(
                <Input placeholder="" />
              )
            }
          </FormItem>
          <FormItem
            label="专职消防队消防人数"
            {...formItemLayout}
          >
            {
              getFieldDecorator('zzxfdxfrs', {
                rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '格式不正确' }],
              })(
                <Input placeholder="" />
              )
            }
          </FormItem>
          <FormItem
            label="义务消防队消防车数"
            {...formItemLayout}
          >
            {
              getFieldDecorator('ywxfdxfcs', {
                rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '格式不正确' }],
              })(
                <Input placeholder="" />
              )
            }
          </FormItem>
          <FormItem
            label="专职消防队消防车数"
            {...formItemLayout}
          >
            {
              getFieldDecorator('zzxfdxfcs', {
                rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '格式不正确' }],
              })(
                <Input placeholder="" />
              )
            }
          </FormItem>
          <FormItem
            label="义务消防队消防泵数"
            {...formItemLayout}
          >
            {
              getFieldDecorator('ywxfdxfbs', {
                rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '格式不正确' }],
              })(
                <Input placeholder="" />
              )
            }
          </FormItem>
          <FormItem
            label="	专职消防队消防泵数"
            {...formItemLayout}
          >
            {
              getFieldDecorator('zzxfdxfbs', {
                rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '格式不正确' }],
              })(
                <Input placeholder="" />
              )
            }
          </FormItem>
          <FormItem
            label="消防栓数"
            {...formItemLayout}
          >
            {
              getFieldDecorator('xfss', {
                rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '格式不正确' }],
              })(
                <Input placeholder="" />
              )
            }
          </FormItem>
          <FormItem
            label="消防井数"
            {...formItemLayout}
          >
            {
              getFieldDecorator('xfjs', {
                rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '格式不正确' }],
              })(
                <Input placeholder="" />
              )
            }
          </FormItem>
          <FormItem
            label="消防联络员"
            {...formItemLayout}
          >
            {
              getFieldDecorator('xflly', {})(
                <Input placeholder="" />
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
