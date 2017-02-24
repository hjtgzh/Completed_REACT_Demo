/*
 *Create By 韩卿
 */
import React, { Component } from 'react'
import { Row, Col, Form, DatePicker, Modal, Input, Select } from 'antd'

const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item
const Option = Select.Option
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}
const layout2 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
class blastingProjectModal extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleOk = this.handleOk.bind(this)
    // this.options=this.options.bind(this)
    // this.gridsTemplate=this.gridsTemplate.bind(this)
  }

  componentWillReceiveProps(nextProps) {

  }

  // 两列两列渲染
  gridsTemplate(o) {
    const { getFieldDecorator } = this.props.form
    return (
      <Col span={12} key={o.key}>
        <FormItem
          {...layout}
          label={o.label}
        >
        {
          getFieldDecorator(o.key, o.rule || {})(
            o.render ? o.render() : <Input placeholder={o.placeholder} maxLength={o.maxlength || 10} />
          )
        }
        </FormItem>
      </Col>
    )
  }

  // 一行一行渲染
  gridsTemplate2(o) {
    const { getFieldDecorator } = this.props.form
    return (
      <Row key={o.key}>
        <FormItem
          {...layout2}
          label={o.label}
        >
        {
          getFieldDecorator(o.key, o.rule || {})(
            o.render ? o.render() :
              <Input type="textarea" autosize placeholder={o.placeholder} maxLength={o.maxlength || 250} />
          )
        }
        </FormItem>
      </Row>
    )
  }

  // 一行2个col的内容
  options() {
    return [
      {
        label: '爆破项目名称',
        placeholder: '请输入爆破项目名称',
        key: 'bpxmname',
      },
      {
        label: '爆破作业地址',
        placeholder: '请输入爆破作业地址',
        key: 'dz',
      },
      {
        label: '爆破设计单位',
        placeholder: '请输入爆破设计单位',
        key: 'bpsjdw',
      },
      {
        label: '爆破作业单位',
        placeholder: '请输入爆破作业单位',
        key: 'bpzydw',
      },
      {
        label: '设计审核人员',
        placeholder: '请输入设计审核人员',
        key: 'sjshry',
      },
      {
        label: '爆破作业人员',
        placeholder: '请输入爆破作业人员',
        key: 'bpzyry',
      },
      {
        label: '安全评估单位',
        placeholder: '请输入安全评估单位',
        key: 'aqpgdw',
      },
      {
        label: '评估人员',
        placeholder: '请输入评估人员',
        key: 'pgry',
      },
      {
        label: '安全监理单位',
        placeholder: '请输入安全监理单位',
        key: 'aqjldw',
      },
      {
        label: '监理人员',
        placeholder: '请输入监理人员',
        key: 'jlry',
      },
      {
        label: '炸药用量估算',
        placeholder: '请输入炸药用量估算',
        key: 'zyylgs',
      },
      {
        label: '单次爆破最大药量',
        placeholder: '请输入单次爆破最大药量',
        key: 'dcbpzdyl',
      },
      {
        label: '索类用量',
        placeholder: '请输入索类用量',
        key: 'slyl',
      },
      {
        label: '爆破作业施工时限',
        placeholder: '请输入爆破作业施工时限',
        key: 'bpzysgsx',
      },
      {
        label: '计划爆破次数',
        key: 'jhbpcs',
        placeholder: '请输入计划爆破次数',
      },
      {
        label: '爆破器材储存地点',
        key: 'bpqcccdd',
        placeholder: '请输入爆破器材储存地点',
      },
      // {
      //   label: '爆破作业开始时间',
      //   key: 'bpstarttime',
      //   render: () => <DatePicker placeholder="请选择爆破作业开始时间" />,
      // },
      // {
      //   label: '爆破作业结束时间',
      //   key: 'bpendtime',
      //   render: () => <DatePicker placeholder="请选择爆破作业结束时间" />,
      // },
      {
        label: '所属辖区',
        key: 'ssxq',
        placeholder: '请输入所属辖区',
      },
      {
        label: '爆破项目类别',
        key: 'bplb',
        render: () => (
          <Select placeholder="请输入爆破项目类别" style={{ width: '100%' }}>
            <Option value="1">矿山</Option>
            <Option value="2">非矿山</Option>
          </Select>),
      },
    ]
  }

  // 一行1个Row的内容
  options2() {
    return [
      {
        label: '爆破作业时间',
        key: 'bpzysj',
        render: () => <RangePicker placeholder={['请选择爆破作业开始时间', '请选择爆破作业结束时间']} />,
      },
      {
        label: '派出所意见(县级)',
        key: 'pcsyj',
        placeholder: '请输入派出所意见(县级)',
      },
      {
        label: '治安大队承办意见',
        key: 'zaddcbyj',
        placeholder: '请输入治安大队承办意见',
      },
      {
        label: '治安大队领导意见',
        key: 'zaddldyj',
        placeholder: '请输入治安大队领导意见',
      },
      {
        label: '局领导意见(县级)',
        key: 'jldyjxj',
        placeholder: '请输入局领导意见(县级)',
      },
      {
        label: '承办意见',
        key: 'cbyj',
        placeholder: '请输入承办意见',
      },
      {
        label: '大队意见',
        key: 'ddyj',
        placeholder: '请输入大队意见',
      },
      {
        label: '支队意见',
        key: 'zdyj',
        placeholder: '请输入支队意见',
      },
      {
        label: '局领导意见(市级)',
        key: 'jldyjsj',
        placeholder: '请输入局领导意见(市级)',
      },
    ]
  }

  // 保存信息
  handleOk() {
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.error('error', err)
        return
      }
      values.bpstarttime = values.bpzysj&&values.bpzysj[0] && values.bpzysj[0].format('YYYY-MM-DD')
      values.bpendtime = values.bpzysj&&values.bpzysj[1] && values.bpzysj[1].format('YYYY-MM-DD')
      this.props.onOk(values)
    })
  }

  render() {
    return (
      <Modal
        className="modal-header modal-body modal-large "
        onOk={this.handleOk}
        onCancel={this.props.onCancel}
        visible
        title={this.props.title}
        confirmLoading={this.props.btnLoading}
      >
        <Row gutter={4}>
          {
           this.options().map((v, i) => this.gridsTemplate(v))
          }
        </Row>
        {this.options2().map((v, i) => this.gridsTemplate2(v))}
      </Modal>
    )
  }
}

export default Form.create({

})(blastingProjectModal)
