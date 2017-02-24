/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { Form, Input, Select, Button, Checkbox, Modal } from 'antd';
import { regExpConfig } from 'utils/config'

const FormItem = Form.Item
const Option = Select.Option
const CheckboxGroup = Checkbox.Group;

@Form.create({
  onFieldsChange(props, items) {
    // props.cacheSearch(items);
  },
})

export default class roleSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      boxId: '',
      dptId: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    const oneInfo = this.props.values;
    if (oneInfo.id) {
      if(oneInfo.kjxgn){
        oneInfo.kjxgn = oneInfo.kjxgn.split(';')
      }
      this.props.form.setFieldsValue(oneInfo)
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      if(values.kjxgn&&values.kjxgn.length>0)
      values.kjxgn = values.kjxgn.join(';')
      this.props.onOk(values)
    });
  }

  footer() {
    return (
      <Button type="primary" onClick={this.handleSubmit}>确定</Button>
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { visible, onOk, onCancel, title } = this.props
    const plainOptions = [
      {
        label: '收件', value: '1',
      },
      {
        label: '寄件', value: '2',
      },
    ]
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    }
    return (
      <Modal
        visible={visible}
        title={title}
        onOk={onOk}
        onCancel={onCancel}
        footer={this.footer()}
        className="modal-body modal-header "
      >
        <div className="modalcontent">
          <Form horizontal>
            <FormItem {...formItemLayout} label="所属品牌公司">
              {getFieldDecorator('ssppgs')(
                <Select size="large">
                  <Option value="宿迁邮政E邮柜">宿迁邮政E邮柜</Option>
                  <Option value="富有">富有</Option>
                  <Option value="速易递">速易递</Option>
                  <Option value="快柜">快柜</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="快件箱地址">
              {getFieldDecorator('kjxdz')(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="放置地管理单位">
              {getFieldDecorator('snxkdw')(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="管理单位负责人">
              {getFieldDecorator('fzdfzr')(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="负责人联系方式">
              {getFieldDecorator('fzdfzrlxfs', {
                rules: [
                  { pattern: regExpConfig.mobile, message: '负责人联系方式格式不正确' },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="品牌负责人">
              {getFieldDecorator('ppglfzr')(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="品牌负责人联系方式">
              {getFieldDecorator('ppglfzrlxfs', {
                rules: [
                  { pattern: regExpConfig.phoneNo, message: '品牌负责人联系方式格式不正确' },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="储物柜数量">
              {getFieldDecorator('cwgsl', {
                rules: [
                  { pattern: regExpConfig.num, message: '储物柜数量格式不正确' },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="快件箱功能">
              {getFieldDecorator('kjxgn', {
                type: 'array',
              })(<CheckboxGroup options={plainOptions} />)}
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}
