/**
 * Created by 江夏云 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Modal } from 'antd'
import { regExpConfig } from 'utils/config'
import {
    fetchRoleAdd,
    fetchRoleUpdate,
} from 'actions/setrole'

const FormItem = Form.Item

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
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      name: this.props.value.name,
      sort: `${this.props.value.sort}`,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      this.setState({ loading: true })
      if (this.props.type == 'modify') {
        this.props.dispatch(fetchRoleUpdate({ ...values, id: this.props.modifyId }, (result) => {
          this.props.handleOk(false)
        }))
      } else {
        this.props.dispatch(fetchRoleAdd(values, (result) => {
          this.props.handleOk(false)
        }))
      }
      this.setState({ loading: false })
      this.props.form.resetFields()
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
            <FormItem {...formItemLayout} label="角色名称" hasFeedback>
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '请输入角色名称' },
                  { pattern: regExpConfig.isNormalEncode, message: '请输入非特殊字符' },
                ],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="角色排序">
              {getFieldDecorator('sort', {
                rules: [
                  { required: true, message: '请输入排序数字' },
                  { pattern: regExpConfig.num, message: '请输入数字' },
                ],
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

