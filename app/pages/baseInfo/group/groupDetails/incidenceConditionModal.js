/*
 *Create By 韩卿
 */
import React, { Component } from 'react'
import { Row, Form, DatePicker, Select, Modal, Input } from 'antd'
// import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option

class incidenceConditionModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleOk = this.handleOk.bind(this)
  }

  componentWillReceiveProps(nextProps) {

  }

  // select配置项
  selectOptons() {
    return [
      { code: '10', name: '刑事案件' },
      { code: '11', name: '刑事(涉毒)案件' },
      { code: '12', name: '刑事(经侦)案件' },
      { code: '20', name: '行政案件' },
      { code: '21', name: '行政(治安)案件' },
      { code: '31', name: '事件' },
      { code: '001', name: '刑事' },
      { code: '002', name: '治安' },
      { code: '003', name: '一般行政' },
    ]
  }

  // 点击弹窗的确定按钮时触发的函数
  handleOk() {
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.error('error', err)
        return
      }
      this.props.onOk(values)
    })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      // hasFeedback:true
    }
    const { getFieldDecorator } = this.props.form
    return (
      <Modal className="modal-body modal-header " onOk={this.handleOk} onCancel={this.props.onCancel} visible
        title={this.props.title} confirmLoading={this.props.btnLoading}
      >
        <Row gutter={8}>
          <FormItem
            label="案件编号"
            {...formItemLayout}
          >
            {
              getFieldDecorator('ajbh', {
                rules: [{ required: true, message: '请输入案发编号' }],
              })(
                <Input placeholder="请输入案发编号" maxLength="10" />
              )
            }
          </FormItem>
        </Row>
        <Row gutter={8}>
          <FormItem
            label="案发时间"
            {...formItemLayout}
          >
            {
              getFieldDecorator('fasj', {
                rules: [{ type: 'object', required: true, message: '请选择时间' }],
              })(
                <DatePicker placeholder="请选择时间" />
              )
            }
          </FormItem>
        </Row>
        <Row gutter={8}>
          <FormItem
            label="案发性质"
            {...formItemLayout}
          >
            {
              getFieldDecorator('ajxz', {
                rules: [{ required: true, message: '请选择案发性质' }],
              })(
                <Select placeholder="请选择案发性质" style={{ width: '100%' }}>
                  {
                    this.selectOptons().map((v, i) =>
                      <Option value={v.code} key={i}>{v.name}</Option>
                    )
                  }
                </Select>
              )
            }
          </FormItem>
        </Row>
        <Row gutter={8}>
          <FormItem
            label="案发类别"
            {...formItemLayout}
          >
            {
              getFieldDecorator('ajlb', {
                rules: [{ required: true, message: '请输入案发类别' }],
              })(
                <Input placeholder="请输入案发类别" maxLength="10" />
              )
            }
          </FormItem>
        </Row>
        <Row gutter={8}>
          <FormItem
            label="备注"
            {...formItemLayout}
          >
            {
              getFieldDecorator('bz', {
                rules: [],
              })(
                <Input type="textarea" placeholder="请输入备注" autosize maxLength="250" />
              )
            }
          </FormItem>
        </Row>
      </Modal>
    )
  }
}

export default Form.create({
  /* mapPropsToFields(props) {
    console.log(props)
    if (!props.id) {
      return {}
    }
    const fields = {}
    Object.keys(props.preData).map((v, i)=> {
      if (v == 'afsj') {
        fields[v] = {value: moment(props.preData[v], 'YYYY-MM-DD')}
        return
      }
      fields[v] = {value: props.preData[v]}
    })
    return fields
  }*/
})(incidenceConditionModal)
