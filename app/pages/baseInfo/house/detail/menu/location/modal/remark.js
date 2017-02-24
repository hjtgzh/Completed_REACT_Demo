/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { Input, Modal } from 'antd'

export default class remark extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.setText = this.setText.bind(this)
    this.search = this.search.bind(this)
  }

  // 改变输入框值
  setText(e) {
    this.setState({ value: e.target.value })
  }

  // 确定按钮
  search() {
    this.props.search(this.state.value)
  }

  render() {
    return (
      <Modal
        className="modal-header"
        title={this.props.title}
        visible
        confirmLoading={this.props.loading}
        onCancel={this.props.onCancel}
        onOk={this.search}>
        
        <Input
          placeholder="请输入备注"
          maxLength="20"
          value={this.state.value}
          onChange={this.setText}
        />
      </Modal>
    )
  }
}
