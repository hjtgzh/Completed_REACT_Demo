/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { Form, Input, Select } from 'antd';

const Option = Select.Option

@Form.create({
  onFieldsChange(props, items) {
    props.cacheBusinessNode(items);
  },
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
          <tr>
            <th colSpan="4">营业网点</th>
          </tr>
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
            <td>经营负责人</td>
            <td>
              {getFieldDecorator('jyfzr')(<Input />)}
            </td>
            <td>负责人联系方式</td>
            <td>
              {getFieldDecorator('lxdh')(<Input />)}
            </td>
          </tr>
          <tr>
            <td>有无安检设备</td>
            <td>
              {getFieldDecorator('ajsb')(
                <Select size="large">
                  <Option value="1">有</Option>
                  <Option value="0">无</Option>
                </Select>
              )}
            </td>
            <td>所属品牌</td>
            <td>
              {getFieldDecorator('sspp')(
                <Select
                  size="large"
                  onChange={this.handleSelectChange}
                >
                  <Option value="1">邮政EMS</Option>
                  <Option value="2">邮政快递包裹</Option>
                  <Option value="3">宅急送</Option>
                  <Option value="4">天天快递</Option>
                  <Option value="5">韵达快递</Option>
                  <Option value="6">百世汇通</Option>
                  <Option value="7">中通速递</Option>
                  <Option value="8">圆通速递</Option>
                  <Option value="9">申通速递</Option>
                  <Option value="10">国通速递</Option>
                  <Option value="11">顺风速运</Option>
                  <Option value="12">DHL</Option>
                  <Option value="13">德邦</Option>
                  <Option value="14">FedEX(联邦快递)</Option>
                  <Option value="15">京东快递</Option>
                  <Option value="16">日日顺</Option>
                  <Option value="17">速尔快递</Option>
                  <Option value="18">UPS</Option>
                  <Option value="19">亚马逊</Option>
                  <Option value="20">优速快递</Option>
                  <Option value="21">快捷快递</Option>
                  <Option value="22">其他</Option>
                </Select>
              )}
            </td>
          </tr>
          <tr>
            <td>证照情况</td>
            <td>
              {getFieldDecorator('zzqk')(
                <Select
                  size="large"
                  onChange={this.handleSelectChange}
                >
                  <Option value="1">法人网点</Option>
                  <Option value="2">备案网点</Option>
                  <Option value="3">登记网点</Option>
                  <Option value="4">无证网点</Option>
                </Select>
              )}
            </td>
            <td>证照编号</td>
            <td>
              {getFieldDecorator('zzbh')(<Input />)}
            </td>
          </tr>
          <tr>
            <td>监控探头数量</td>
            <td colSpan="3">
              {getFieldDecorator('ttsl')(<Input disabled />)}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}
