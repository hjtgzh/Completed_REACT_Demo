/*
 * creator：周美英 2016-11-10 10:30 创建js
 * editor:周美英 2017-2-13 10:30 在头部添加文件修改记录
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Form, Input, Select, Spin, message } from 'antd'
import Panel from 'components/panel'
import { updateTabList } from 'actions/tabList'
import { regExpConfig } from 'utils/config.js'
import {
  fetchPoliceDetail,
  fetchUpdatePoliceDetail,
} from 'actions/police'
import 'style/policeDetail.css'

const Option = Select.Option
const FormItem = Form.Item
@connect(
  (state) => ({
    config: state.config,
    policeDetailSearchResult: state.policeDetailSearchResult,
    updateDetailSearchResult: state.updateDetailSearchResult,
    tabList: state.tabListResult,
  })
)

@Form.create({
  onFieldsChange(props, fields) {
  },


})


export default class policeDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const policeId = this.props.policeId || this.props.params.policeId || 1
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '警员详情',
        key: `/police$Detail/${policeId}`,
      }))
    }
    this.seachPoliceDetail(policeId)
  }

  componentWillMount() {
  }

  seachPoliceDetail(policeId) {
    this.props.dispatch(fetchPoliceDetail({ objectId: policeId }, (result) => {
      this.props.form.setFieldsValue(result.data)
    }))
  }

  // 父级页面传参发生变化时进行比较查询数据
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.policeId !== this.props.params.policeId) {
      this.seachPoliceDetail(nextProps.params.policeId)
    }
  }

  // 修改详情
  handleSubmit(e) {
    const policeId = this.props.policeId || this.props.params.policeId || 1
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        const params = {
          ...values,
          'objectId': policeId,
        }
        this.props.dispatch(fetchUpdatePoliceDetail(params, (result) => {
          message.success(result.msg)
          this.props.dispatch(fetchPoliceDetail({ objectId: policeId }, (reply) => {
            this.props.form.setFieldsValue(reply.data)
          }))
        }))
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { policeDetailSearchResult, updateDetailSearchResult } = this.props
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    }
    return (
      <Panel>
        <Spin spinning={policeDetailSearchResult.loading}>
          <div className="police-detail-content">
            <div className="police-photo">
              <img style={{ width: '100%', height: '100%' }} src={policeDetailSearchResult.photoPath} />
            </div>
            <div className="peopleInfo">
              <Form onSubmit={this.handleSubmit}>
                <Row gutter={16}>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="姓名">
                      {getFieldDecorator('userName', {
                        rules: [],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="警号">
                      {getFieldDecorator('userCode', {
                        rules: [],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="职务">
                      {getFieldDecorator('post', {
                        rules: [],
                      })(<Input disabled />)}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="所属部门">
                      {getFieldDecorator('dptName', {
                        rules: [],
                      })(
                        <Input disabled />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="是否领导">
                      {getFieldDecorator('isLeader', {
                        rules: [],
                      })(
                        <Select>
                          <Option value="1">是</Option>
                          <Option value="0"> 否</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="电子邮箱">
                      {getFieldDecorator('email', {
                        rules: [{ type: 'email', message: '请输入正确的邮箱号码' }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="办公室号">
                      {getFieldDecorator('dptCode', {
                        rules: [],
                      })(
                        <Input />
                      )}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="办公室电话">
                      {getFieldDecorator('officePhone', {
                        rules: [
                          { pattern: regExpConfig.telephone, message: '请输入正确的电话号码' },
                        ],
                      })(
                        <Input />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="手机号">
                      {getFieldDecorator('mobile', {
                        rules: [
                          { pattern: regExpConfig.phoneNo, message: '请输入正确的手机号码' },
                        ],
                      })(
                        <Input />
                      )}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="虚拟号">
                      {getFieldDecorator('shortMobile', {
                        rules: [],
                      })(
                        <Input />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Spin>
        <div className="ability-button">
          <Button onClick={this.handleSubmit} loading={updateDetailSearchResult.loading}>修改</Button>
        </div>
      </Panel>
    )
  }
}
