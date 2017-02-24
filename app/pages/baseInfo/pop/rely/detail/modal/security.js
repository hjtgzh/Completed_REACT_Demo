/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { Button, Form, Input, Checkbox, Select, Row, Col, DatePicker } from 'antd'
import moment from 'moment'
import WindowSize from 'components/windowSize'
import { relyZzmm, relyWhcd, regExpConfig } from 'utils/config'

const Option = Select.Option
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group


@Form.create({
  onFieldsChange(props, items) {
        // props.cacheSearch(items);
  },
})

export default class jobInfo extends Component {
  constructor(props) {
    super(props)
    this.handleReset = this.handleReset.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateState = this.updateState.bind(this)
  }

  componentDidMount() {
    const { relyBasicResult } = this.props
    this.props.form.setFieldsValue(relyBasicResult)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.relyBasicResult === nextProps.relyBasicResult) {
      return
    }
    const relyBasicResult = nextProps.relyBasicResult
    this.props.form.setFieldsValue(relyBasicResult)
  }

  // 重置
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  // 保存
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const value = { ...this.props.relyBasicResult, ...values }
      value.cxsj = value.cxsj && value.cxsj.format('YYYY-MM-DD hh:mm:ss') || ''
      value.xxylb = value.xxylb instanceof Array ? value.xxylb.join(',') : value.xxylb || ''
      value.xxylb = value.xxylb.replace(new RegExp(',+', 'gm'), ',')
      this.props.upadteForm(value)
    });
  }

  // 类别信息
  infoCage() {
    return [
      {
        value: '1',
        label: '楼道（庭院）信息员、社区（村)干部',
      },
      {
        value: '2',
        label: '小组长 ',
      },
      {
        value: '3',
        label: '单位（小区）值守人员',
      },
      {
        value: '4',
        label: '特种行业业主从业人员',
      },
      {
        value: '5',
        label: '娱乐服务场所业主从业人员',
      },
      {
        value: '6',
        label: '治安保卫重点单位业主从业人员',
      },
    ]
  }

  updateState() {
    this.setState({})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { relyBasicResult } = this.props
    relyBasicResult.csrq = relyBasicResult.csrq ? moment(relyBasicResult.csrq) : moment('')
      // debugger
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    }
    return (
      <div className="content" >
        <Form horizontal
          style={{ height: `${$GLOBALCONFIG.PAGEHEIGHT - 450}px`, overflowY: 'auto', overflowX: 'hidden' }}
        >
          <WindowSize updateState={this.updateState} />
          <Row gutter={16}>
            <Col span="12">
              <FormItem {...formItemLayout} label="别名">
                {getFieldDecorator('bm')(
                  <Input type="text" maxLength="20" name="bm" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="政治面貌">
                {getFieldDecorator('zzmm')(
                  <Select name="zzmm"
                    size="large"
                  >
                  {relyZzmm.map((v, i) => <Option key={i} value={v.value}>{v.content}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="出生日期">
                {getFieldDecorator('csrqLabel')(
                  <Input type="text" disabled />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="婚姻状况">
                {getFieldDecorator('hyzk')(
                  <Select name="hyzk"
                    id="marriage"
                    size="large"
                  >
                    <Option value="">请选择</Option>
                    <Option value="10">未婚</Option>
                    <Option value="20">已婚</Option>
                    <Option value="21">初婚</Option>
                    <Option value="22">再婚</Option>
                    <Option value="23">复婚</Option>
                    <Option value="30">丧偶</Option>
                    <Option value="40">离婚</Option>
                    <Option value="50">未说明的婚姻状况</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="宗教信仰 ">
                {getFieldDecorator('zjxy')(
                  <Select name="zjxy"
                    id="religion"
                    size="large"
                  >
                    <Option value="">请选择</Option>
                    <Option value="00">无宗教信仰</Option>
                    <Option value="10">佛教</Option>
                    <Option value="20">喇嘛教</Option>
                    <Option value="30">道教</Option>
                    <Option value="40">天主教</Option>
                    <Option value="50">基督教</Option>
                    <Option value="60">东正教</Option>
                    <Option value="70">伊斯兰教</Option>
                    <Option value="99">其他</Option>
                  </Select>
                )}

              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="文化程度">
                {getFieldDecorator('whcd')(
                  <Select name="whcd"
                    id="culture"
                    size="large"
                  >
                  {relyWhcd.map((v, i) => <Option key={i} value={v.value}>{v.content}</Option>)}
                  </Select>
                )}

              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="专长">
                {getFieldDecorator('zc')(
                  <Input type="text" maxLength="20" name="zc" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="职业">
                {getFieldDecorator('zy')(
                  <Input type="text" maxLength="20" name="zy" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="从业资格证">
                {getFieldDecorator('cyzgz')(
                  <Input type="text" maxLength="20" name="cyzgz" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="健康状况 ">
              {getFieldDecorator('zkzk')(
                <Select name="zkzk"
                  id="health"
                  size="large"
                >
                  <Option value="">请选择</Option>
                  <Option value="1">健康或良好</Option>
                  <Option value="2">一般或较弱</Option>
                  <Option value="3">有疾病</Option>
                  <Option value="4">有生理缺陷</Option>
                  <Option value="5">残废</Option>
                  <Option value="6">有精神类疾病</Option>
                </Select>
              )}

              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="电话号码 ">
                {getFieldDecorator('dhhm', {
                  rules: [
                      { message: '请输入正确的电话号码' },
                      { pattern: regExpConfig.telephone, message: '请输入正确的电话号码' },
                  ],
                })(
                  <Input type="text" name="dhhm" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="微信/QQ ">
                {getFieldDecorator('wxqq')(
                  <Input type="text" maxLength="20" name="wxqq" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="机动车 ">
                {getFieldDecorator('jdc')(
                  <Input type="text" maxLength="20" name="jdc" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="电动车 ">
                {getFieldDecorator('ddc')(
                  <Input type="text" maxLength="20" name="ddc" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="现住地址  ">
                {getFieldDecorator('xzdz')(
                  <Input type="text" maxLength="20" name="xzdz" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="现住派出所">
                {getFieldDecorator('xzpcs')(
                  <Input type="text" maxLength="20" name="xzpcs" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="工作单位  ">
                {getFieldDecorator('gzcs')(
                  <Input type="text" maxLength="20" name="gzcs" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="备注 ">
                {getFieldDecorator('bz')(
                  <Input type="text" maxLength="20" name="bz" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="物建民警">
                {getFieldDecorator('wjmj')(
                  <Input type="text" maxLength="20" name="wjmj" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="使用社区 ">
                {getFieldDecorator('sysq')(
                  <Input type="text" maxLength="20" name="sysq" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="撤销时间">
                {getFieldDecorator('cxsj')(
                  <DatePicker showTime format="YYYY-MM-DD hh:mm:ss" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="信息员类别">
                {getFieldDecorator('xxylb')(
                  <CheckboxGroup options={this.infoCage()} />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div className="ability-button">
          <Button onClick={this.props.showNotice}>标签</Button>
          <Button className="btn-right" onClick={this.handleSubmit}>保存</Button>
          <Button className="btn-right" onClick={this.props.deleteModal}>删除</Button>
        </div>
      </div>
    )
  }
}
