/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Select, Checkbox } from 'antd';

const Option = Select.Option
const CheckboxGroup = Checkbox.Group;

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    otherDeliveryResult: state.otherDeliveryResult,
  })
)

@Form.create({
  onFieldsChange(props, items) {
    props.cacheOther(items);
  },
})

export default class other extends Component {
  constructor(props) {
    super(props)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    const otherValue = this.props.defaVal;
    otherValue.sspp = otherValue.sspp ? otherValue.sspp.split(';') : [];
    this.props.form.setFieldsValue(otherValue)
  }

  // 组件接收新的东西
  componentWillReceiveProps(nextProps) {
    if(this.props.defaVal.dptId!==nextProps.defaVal.dptId){
      const otherValue = nextProps.defaVal;
      otherValue.sspp = otherValue.sspp ? otherValue.sspp.split(';') : [];
      this.props.form.setFieldsValue(otherValue)
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const plainOptions = [
      { label: '邮政EMS', value: '1' },
      { label: '邮政快递包裹', value: '2' },
      { label: '宅急送', value: '3' },
      { label: '天天快递', value: '4' },
      { label: '韵达快递', value: '5' },
      { label: '百世汇通', value: '6' },
      { label: '中通速递', value: '7' },
      { label: '圆通速递', value: '8' },
      { label: '申通速递', value: '9' },
      { label: '国通速递', value: '10' },
      { label: '顺风速运', value: '11' },
      { label: 'DHL', value: '12' },
      { label: '德邦', value: '13' },
      { label: 'FedEX(联邦快递)', value: '14' },
      { label: '京东快递', value: '15' },
      { label: '日日顺', value: '16' },
      { label: '速尔快递', value: '17' },
      { label: 'UPS', value: '18' },
      { label: '亚马逊', value: '19' },
      { label: '优速快递', value: '20' },
      { label: '快捷快递', value: '21' },
      { label: '其他', value: '22' },
    ]
    return (
      <table>
        <thead>
          <tr>
            <th colSpan="4">其他</th>
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
            <td>监控探头数量</td>
            <td>
              {getFieldDecorator('ttsl')(<Input disabled />)}
            </td>
          </tr>
          <tr>
            <td>证照情况</td>
            <td>
              {getFieldDecorator('zzqk')(
                <Select size="large">
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
            <td>所属品牌</td>
            <td colSpan="3">
              {getFieldDecorator('sspp')(
                <CheckboxGroup options={plainOptions} />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}
