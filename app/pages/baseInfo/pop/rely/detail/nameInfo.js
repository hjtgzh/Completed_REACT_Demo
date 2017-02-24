/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { Row, Col, Form } from 'antd'

const FormItem = Form.Item

// 声明组件  并对外输出
export default class HandleRelyType extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'list',
    }
  }

  render() {
    const { relyBasicResult } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }
    return (
      <div className="basic-trf basic-lzr">
        <Form horizontal >
          <Row gutter={16} className="gutter-row">
            <Col span="12">
              <FormItem {...formItemLayout} label="姓名">
                <span>{relyBasicResult.xm}</span>
              </FormItem>
            </Col>
            <Col span="12" className="leftBorder">
              <FormItem {...formItemLayout} label="身份证号	">
                <span>{relyBasicResult.sfzh}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="民族	">
                <span>{relyBasicResult.mz}</span>
              </FormItem>
            </Col>
            <Col span="12" className="leftBorder">
              <FormItem {...formItemLayout} label="性别">
                <span>{relyBasicResult.xb === 1 ? '男' : '女'}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="国家 ">
                <span>{relyBasicResult.gj}</span>
              </FormItem>
            </Col>
            <Col span="12" className="leftBorder">
              <FormItem {...formItemLayout} label="是否重点国家	">
                <span>{relyBasicResult.iszdgj === 1 ? '是' : '否'}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="户口省县	">
                <span>{relyBasicResult.hksx}</span>
              </FormItem>
            </Col>
            <Col span="12" className="leftBorder">
              <FormItem {...formItemLayout} label="户口详址	">
                <span>{relyBasicResult.hkxz}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="重点人员	 ">
                <span>{relyBasicResult.zdry}</span>
              </FormItem>
            </Col>
            <Col span="12" className="leftBorder">
              <FormItem {...formItemLayout} label="前科劣迹	 ">
                <span>{relyBasicResult.qklj}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="是否在逃	 ">
                <span>{relyBasicResult.sfztry === 1 ? '是' : '否'}</span>
              </FormItem>
            </Col>
            <Col span="12" className="leftBorder">
              <FormItem {...formItemLayout} label="在逃查询时间	 ">
                <span>{relyBasicResult.ztcxsjLabel}</span>
              </FormItem>
            </Col>
            <Col span="12" className="lastRow">
              <FormItem {...formItemLayout} label="核录日期	 ">
                <span>{relyBasicResult.cjsjLabel}</span>
              </FormItem>
            </Col>
            <Col span="12" className="leftBorder">
              <FormItem {...formItemLayout} label="核录人">
                <span>{relyBasicResult.cjr}</span>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
