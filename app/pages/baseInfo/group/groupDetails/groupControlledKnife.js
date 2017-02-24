/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Checkbox, Button, message } from 'antd';
import { regExpConfig } from 'utils/config'
import {
  fetchGroupControlledKnife,
  fetchUpdateGroupControlledKnife,
} from 'actions/groupControlledKnife'

const CheckboxGroup = Checkbox.Group;

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    groupControlledKnifeResult: state.groupControlledKnifeResult,
  })
)

@Form.create({
  onFieldsChange(props, items) {
  },
})

export default class roleSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {},
      qylx: [],
    }

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.searchControlled()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.departmentId!=this.props.departmentId){
      this.searchControlled(nextProps.departmentId)
    }
  }

  searchControlled(id){
    this.props.dispatch(fetchGroupControlledKnife({ dptId: id||this.props.departmentId }, () => {
      this.setState({
        value: this.props.groupControlledKnifeResult,
        qylx: this.props.groupControlledKnifeResult.qylx ? this.props.groupControlledKnifeResult.qylx.split(';') : [],
      })
      this.props.form.setFieldsValue(this.props.groupControlledKnifeResult)
    }))
  }

  onChange(checkedValues) {
    this.setState({
      qylx: checkedValues,
    })
  }

  handleSubmit() {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        if (errors.lxdh) {
          message.error('联系电话格式不对')
        } else if (errors.cyrs) {
          message.error('从业人数格式不对')
        }
        console.log('Errors in form!!!');
        return;
      }
      this.props.dispatch(fetchUpdateGroupControlledKnife({
        ...values,
        dptId: this.props.departmentId,
        qylx: this.state.qylx.join(';'),
      }, () => {
        this.props.dispatch(fetchGroupControlledKnife({ dptId: this.props.departmnetId }, () => {
          const { groupControlledKnifeResult } = this.props;
          this.setState({
            value: groupControlledKnifeResult,
            qylx: groupControlledKnifeResult.qylx ? groupControlledKnifeResult.qylx.split(';') : [],
          })
          this.props.form.setFieldsValue(this.props.groupControlledKnifeResult)
        }))
      }))
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const plainOptions = [
      {
        label: '制造', value: '1',
      },
      {
        label: '销售', value: '2',
      },
    ]
    return (
      <div className="nav-second-nextContent ">
        <div className="detail-content group-jxy ">
          <Form>
            <table>
              <tbody>
                <tr>
                  <td>企业类型</td>
                  <td>
                    <CheckboxGroup
                      options={plainOptions}
                      value={this.state.qylx}
                      onChange={this.onChange}
                    />
                  </td>
                  <td>经营地(网)点</td>
                  <td>
                    {getFieldDecorator('jydd')(<Input />)}
                  </td>
                </tr>
                <tr>
                  <td>安全负责人</td>
                  <td>
                    {getFieldDecorator('aqfzr')(<Input />)}
                  </td>
                  <td>联系电话</td>
                  <td>
                    {getFieldDecorator('lxdh', {
                      rules: [
                        { pattern: regExpConfig.phoneNo },
                      ],
                    })(<Input />)}
                  </td>
                </tr>
                <tr>
                  <td>从业人数</td>
                  <td colSpan="3">
                    {getFieldDecorator('cyrs', {
                      rules: [
                        { pattern: regExpConfig.num },
                      ],
                    })(<Input />)}
                  </td>
                </tr>
                <tr>
                  <td>企业情况</td>
                  <td colSpan="3">
                    {getFieldDecorator('qyqk')(<Input type="textarea" autosize />)}
                  </td>
                </tr>
              </tbody>
            </table>
          </Form>
        </div>
        <div className="ability-button">
          <Button type="button" onClick={this.handleSubmit}>保存</Button>
        </div>
      </div>
    )
  }
}
