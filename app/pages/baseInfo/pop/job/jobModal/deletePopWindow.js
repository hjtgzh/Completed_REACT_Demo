import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Select, Row, Col,message,Modal } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;

import {
  deleteDeopleDetails
} from 'actions/job'


//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config
  })
)

@Form.create({})

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.popId)
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      this.setState({loading: true});
      this.props.dispatch(deleteDeopleDetails({...values, id: this.props.popId}, () => {
        this.setState({loading: false});
        this.props.form.resetFields();
        this.props.handleOk();
      }))
    });
  }

  lzyyItem() {
    return [
      {code: '0', lzyy: '原因1'},
      {code: '1', lzyy: '原因2'}
    ]
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.form.resetFields();
    this.props.handleCancel();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 17}
    }
    return (
      <Modal
        visible={this.props.visible}
        className='modal-header'
        title={this.props.title}
        onCancel={this.handleCancel}
        footer={[
        <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>确定</Button>,
        <Button onClick={this.handleCancel}>取消</Button>]}
      >
        <div className="modalcontent modal-middle">
          <Form horizontal>
            <FormItem {...formItemLayout} label="离职原因" hasFeedback>
              {getFieldDecorator('lzyy', {
                rules: [
                  {required: true, message: '请选择离职原因'}
                ]
              })(
                <Select name="lzyy">
                  {this.lzyyItem().map((v, i) => <Option value={v.code} key={v.code}>{v.lzyy}</Option>)}
                </Select>
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}
