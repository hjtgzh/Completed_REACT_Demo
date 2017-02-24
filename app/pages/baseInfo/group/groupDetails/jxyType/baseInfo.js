/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { Form, Input } from 'antd';

@Form.create({
})

export default class roleSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.form.setFieldsValue(this.props.defaVal)
  }

  // 组件接收新的东西
  componentWillReceiveProps(nextProps) {
    if(this.props.defaVal.dptId!==nextProps.defaVal.dptId){
      this.props.form.setFieldsValue(nextProps.defaVal)
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <table>
        <thead>
          <tr><th colSpan="4">{this.props.title}</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>单位名称</td>
            <td>
              {getFieldDecorator('dwmc')(<Input disabled />)}
            </td>
            <td>单位地址</td>
            <td>
              {getFieldDecorator('dwdz')(<Input disabled />)}
            </td>
          </tr>
          <tr>
            <td>单位法人</td>
            <td>
              {getFieldDecorator('jyfzr')(<Input disabled />)}
            </td>
            <td>法人联系方式</td>
            <td>
              {getFieldDecorator('lxdh')(<Input disabled />)}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}
