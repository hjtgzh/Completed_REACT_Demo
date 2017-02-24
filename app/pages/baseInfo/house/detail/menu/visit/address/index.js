/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message, Form, Input, Icon, Select, Row, Popconfirm, Col } from 'antd'
import { regExpConfig } from 'utils/config'
import {
  fetchaddressInfo, // 获取地址信息
  fetchsaveScore, // 设定分值
  fetchaddOwner, // 添加产权人
  fetchaddQrcode, // 添加二维码
  fetchdeletedOwner, // 删除产权人
  fetchdeletdQrcode, // 删除二维码
  fetchaddHouldNum, // 新增户号
  fetchdeletdHouldNum, // 删除户号
  fetchaddHouseFile, // 新增档案号
  fetchdeletdHouseFile, // 删除档案号
  fetchsaveRoomSelect, // 保存房屋性质
} from 'actions/houseVisitAddress'
import DimenCode from './modal/qrcode'
import Archives from './modal/addHouseFile'
import HouseNumber from './modal/houseHouldNum'
import Owner from './modal/owner'
import './style.css'

const Option = Select.Option
const FormItem = Form.Item

@Form.create({
  onFieldsChange(props, items) {

  },
})

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    addressInfoResult: state.addressInfoResult,
  })
)

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 弹窗显示
      dimenCodeVisible: false,
      archivesVisible: false,
      houseNumberVisible: false,
      ownerVisible: false,
      // 是否添加状态
      isAddOwner: true,
      isAddDimenCode: true,
      isAddHouseNumber: true,
      isAddArchives: true,
      values: {},
      userId: sessionStorage.getItem('userid'),
      dzslName:{0:"标准地址",1:"非标准地址",3:"虚拟地址",5:"历史地址"}
    }
    this.addIconHandle = this.addIconHandle.bind(this)
    this.delIconHandle = this.delIconHandle.bind(this)
    this.hiddenModal = this.hiddenModal.bind(this)
    this.handleOwnerOk = this.handleOwnerOk.bind(this)
    this.handleDimencodeOk = this.handleDimencodeOk.bind(this)
    this.handleArchivesOk = this.handleArchivesOk.bind(this)
    this.handleHouseNumberOk = this.handleHouseNumberOk.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.saveScore = this.saveScore.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchaddressInfo({ id: this.props.roomId }, (reply) => {
      const result = reply.data;
      if (result.buildingCqr) {
        result.cqrxm = result.buildingCqr.xm;
        result.cqrdhhm = result.buildingCqr.dhhm;
        result.cqrsfzh = result.buildingCqr.sfzh;
        this.setState({
          isAddOwner: false,
        })
      }
      // 二维码
      if (result.ewmbh) {
        result.code = result.ewmbh
        this.setState({
          isAddDimenCode: false,
        })
      }
      // 户号
      if (result.hh) {
        this.setState({
          isAddHouseNumber: false,
        })
      }
      // 档案号
      if (result.dah) {
        this.setState({
          isAddArchives: false,
        })
      }
      //地址属性
      if(result.dzlx){
        result.dzlx=this.state.dzslName[result.dzlx]
      }
      result.fjzt = result.fjzt.toString();
      this.props.form.setFieldsValue(result)
    }))
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.roomId!==this.props.roomId){
      this.props.dispatch(fetchaddressInfo({ id: nextProps.roomId }, (reply) => {
        const result = reply.data;
        if (result.buildingCqr) {
          result.cqrxm = result.buildingCqr.xm;
          result.cqrdhhm = result.buildingCqr.dhhm;
          result.cqrsfzh = result.buildingCqr.sfzh;
          this.setState({
            isAddOwner: false,
          })
        }
        // 二维码
        if (result.ewmbh) {
          result.code = result.ewmbh
          this.setState({
            isAddDimenCode: false,
          })
        }
        // 户号
        if (result.hh) {
          this.setState({
            isAddHouseNumber: false,
          })
        }
        // 档案号
        if (result.dah) {
          this.setState({
            isAddArchives: false,
          })
        }
        //地址属性
        if(result.dzlx){
          result.dzlx=this.state.dzslName[result.dzlx]
        }
        result.fjzt = result.fjzt.toString();
        this.props.form.setFieldsValue(result)
      }))
    }
  }

  // 添加标签事件
  addIconHandle(name) {
    switch (name) {
    case 'owner' :
      this.setState({
        ownerVisible: true,
      })
      break;
    case 'dimenCode' :
      this.setState({
        dimenCodeVisible: true,
      })
      break;
    case 'archives' :
      this.setState({
        archivesVisible: true,
      })
      break;
    case 'houseNumber' :
      this.setState({
        houseNumberVisible: true,
      })
      break;
    default:
      break;
    }
  }

  // 删除标签事件
  delIconHandle(name) {
    switch (name) {
    case 'owner' :
      this.props.dispatch(fetchdeletedOwner({ bldid: this.props.houseId, fjid: this.props.roomId }, () => {
        message.success('删除成功')
        this.props.form.setFieldsValue({
          cqrxm: '',
          cqrsfzh: '',
          cqrdhhm: '',
        })
        this.setState({
          isAddOwner: true,
        })
      }))
      break;
    case 'dimenCode' :
      this.props.dispatch(fetchdeletdQrcode({ fjid: this.props.roomId, userid: this.state.userId }, () => {
        message.success('删除成功')
        this.props.form.setFieldsValue({ code: '' })
        this.setState({
          isAddDimenCode: true,
        })
      }))
      break;
    case 'archives' :
      this.props.dispatch(fetchdeletdHouseFile({ fjid: this.props.roomId }, () => {
        this.props.form.setFieldsValue({ dah: '', fddh: '', fdxm: '', fdsfzh: '' })
        this.setState({
          isAddArchives: true,
        })
      }))
      break;
    case 'houseNumber' :
      const hh = this.props.form.getFieldValue('hh')
      this.props.dispatch(fetchdeletdHouldNum({
        id: this.props.roomId,
        bldid: this.props.houseId,
        hh: hh,
        userid: this.state.userId,
      }, (result) => {
        message.success('删除成功')
        this.props.form.setFieldsValue({ hh: '', hzdh: '', hzxm: '', hzsfzh: '' })
        this.setState({
          isAddHouseNumber: true,
        })
      }))
      break;
    default:
      break;
    }
  }

  // 产权人添加确定事件
  handleOwnerOk(values) {
    this.props.dispatch(fetchaddOwner({
      ...values,
      bldid: this.props.houseId,
      fjid: this.props.roomId,
      userid: this.state.userId,
    }, (reply) => {
      message.success('添加成功')
      this.props.form.setFieldsValue({
        cqrxm: reply.data.xm,
        cqrsfzh: reply.data.sfzh,
        cqrdhhm: reply.data.dhhm,
      })
      this.setState({
        ownerVisible: false,
        isAddOwner: false,
      })
    }))
  }

  // 二维码添加确认事件
  handleDimencodeOk(values) {
    this.props.dispatch(fetchaddQrcode({ ...values, fjid: this.props.roomId, cjrid: '1' }, (reply) => {
      message.success(reply.msg)
      this.props.form.setFieldsValue({
        ...values,
      })
      this.setState({
        dimenCodeVisible: false,
        isAddDimenCode: false,
      })
    }))
  }

  // 出租房档案号添加确认事件
  handleArchivesOk(id) {
    this.props.dispatch(fetchaddHouseFile({
      fjid: this.props.roomId,
      dah: id,
      userid: this.state.userId,
    }, (reply) => {
      message.success('新增成功')
      this.props.form.setFieldsValue({
        dah: reply.data.dah,
        fdxm: reply.data.xm,
        fddh: reply.data.lxdh,
        fdsfzh: reply.data.sfzh,
      })
      this.setState({
        archivesVisible: false,
        isAddArchives: false,
      })
    }))
  }

  // 户号添加确认事件
  handleHouseNumberOk(values) {
    this.props.dispatch(fetchaddHouldNum({
      bldid: this.props.houseId,
      id: this.props.roomId,
      hh: values.hh,
      userid: this.state.userId,
    }, (reply) => {
      message.success('新增成功')
      this.props.form.setFieldsValue({
        hh: reply.data.hh,
        hzxm: reply.data.hzxm,
        hzdh: reply.data.dhhm,
        hzsfzh: reply.data.sfzh,
      })
      this.setState({
        houseNumberVisible: false,
        isAddHouseNumber: false,
      })
    }))
  }

  // 房屋性质改变事件
  handleSelectChange(value) {
    this.props.dispatch(fetchsaveRoomSelect({
      userid: this.state.userId,
      id: this.props.roomId,
      fjzt: value,
    }, () => {
      message.success('修改房屋性质成功！')
    }))
  }

  // 保存分值事件
  saveScore() {
    this.props.form.validateFields(['zdgrade', 'jwgrade', 'zkgrade'], (errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      this.props.dispatch(fetchsaveScore({
        zkgrade: values.zkgrade,
        jwgrade: values.jwgrade,
        zdgrade: values.zdgrade,
        userid: this.state.userId,
      }, (reply) => {
        message.success(reply.msg)
      }))
    });
  }

  // 弹窗取消
  hiddenModal(name) {
    switch (name) {
    case 'owner' :
      this.setState({
        ownerVisible: false,
      })
      break;
    case 'dimenCode' :
      this.setState({
        dimenCodeVisible: false,
      })
      break;
    case 'archives' :
      this.setState({
        archivesVisible: false,
      })
      break;
    case 'houseNumber' :
      this.setState({
        houseNumberVisible: false,
      })
      break;
    default:
      break;
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 19 },
    }
    return (
      <div style={{ height: global.$GLOBALCONFIG.PAGEHEIGHT - 80, overflowY: 'auto', overflowX: 'hidden' }}>
        <p className="address_detail_ytt">{this.props.fullName}</p>
        <Form horizontal>
          <FormItem {...formItemLayout} label="房屋地址">
            {getFieldDecorator('dzmc')(
              <Input disabled />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="房屋类型">
            {getFieldDecorator('fwlx')(
              <Input disabled />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="户室地址">
            {getFieldDecorator('hsdz')(
              <Input disabled />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="地址全称">
            {getFieldDecorator('dzqc')(
              <Input disabled />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="地址属性">
            {getFieldDecorator('dzlx')(
              <Input disabled />
            )}
          </FormItem>
          <Row>
            <Col span="8">
              <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 13 }} label="产权人">
                {getFieldDecorator('cqrxm')(
                  <Input
                    disabled={!this.state.isAddOwner ? true : false}
                    readOnly
                  />
                )}
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem wrapperCol={{ span: 22 }}>
                {getFieldDecorator('cqrdhhm')(
                  <Input
                    addonBefore="电话:"
                    disabled={!this.state.isAddOwner ? true : false}
                    readOnly
                  />
                )}
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem wrapperCol={{ span: 24 }}>
                {getFieldDecorator('cqrsfzh')(
                  <Input
                    addonBefore="身份证:"
                    disabled={!this.state.isAddOwner ? true : false}
                    readOnly
                  />
                )}
              </FormItem>
              {
                this.state.isAddOwner ?
                  <Icon className="address-icon-style" type="plus-circle"
                    onClick={()=>this.addIconHandle('owner')}
                  />
                : <Popconfirm title="是否删除" placement="left" onConfirm={()=>this.delIconHandle('owner')}>
                  <Icon className="address-icon-style" type="minus-circle" />
                </Popconfirm>
              }
              {
                this.state.ownerVisible ?
                  <Owner handleOk={this.handleOwnerOk}
                    visible={this.state.ownerVisible}
                    onCancel={()=>this.hiddenModal('owner')}
                  />
                : null
              }
            </Col>
          </Row>
          <FormItem {...formItemLayout} label="地址编号">
            {getFieldDecorator('barcodeinfo')(
              <Input disabled />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="房屋二维码">
            {getFieldDecorator('code')(
              <Input
                disabled={!this.state.isAddDimenCode ? true : false}
                readOnly
              />
            )}
            {
              this.state.isAddDimenCode ?
                <Icon className="address-icon-style" type="plus-circle"
                  onClick={()=>this.addIconHandle('dimenCode')}
                />
              : <Popconfirm title="是否删除" placement="left" onConfirm={()=>this.delIconHandle('dimenCode')}>
                <Icon className="address-icon-style" type="minus-circle" />
              </Popconfirm>
            }
            {
              this.state.dimenCodeVisible ?
                <DimenCode
                  handleOk={this.handleDimencodeOk}
                  visible={this.state.dimenCodeVisible}
                  onCancel={()=>this.hiddenModal('dimenCode')}
                />
              : null
            }
          </FormItem>
          <Row>
            <Col span="6">
              <FormItem labelCol={{ span: 12 }} wrapperCol={{ span: 11 }} label="出租房档案号">
                {getFieldDecorator('dah')(
                  <Input
                    disabled={!this.state.isAddArchives ? true : false}
                    readOnly
                  />
                )}
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem wrapperCol={{ span: 23 }}>
                {getFieldDecorator('fdxm')(
                  <Input
                    addonBefore="房东姓名:"
                    disabled={!this.state.isAddArchives ? true : false}
                    readOnly
                  />
                )}
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem wrapperCol={{ span: 23 }}>
                {getFieldDecorator('fddh')(
                  <Input
                    addonBefore="电话号码:"
                    disabled={!this.state.isAddArchives ? true : false}
                    readOnly
                  />
                )}
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem wrapperCol={{ span: 24 }}>
                {getFieldDecorator('fdsfzh')(
                  <Input
                    addonBefore="房东身份证:"
                    disabled={!this.state.isAddArchives ? true : false}
                    readOnly
                  />
                )}
              </FormItem>
              {
                this.state.isAddArchives ?
                  <Icon className="address-icon-style" type="plus-circle"
                    onClick={()=>this.addIconHandle('archives')}
                  />
                : <Popconfirm title="是否删除" placement="left" onConfirm={()=>this.delIconHandle('archives')}>
                  <Icon className="address-icon-style" type="minus-circle" />
                </Popconfirm>
              }
              {
                this.state.archivesVisible ?
                  <Archives
                    handleOk={this.handleArchivesOk}
                    visible={this.state.archivesVisible}
                    onCancel={()=>this.hiddenModal('archives')}
                  />
                : null
              }
            </Col>
          </Row>
          <Row>
            <Col span="6">
              <FormItem labelCol={{ span: 12 }} wrapperCol={{ span: 11 }} label="户号">
                {getFieldDecorator('hh')(
                  <Input
                    disabled={!this.state.isAddHouseNumber ? true : false}
                    readOnly
                  />
                )}
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem wrapperCol={{ span: 23 }}>
                {getFieldDecorator('hzxm')(
                  <Input
                    addonBefore="户主姓名:"
                    disabled={!this.state.isAddHouseNumber ? true : false}
                    readOnly
                  />
                )}
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem wrapperCol={{ span: 23 }}>
                {getFieldDecorator('hzdh')(
                  <Input
                    addonBefore="户主号码:"
                    disabled={!this.state.isAddHouseNumber ? true : false}
                    readOnly
                  />
                )}
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem wrapperCol={{ span: 24 }}>
                {getFieldDecorator('hzsfzh')(
                  <Input
                    addonBefore="户主身份证:"
                    disabled={!this.state.isAddHouseNumber ? true : false}
                    readOnly
                  />
                )}
              </FormItem>
              {
                this.state.isAddHouseNumber ?
                  <Icon className="address-icon-style" type="plus-circle"
                    onClick={()=>this.addIconHandle('houseNumber')}
                  />
                : <Popconfirm title="是否删除" placement="left"
                  onConfirm={()=>this.delIconHandle('houseNumber')}
                >
                  <Icon className="address-icon-style" type="minus-circle" />
                </Popconfirm>
              }
              {
                this.state.houseNumberVisible ?
                  <HouseNumber
                    handleOk={this.handleHouseNumberOk}
                    visible={this.state.houseNumberVisible}
                    onCancel={()=>this.hiddenModal('houseNumber')}
                  />
                : null
              }
            </Col>
          </Row>
          <FormItem {...formItemLayout} label="房屋性质">
            {getFieldDecorator('fjzt', {
              onChange: this.handleSelectChange,
            })(
              <Select placeholder="请选择房屋性质">
                <Option value="0">请选择</Option>
                <Option value="1">自住</Option>
                <Option value="2">出租</Option>
                <Option value="3">群租</Option>
                <Option value="4">空置</Option>
                <Option value="5">单位</Option>
                <Option value="6">落户待查</Option>
                <Option value="7">自住兼出租</Option>
                <Option value="8">宿舍</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="房屋分值">
            {getFieldDecorator('grade')(
              <Input disabled />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="走访周期">
            {getFieldDecorator('zfzq')(
              <Input disabled />
            )}
          </FormItem>
          <Row>
            <Col span="8">
              <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 11 }} label="分值设定">
                {getFieldDecorator('zkgrade', {
                  rules: [{ pattern: regExpConfig.num, message: '格式错误' }],
                })(
                  <Input addonBefore="暂住人员:" />
                )}
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem {...formItemLayout}>
                {getFieldDecorator('jwgrade', {
                  rules: [{ pattern: regExpConfig.num, message: '格式错误' }],
                })(
                  <Input addonBefore="境外人员:" />
                )}
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem {...formItemLayout}>
                {getFieldDecorator('zdgrade', {
                  rules: [{ pattern: regExpConfig.num, message: '格式错误' }],
                })(
                  <Input addonBefore="重点人员:" />
                )}
              </FormItem>
            </Col>
            <a className="saveScoreA" onClick={this.saveScore}>保存分值</a>
          </Row>
        </Form>
      </div>
    )
  }
}
