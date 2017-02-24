/**
 * Created by 余金彪 on 2016/12/12.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Form, Input, message } from 'antd'
import {
  fetchGetDxqzxhdry,
  fetchSaveDxqzxhdry,
} from 'actions/people'

const FormItem = Form.Item


@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,
    amList: state.amList,
  })
)
export default class Masses extends Component {
  constructor(props) {
    super(props)
    this.handSubmit = this.handSubmit.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchGetDxqzxhdry({ baseid: this.props.baseid }, (result) => {
      this.props.form.setFieldsValue(result.data)
    }))
  }

  //保存大型群众活动人员
  handSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = {
        ...fieldsValue,
        baseid: this.props.baseid,
      };
      this.props.dispatch(fetchSaveDxqzxhdry({ ...values }, (result) => {
        message.success(result.msg)
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
      // 大型群众性活动人员
      <div className="detail-content">
        <div className="main" style={{ height: '205px' }}>
          <Form>
            <Row gutter={16}>
              <Col span="12">
                <FormItem {...formItemLayout} label="人员类别">
                  {
                    getFieldDecorator('rylb', {})(
                      <Input placeholder="" />
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="网名">
                  {
                    getFieldDecorator('wm', {})(
                      <Input placeholder="" />
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="前科劣迹情况">
                  {
                    getFieldDecorator('qkljqk', {})(
                      <Input placeholder="" />
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="情况描述">
                  {
                    getFieldDecorator('qkms', {})(
                      <Input placeholder="" />
                    )
                  }
                </FormItem>
              </Col>

            </Row>
          </Form>
        </div>
        <div className="ability-button">
          <Button type="button" onClick={this.handSubmit}>保存</Button>
        </div>
      </div>
    )
  }
}
