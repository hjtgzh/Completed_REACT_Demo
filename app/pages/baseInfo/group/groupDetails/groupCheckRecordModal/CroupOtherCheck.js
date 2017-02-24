/**
 * Created by 余金彪 on 2017/1/5.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Form, message, Checkbox } from 'antd'
import { fetchSaveDepartmentJdyRecord } from 'actions/groupCheckRecord'
@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,
  })
)
export default class CroupOtherCheck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      loading: false,
      defaultState:"否"
    }
    this.ids=[]
    this.backCheck = this.backCheck.bind(this)
    this.saveJdyCheackRecord = this.saveJdyCheackRecord.bind(this)
    this.changeState = this.changeState.bind(this)
  }

  componentDidMount() {
    const detailJdyValue = this.props.detailJdyValue
    this.props.form.setFieldsValue(detailJdyValue)
    const myDate = new Date();
    const time = myDate.toLocaleDateString().replace(/\//g, '-');
    this.props.form.setFieldsValue({ jcsj: time })
    for (const i in this.props.detailJdyValue) {
      if (this.props.detailJdyValue[i] == 'true') {
        this.props.detailJdyValue[i] = true
      }
    }
  }

  //返回列表
  backCheck() {
    this.props.backCheck()
  }

  //保存检查记录
  saveJdyCheackRecord(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return
      }
      this.props.dispatch(fetchSaveDepartmentJdyRecord({
        ...values,
        dptId: this.props.dptId,
        id: this.props.jdyRecordId,
      }, (result) => {
        message.success(result.msg)
      }))
    });
  }
  changeState(e) {
    if(e.target.checked){
      this.ids.push(e.target.id)
    }else{
      let index = this.ids.indexOf(e.target.id)
      this.ids.splice(index,index+1)
    }
    if(this.ids.length>0){
      this.setState({
        defaultState:"是"
      })
    }else{
      this.setState({
        defaultState:"否"
      })
    }
  }
  render() {
    const defultValue = this.props.detailJdyValue
    const { getFieldDecorator } = this.props.form
    return (
      <div className="nav-second-nextContent">
        <div className="detail-content">
          <div className="groupContent ">
            <div className="groupBaseInfo">
              <Form>
                <table className="baseinfo">
                  <thead>
                  <tr>
                    <th colSpan="10">寄递企业/站点检查日常记录表</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td colSpan="1" className="groupLabel">被检查单位名称</td>
                    <td colSpan="4">
                      {/* {getFieldDecorator('bjcdwmc')(<Input disabled={true}/>)}*/}
                      <Input value={sessionStorage.getItem('dwmc')} disabled />
                    </td>
                    <td colSpan="1" className="groupLabel"> 单位地址</td>
                    <td colSpan="4">
                      {/* {getFieldDecorator('dwdz')(<Input disabled={true}/>)}*/}
                      <Input value={sessionStorage.getItem('sjdz')} disabled />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="1">所属品牌</td>
                    <td colSpan="4">
                      <Input disabled />
                      {/* {
                       getFieldDecorator('sspp', {})(
                       <Select placeholder="" disabled >
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
                       )
                       }*/}
                    </td>
                    <td colSpan="1">检查时间</td>
                    <td colSpan="4">
                      {getFieldDecorator('jcsj')(<Input disabled />)}
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="1" rowSpan="24">检查情况</th>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      1、制度未上墙公示。包括：禁限寄物品指导目录及处理办法、收寄验视制度、实名登记告知、服务承诺、经营时间、资费标准、损失赔偿及投诉处理办法、收寄验视警示牌
                      {getFieldDecorator('zdwsq', {
                        valuePropName: 'checked',
                        initialValue: defultValue.zdwsq,
                      })(<Checkbox />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      {getFieldDecorator('zdwsqsm')(<Input style={{ border: 'none' }} placeholder="具体情况说明" type="textarea"
                                                           autosize
                      />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      2、监控设备安装、运转及记录保存未达到规定要求(无盲区，24小时开机保存30天)。
                      {getFieldDecorator('jkwaz', {
                        valuePropName: 'checked',
                        initialValue: defultValue.jkwaz,
                      })(<Checkbox />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      {getFieldDecorator('jkwazsm')(<Input style={{ border: 'none' }} placeholder="具体情况说明" type="textarea"
                                                           autosize
                      />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      3、未对从业人员进行安全生产教育和培训。
                      {getFieldDecorator('rywpx', {
                        valuePropName: 'checked',
                        initialValue: defultValue.rywpx,
                      })(<Checkbox />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      {getFieldDecorator('wpxryxx')(
                        <Input
                          style={{ border: 'none' }}
                          placeholder="未培训人员信息"
                          type="textarea"
                          autosize
                        />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      4、未建立从业人员档案（花名册）未建档人员。
                      {getFieldDecorator('cyrywjd', {
                        valuePropName: 'checked',
                        initialValue: defultValue.cyrywjd,
                      })(<Checkbox />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      {getFieldDecorator('wjdry')(<Input style={{ border: 'none' }} placeholder="未建档人员信息" type="textarea"
                                                         autosize
                      />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      5、未按规定配备消防设备或设备损坏的
                      {getFieldDecorator('xfsb', {
                        valuePropName: 'checked',
                        initialValue: defultValue.xfsb,
                      })(<Checkbox />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      6、无证照或备案或登记.有
                      编号{getFieldDecorator('zzbadjbh')(<Input
                      style={{ width: '50%', border: '1px solid' }}
                    />)}
                      无

                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      7、未落实100%过机安检

                      {getFieldDecorator('ajsb', {
                        valuePropName: 'checked',
                        initialValue: defultValue.ajsb,
                      })(<Checkbox onChange={this.changeState} />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      8、违反规定收寄禁寄物品。
                      {getFieldDecorator('jjwp', {
                        valuePropName: 'checked',
                        initialValue: defultValue.jjwp,
                      })(<Checkbox onChange={this.changeState} />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      快递单号&nbsp;&nbsp;&nbsp;&nbsp;
                      {getFieldDecorator('jjwpkddh')(<Input style={{ width: '35%' }} />)}
                      物品种类&nbsp;&nbsp;&nbsp;&nbsp;
                      {getFieldDecorator('jjwpzl')(<Input style={{ width: '35%' }} />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      寄件人信息&nbsp;&nbsp;&nbsp;&nbsp;
                      {getFieldDecorator('jjwpjjr')(<Input style={{ width: '35%' }} />)}
                      收件人信息&nbsp;&nbsp;&nbsp;&nbsp;
                      {getFieldDecorator('jjwpsjr')(<Input style={{ width: '35%' }} />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      9、未对收寄物品进行有效验视、未严格执行收寄验视制度。
                      {getFieldDecorator('wsj', {
                        valuePropName: 'checked',
                        initialValue: defultValue.wsj,
                      })(<Checkbox onChange={this.changeState} />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      检查中发现的未进行开包验视的快递单号
                      {getFieldDecorator('wsjdh')(<Input style={{ width: '50%', border: '1px solid' }} />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      {getFieldDecorator('wsjafjcqk')(<Input style={{ border: 'none' }} placeholder="暗访检查情况" type="textarea"
                                                             autosize
                      />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      10、未对寄件人身份信息进行实名登记。
                      {getFieldDecorator('wsmdj', {
                        valuePropName: 'checked',
                        initialValue: defultValue.wsj,
                      })(<Checkbox onChange={this.changeState} />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      检查中发现的未进行实名登记的快递单号
                      {getFieldDecorator('wsmdjdh')(<Input style={{ width: '50%', border: '1px solid' }} />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      {getFieldDecorator('wsmafjcqk')(<Input style={{ border: 'none' }} placeholder="暗访检查情况" type="textarea"
                                                             autosize
                      />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      11、未按规定完整填写快递单（寄、收件人姓名、电话、地址、物品种类名称等）。
                      {getFieldDecorator('wagdwztx', {
                        valuePropName: 'checked',
                        initialValue: defultValue.wagdwztx,
                      })(<Checkbox />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      快递单号
                      {getFieldDecorator('wagdwztxdh')(<Input style={{ width: '40%' }} />)}
                      物品种类
                      {getFieldDecorator('wagdwztxzl')(<Input style={{ width: '40%' }} />)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ border: 'none' }}>
                      是否需要整改
                    </td>
                    <td colSpan="7">
                      {getFieldDecorator('sfxyzg',{initialValue:this.state.defaultState})(
                        <Input
                          style={{ border: 'none' }}
                          disabled
                      />)}
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="1" rowSpan="2">核查意见</th>
                  </tr>
                  <tr>
                    <td colSpan="9">
                      {getFieldDecorator('zgyj')(
                        <Input
                          style={{ border: 'none' }}
                          type="textarea"
                          autosize
                      />)}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </Form>
            </div>
          </div>
        </div>
        <div className="ability-button">
          <Button onClick={this.backCheck}>返回列表</Button>
          <Button onClick={this.saveJdyCheackRecord}>保存</Button>
        </div>
      </div>
    )
  }
}