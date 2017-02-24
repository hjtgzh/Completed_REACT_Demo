/**
 * Created by 黄建停---实有房屋(新增地址)--button按钮
 */
import React from 'react'
import { Button } from 'antd'

const stateButton = React.createClass({
  getInitialState: function () {
    return {
      show: false,
    }
  },

  // 按钮点击后的回调
  change(value) {
    this.props.setBtnArr({
      value: this.props.name,
      grade: this.props.grade,
      show: !this.props.show,
    })
  },

  render() {
    return (
      <Button type={this.props.show ? 'primary' : 'ghost'} onClick={this.change}>{this.props.children}</Button>
    )
  },
})

export default stateButton;
