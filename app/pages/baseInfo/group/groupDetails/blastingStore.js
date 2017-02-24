/*
 *Create By 韩卿
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Row, Col, Form, Input, DatePicker, message, Spin } from 'antd'
import moment from 'moment'
import { fetchBlastingStore, saveBlastingStore } from 'actions/groupBlastingUnit'

const FormItem = Form.Item

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

@connect(
  (state, props) => ({
    config: state.config,
    blastingStoreResult: state.blastingStoreResult,
  })
)
@Form.create({
  mapPropsToFields(props) {
    const fields = {}
    Object.keys(props.blastingStoreResult || {}).map((v, i) => {
      if (v === 'pzsj') {
        fields[v] = { value: moment(props.blastingStoreResult[v], 'YYYY-MM-DD') }
        return
      }
      fields[v] = { value: props.blastingStoreResult[v] }
    })
    return fields;
  },
})

export default class blastingStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      btnLoading: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(fetchBlastingStore({ dptId: this.props.departmentId }))
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
          getFieldDecorator(o.key, {})(
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

  // 填充网格配置项
  options() {
    return [
      {
        label: '机构名称',
        placeholder: '请输入机构名称',
        key: 'dptname',
      },
      {
        label: '负责人',
        placeholder: '请输入负责人',
        key: 'fzr',
      },
      {
        label: '仓库地址',
        placeholder: '请输入仓库地址',
        key: 'ckdz',
      },
      {
        label: '联系电话',
        placeholder: '请输入联系电话',
        key: 'tel',
      },
      {
        label: '面积',
        placeholder: '请输入面积',
        key: 'mj',
      },
      {
        label: '守卫人员',
        placeholder: '请输入守卫人员',
        key: 'swry',
      },
      {
        label: '主管单位',
        placeholder: '请输入主管单位',
        key: 'zgdw',
      },
      {
        label: '保管人员',
        placeholder: '请输入保管人员',
        key: 'bgry',
      },
      {
        label: '批准单位',
        placeholder: '请输入批准单位',
        key: 'pzdw',
      },
      {
        label: '批准时间',
        placeholder: '请输入批准时间',
        key: 'pzsj',
        render: () => <DatePicker placeholder="请输入批准时间" />,
      },
      {
        label: '安全监管负责单位',
        placeholder: '请输入安全监管负责单位',
        key: 'aqjgfzdw',
      },
      {
        label: '安全监管责任领导',
        placeholder: '请输入安全监管责任领导',
        key: 'aqjgzrld',
      },
      {
        label: '安全监管负责民警',
        placeholder: '请输入安全监管负责民警',
        key: 'aqjgzrmj',
      },
      {
        label: '附近重要建筑、居民点',
        key: 'zyjzjmd',
        render: () => <Input type="textarea" autosize placeholder="请输入附近重要建筑、居民点" />,
      },
      {
        label: '负责人或保卫科意见',
        key: 'fzrbwkyj',
        render: () => <Input type="textarea" autosize placeholder="请输入负责人或保卫科意见" />,
      },
      {
        label: '单位负责人意见',
        key: 'dwfzryj',
        render: () => <Input type="textarea" autosize placeholder="请输入单位负责人意见" />,
      },
      {
        label: '公安机关审核意见',
        key: 'gajgshyj',
        render: () => <Input type="textarea" autosize placeholder="请输入公安机关审核意见" />,
      },
    ]
  }

  // 保存信息
  handleClick() {
    const requestObj = this.props.form.getFieldsValue()
    requestObj.dptId = this.props.departmentId
    requestObj.pzsj = requestObj.pzsj.format('YYYY-MM-DD')
    this.setState({ btnLoading: true })
    this.props.dispatch(saveBlastingStore(requestObj, (response) => {
      this.setState({ btnLoading: false })
      if (response.status === 1) {
        message.success('保存成功')
      } else {
        message.error(response.msg)
      }
    }))
  }

  render() {
    return (
      <div className="detail-content">
        <Spin spinning={this.props.blastingStoreResult.loading}>
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
