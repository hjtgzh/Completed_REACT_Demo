/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Select, Modal, DatePicker } from 'antd'
import { regExpConfig } from 'utils/config'
import {
  fetchCompanyLegelPersonSearch,
} from 'actions/houseVisitCompany'

const FormItem = Form.Item
const Option = Select.Option

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    companyLegelPersonListResult: state.companyLegelPersonListResult,
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
    this.searchLegalPerson = this.searchLegalPerson.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      values.yyrq = values.yyrq.format('YYYY-MM-DD')
      this.props.handleOk(values)
    });
  }

  // 搜索法人
  searchLegalPerson(e) {
    e.preventDefault();
    if (this.props.form.getFieldError('frzjhm')) {
      console.log('Errors in form!!!');
      return;
    }
    this.props.dispatch(fetchCompanyLegelPersonSearch({ sfzh: this.props.form.getFieldValue('frzjhm') }, () => {
      this.props.form.setFieldsValue({
        frdb: this.props.companyLegelPersonListResult.xm,
        frlxdh: this.props.companyLegelPersonListResult.dhhm,
      })
    }))
  }

  footer() {
    return (
      <div>
        <Button size={'large'} onClick={this.handleSubmit}>确定</Button>
      </div>
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    }
    const {
      visible,
      onCancel,
    } = this.props
    return (
      <Modal
        className="modal-header modal-body"
        visible={visible}
        title="新增单位"
        onCancel={onCancel}
        footer={this.footer()}
      >
        <div className="modalcontent">
          <Form horizontal>
            <FormItem {...formItemLayout} label="机构名称">
              {getFieldDecorator('dwmc', {
                rules: [
                  { required: true, message: '请输入机构名称' },
                ],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="实际名称">
              {getFieldDecorator('sjmc', {
                rules: [
                  { required: true, message: '请输入实际名称' },
                ],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="机构代码	">
              {getFieldDecorator('dwbm', {
                rules: [
                  { required: true, message: '请输入机构代码' },
                ],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="工商执照代码">
              {getFieldDecorator('gszzhm', {
                rules: [
                  { required: true, message: '请输入工商执照代码' },
                ],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="开设日期">
              {getFieldDecorator('yyrq', {
                rules: [
                  { type: 'object', required: true, message: '请输入开设日期' },
                ],
              })(
                <DatePicker />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="法人身份证">
              {getFieldDecorator('frzjhm', {
                rules: [
                  { required: true, message: '请输入法人身份证' },
                  { pattern: regExpConfig.IDcard, message: '法人身份证格式不正确' },
                ],
              })(
                <Input />
              )}
              <a className="secrchmodal-jxy" onClick={this.searchLegalPerson}>查询</a>
            </FormItem>
            <FormItem {...formItemLayout} label="法人代表">
              {getFieldDecorator('frdb', {
                rules: [
                  { required: true, message: '请查询法人代表' },
                ],
              })(
                <Input readOnly />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="法人电话">
              {getFieldDecorator('frlxdh')(
                <Input readOnly />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="工商注册情况">
              {getFieldDecorator('sfzc', {
                rules: [
                  { required: true, message: '请选择工商注册情况' },
                ],
              })(
                <Select>
                  <Option value="1">未注册</Option>
                  <Option value="2">已注册</Option>
                  <Option value="3">已注销</Option>
                </Select>
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}
