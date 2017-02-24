/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react';
import { Form, Modal } from 'antd';
import StateBtn from '.././component/stateButton'

export default class formLabel extends Component {
  constructor(props) {
    super(props)
    this.getClass = this.getClass.bind(this)
  }

  // 确定操作
  getClass() {
    const showArr = [];   // 存放已选按钮
    for (const value in this.props.btnArr) {
      const obj = this.props.btnArr[value]
      if (obj.show) {
        showArr.push({ value: value, text: obj.text })
      }
    }
    showArr.length === 0 ? this.info() : this.props.setLabel(showArr)
  }

  info() {
    Modal.info({
      title: '请选择标签类型',
      content: (
        <div>
          <p>至少选择一种标签</p>
        </div>
      ),
      onOk() {},
    })
  }
  render() {
    return (
      <Modal
        className="modal-header"
        visible={this.props.visible}
        title="标签选项"
        onCancel={this.props.onCancel}
        onOk={this.getClass}
        confirmLoading={this.props.confirmLoading}
      >
        <Form horizontal onSubmit={this.handleSubmit} className="formLabel">
          <StateBtn name="1" btn={this.props.btnArr['1']} setBtnArr={this.props.setBtnArr}>志愿者</StateBtn>
          <StateBtn name="2" btn={this.props.btnArr['2']} setBtnArr={this.props.setBtnArr}>群防群治</StateBtn>
          <StateBtn name="3" btn={this.props.btnArr['3']} setBtnArr={this.props.setBtnArr}>治安信息员</StateBtn>
          <StateBtn name="4" btn={this.props.btnArr['4']} setBtnArr={this.props.setBtnArr}>社区(村)干部</StateBtn>
          <StateBtn name="5" btn={this.props.btnArr['5']} setBtnArr={this.props.setBtnArr}>社会知名人士</StateBtn>
        </Form>
      </Modal>
    )
  }
}

