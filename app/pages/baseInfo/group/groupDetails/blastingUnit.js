/*
 *Create By 韩卿
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Row, Col, Form, Select, Input, DatePicker, message, Spin } from 'antd'
import moment from 'moment'
import { saveBlastingUnit, fetchBlastingUnit } from 'actions/groupBlastingUnit'

const Option = Select.Option
const FormItem = Form.Item

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
@connect(
  (state, props) => ({
    config: state.config,
    blastingUnitResult: state.blastingUnitResult,
  })
)
@Form.create({
  mapPropsToFields(props) {
    const fields = {}
    Object.keys(props.blastingUnitResult || {}).map((v, i) => {
      if (v === 'xksj') {
        fields[v] = { value: moment(props.blastingUnitResult[v], 'YYYY-MM-DD') }
        return
      }
      fields[v] = { value: props.blastingUnitResult[v] }
    })
    return fields;
  },
})

export default class blastingUnit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      btnLoading: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(fetchBlastingUnit({ dptId: this.props.departmentId }))
  }

  // 网格模板
  gridsTemplate(o) {
    const { getFieldDecorator } = this.props.form
    return (
      <Col span={12} key={o.key} style={{/* border:'1px solid #010',margin:'-1px 0 0 -1px'*/}}>
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

  // select配置项
  selectOptions() {
    return [
      { code: '0', name: '矿山企业' },
      { code: '1', name: '经营性单位' },
      { code: '2', name: '生产单位' },
      { code: '3', name: '销售点' },
      { code: '4', name: '存储库' },
      { code: '5', name: '经营公司' },
      { code: '6', name: '运输企业' },
    ]
  }

  // 填充网格的配置项
  options() {
    const self = this
    return [
      {
        label: '许可时间',
        placeholder: '',
        key: 'xksj',
        render: () => <DatePicker placeholder="请选择时间" />,
        rule: {
          rules: [{
            validator(rule, value, callback, source, options) {
              const xksj = self.props.form.getFieldValue('xksj')
              const now = (new Date()).getTime()
              const selectedTime = (new Date(xksj)).getTime()
              if (selectedTime > now) {
                callback('许可时间不能晚于今天')
                return
              }
              callback()
            },
          }],
        },
      },
      {
        label: '单位类别',
        placeholder: '',
        key: 'dwlb',
        render: () =>
          <Select placeholder="请选择单位类别" style={{ width: '100%' }}>
          {
            this.selectOptions().map((v, i) => <Option value={v.code} key={i}>{v.name}</Option>)
          }
          </Select>,
      },
      {
        label: '市内许可单位',
        placeholder: '请输入市内许可单位',
        key: 'snxkdw',
      },
      {
        label: '市外许可单位',
        placeholder: '请输入市外许可单位',
        key: 'swxkdw',
      },
      {
        label: '主管单位',
        placeholder: '请输入主管单位',
        key: 'zgdw',
      },
      {
        label: '单位许可情况',
        placeholder: '请输入单位许可情况',
        key: 'dwxkqk',
      },
      {
        label: '资质等级',
        placeholder: '请输入资质等级',
        key: 'zzdj',
      },
      {
        label: '其他资质',
        placeholder: '请输入其他资质',
        key: 'qtzz',
      },
    ]
  }

  // 保存信息
  handleClick() {
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(err.xksj.errors[0].message)
        return;
      }
      const requestObj = this.props.form.getFieldsValue()
      this.setState({ btnLoading: true })
      requestObj.dptid = this.props.departmentId
      requestObj.xksj = moment(requestObj.xksj).format('YYYY-MM-DD')
      this.props.dispatch(saveBlastingUnit(requestObj, (response) => {
        this.setState({ btnLoading: false })
        if (response.status === 1) {
          message.success('保存成功')
        } else {
          message.error(response.msg)
        }
      }))
    })
  }

  render() {
    return (
      <div className="detail-content">
        <Spin spinning={this.props.blastingUnitResult.loading}>
          <Row gutter={0}>
           {
            this.options().map((v, i) => this.gridsTemplate(v))
           }
          </Row>
        </Spin>
        <div className="ability-button">
          <Button
            onClick={this.handleClick}
            loading={this.state.btnLoading}
          >保存</Button>
        </div>
      </div>
    )
  }
}
