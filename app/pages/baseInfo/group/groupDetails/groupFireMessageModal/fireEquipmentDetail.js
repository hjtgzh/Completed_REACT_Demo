/**
 * Created by 余金彪 on 2016/12/14.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Modal, message, Form } from 'antd'
import { regExpConfig } from 'utils/config'
import {
  fetchSaveXfxxXfqc,
} from 'actions/groupFireMessage'

const FormItem = Form.Item
@Form.create({})
@connect(
  (state, props) => ({})
)
export default class FireEquipmentDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      addressInfo: {},
      searchLoading: false,
    }
    this.onCancel = this.onCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.form.setFieldsValue(this.props.defaultValue)
  }

  onCancel() {
    this.props.onCancel()
  }

  // 保存
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.setState({ loading: true })
      const id = this.props.defaultValue.id
      values.tjsj = this.props.defaultValue.tjsj
      this.props.dispatch(fetchSaveXfxxXfqc({ ...values, id: id, dptId: this.props.dptId }, (result) => {
        message.success(result.msg)
        this.props.onOk()
      }))
      this.setState({ loading: false })
    });
  }

  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit}>保存修改内容</Button>
        <Button type="" onClick={this.onCancel}>取消</Button>
      </div>
    )
  }

  render() {
    const { title = '消防器材详情' } = this.props
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
              label="灭火器型号"
              {...formItemLayout}
            >
              {
                getFieldDecorator('mhqxh', {
                  rules: [{ required: true, message: '请输入灭火器型号' }]
                })(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="灭火器数量"
              {...formItemLayout}
            >
              {
                getFieldDecorator('mhqsl', {
                  rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '请输入正确数字' }],
                })(
                  <Input placeholder="" />
                )
              }
            </FormItem>
            <FormItem
              label="保存年限"
              {...formItemLayout}

            >
              {
                getFieldDecorator('bcnx', {
                  rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '请输入正确数字' }],
                })(
                  <Input placeholder="" />
                )
              }
            </FormItem>

            <FormItem
              label="备注"
              {...formItemLayout}
            >
              {
                getFieldDecorator('bz', {})(
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

