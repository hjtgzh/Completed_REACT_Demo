/**
 * Created by 余金彪 on 2016/12/14.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Row, Col, Button, Form, Input, message, Spin, Select,
} from 'antd'
import { regExpConfig } from 'utils/config'
import {
  fetchSaveXfx,
} from 'actions/groupFireMessage'

const FormItem = Form.Item
const Option = Select.Option
// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,

  })
)
export default class groupFireMessageDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.detailValue != '') {
      this.setState({
        loading: false,
      })
      if (this.props.detailValue.sfxfzddw == 1) {
        this.props.detailValue.sfxfzddw = '是'
      } else {
        this.props.detailValue.sfxfzddw = '否'
      }
      this.props.form.setFieldsValue(this.props.detailValue)
    }
  }

  // 保存消防信息
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.setState({ loading: true })
      values.sfxfzddw = values.sfxfzddw == '是' ? '1' : '0'
      const id = this.props.detailValue.id
      this.props.dispatch(fetchSaveXfx({ ...values, id: id, dptId: this.props.dptId }, (result) => {
        if (result.status == 1) {
          message.success(result.msg)
          this.setState({ loading: false })
        }
      }))
    });
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    }
    const { getFieldDecorator } = this.props.form
    return (
      <Spin spinning={this.state.loading}>
        <div className="nav-second-nextContent">
          <div className="detail-content">
            <Form style={{ marginTop: 20 }}>
              <Row gutter={16}>
                <Col span="12">
                  <FormItem
                    label="单位名称"
                    {...formItemLayout}
                  >
                    {
                      <Input value={sessionStorage.getItem('dwmc')} disabled />
                    }
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...formItemLayout} label="单位地址">
                    {
                      <Input value={sessionStorage.getItem('sjdz')} title={sessionStorage.getItem('sjdz')} disabled />
                    }
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...formItemLayout} label="是否消防重点单位">
                    {getFieldDecorator('sfxfzddw')(
                      <Input disabled />
                    )}
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...formItemLayout} label="消防安全重点部位	">
                    {
                      getFieldDecorator('xfaqzdbw')(
                        <Select placeholder="">
                          <Option value="0">不是</Option>
                          <Option value="1">是</Option>
                        </Select>)
                    }
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...formItemLayout} label="义务消防队队数">
                    {
                      getFieldDecorator('ywxfdds', {
                        rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '请输入数字' }],
                      })(<Input />)
                    }
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...formItemLayout} label="专职消防队队数">
                    {
                      getFieldDecorator('zzxfdds', {
                        rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '请输入数字' }],
                      })(<Input placeholder="" />)
                    }
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...formItemLayout} label="义务消防队消防人数	">
                    {
                      getFieldDecorator('ywxfdxfrs', {
                        rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '请输入数字' }],
                      })(<Input placeholder="" />)
                    }
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...formItemLayout} label="专职消防队消防人数	">
                    {
                      getFieldDecorator('zzxfdxfrs', {
                        rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '请输入数字' }],
                      })(<Input placeholder="" />)
                    }
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...formItemLayout} label="义务消防队消防车数	">
                    {
                      getFieldDecorator('ywxfdxfcs', {
                        rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '请输入数字' }],
                      })(<Input placeholder="" />)
                    }
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...formItemLayout} label="专职消防队消防车数	">
                    {
                      getFieldDecorator('zzxfdxfcs', {
                        rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '请输入数字' }],
                      })(<Input placeholder="" />)
                    }
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...formItemLayout} label="义务消防队消防泵数">
                    {
                      getFieldDecorator('ywxfdxfbs', {
                        rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '请输入数字' }],
                      })(<Input placeholder="" />)
                    }
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...formItemLayout} label="专职消防队消防泵数	">
                    {
                      getFieldDecorator('zzxfdxfbs', {
                        rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '请输入数字' }],
                      })(<Input placeholder="" />)
                    }
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...formItemLayout} label="消防栓数	">
                    {
                      getFieldDecorator('xfss', {
                        rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '请输入数字' }],
                      })(<Input placeholder="" />)
                    }
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...formItemLayout} label="消防井数	">
                    {
                      getFieldDecorator('xfjs', {
                        rules: [{ pattern: regExpConfig.isNumAndThanZero, message: '请输入数字' }],
                      })(<Input placeholder=" " />)
                    }
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem {...formItemLayout} label="消防联络员	">
                    {
                      getFieldDecorator('xflly', {})(<Input placeholder="" />)
                    }
                  </FormItem>
                </Col>
              </Row>
            </Form>

          </div>
          <div className="ability-button">
            <Button onClick={this.handleSubmit}>保存修改内容</Button>
          </div>
        </div>
      </Spin>
    )
  }
}

