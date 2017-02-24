/**
 * Created by 余金彪 on 2016/11/21.
 *  editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, message, Form, Input } from 'antd'
import {
  fetchQtryByBaseId,
  fetchQtryUpdate,
} from 'actions/people'

const FormItem = Form.Item
@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,
    amList: state.amList,
  })
)
export default class Other extends Component {
  constructor(props) {
    super(props)
    this.handlSubmit = this.handlSubmit.bind(this)
  }

  componentDidMount() {
    // debugger
    this.props.dispatch(fetchQtryByBaseId({ baseId: this.props.baseid }, (result) => {
      this.props.form.setFieldsValue(result.data)
    }))
  }

  //保存其他人员
  handlSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        baseId: this.props.baseid,
      };
      this.props.dispatch(fetchQtryUpdate({ ...values }, (result) => {
        message.success(result.msg)
        this.props.dispatch(fetchQtryByBaseId({ baseId: this.props.baseid }, (response) => {
          message.success(response.msg)
        }))
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
      // 其他人员
      <div className="detail-content">
        <div className="main" style={{ height: '205px' }}>
          <Form>
            <Row gutter={16}>
              <Col span="12">
                <FormItem {...formItemLayout} label="职业">
                  {
                    getFieldDecorator('zy', {})(
                      <Input placeholder="" />
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="户籍地址">
                  {
                    getFieldDecorator('hjdz', {})(
                      <Input placeholder="" />
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="现住地址">
                  {
                    getFieldDecorator('xzdz', {})(
                      <Input placeholder="" />
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="身份类型">
                  {
                    getFieldDecorator('sflx', {})(
                      <Input placeholder="派出所根据实际工作需要自行添加" />
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="关注事由">
                  {
                    getFieldDecorator('gzsy', {})(
                      <Input placeholder="" />
                    )
                  }
                </FormItem>
              </Col>


            </Row>
          </Form>
        </div>
        <div className="ability-button">
          <Button type="button" onClick={this.handlSubmit}>保存</Button>
        </div>
      </div>
    )
  }
}
