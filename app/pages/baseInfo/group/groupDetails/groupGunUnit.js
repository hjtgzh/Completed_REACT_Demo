/*
 *Create By 韩卿
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Button, Row, Col, Form, Select, Input, DatePicker, message, Spin } from 'antd'
import { saveGunUnitInfo, getGunUnitInfo, getCompanyType, getCompanyProp } from 'actions/gunUnit'

const Option = Select.Option
const FormItem = Form.Item

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}


// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    gunUnitTypeList: state.gunUnitTypeList,
    gunUnitPropList: state.gunUnitPropList,
  })
)
@Form.create({})

export default class groupGunUnit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      btnLoading: false,
      spinLoading: true,
      companyTypes: [],
      companyProps: [],
    }
    this.handleClick = this.handleClick.bind(this)
    // this.updateState = this.updateState.bind(this)
  }

  componentWillMount() {
   this.searchGunUnit()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.departmentId!==this.props.departmentId){
      this.searchGunUnit(nextProps.departmentId)
    }
  }

  searchGunUnit(id){
    // 获取单位类别
    if (this.props.gunUnitTypeList.length === 0) {
      this.props.dispatch(getCompanyType({}))
    }
    // 获取单位性质
    if (this.props.gunUnitPropList.length === 0) {
      this.props.dispatch(getCompanyProp({}))
    }
    // this.props.dispatch(getCompanyType({},(response)=>{
    //   if(response.status===1){
    //     this.state.companyTypes=response.data
    //     this.props.dispatch(getCompanyProp({},(reply)=>{
    //       if(reply.status===1){
    //         this.state.companyProps=reply.data
    //         this.props.dispatch
    // (getGunUnitInfo({ dptId: this.props.departmentId || 32 }, (response) => {
    //           if (response.status === 1) {
    //             response.data = response.data || {}
    //             response.data.dwlb = String(response.data.dwlb || '')
    //             response.data.dwxz =
    // (response.data.dwxz === undefined ? '' : String(response.data.dwxz))
    //             response.data.djrq =
    // response.data.djrq && moment(new Date(response.data.djrq))
    //             this.props.form.setFieldsValue({ ...response.data })
    //           } else {
    //             message.error(response.msg)
    //           }
    //         }))
    //       }else{
    //         message.error(reply.msg)
    //       }
    //     }))
    //   }else{
    //     message.error(response.msg)
    //   }
    // }))
    this.props.dispatch(getGunUnitInfo({ dptId: id||this.props.departmentId || 32 }, (response) => {
      if (response.status === 1) {
        this.setState({ spinLoading: false })
        response.data = response.data || {}
        response.data.dwlb = String(response.data.dwlb || '')
        response.data.qzzgr = String(response.data.qzzgr || '')
        response.data.lxr = String(response.data.lxr || '')
        response.data.lxdh = String(response.data.lxdh || '')
        response.data.bzrs = String(response.data.bzrs || '')
        response.data.scdw = String(response.data.scdw || '')
        response.data.scr = String(response.data.scr || '')
        response.data.shdw = String(response.data.shdw || '')
        response.data.shrmc = String(response.data.shrmc || '')
        response.data.spdw = String(response.data.spdw || '')
        response.data.spr = String(response.data.spr || '')
        response.data.bzsm = String(response.data.bzsm || '')
        response.data.dwxz = (response.data.dwxz === undefined ? '' : String(response.data.dwxz))
        response.data.djrq = response.data.djrq && moment(new Date(response.data.djrq))
        this.props.form.setFieldsValue({ ...response.data })
      } else {
        message.error(response.msg)
      }
    }))
  }

  // selectOptions1() {
  //   return [
  //     { code: '1', name: '射击竞技运动单位' },
  //     { code: '2', name: '营业性射击场' },
  //     { code: '3', name: '狩猎场' },
  //     { code: '4', name: '野生动物饲、科、保' },
  //     { code: '5', name: '机场' },
  //     { code: '6', name: '民用枪弹制造企业' },
  //     { code: '7', name: '其他' },
  //     { code: '8', name: '存储、配置公务枪支非公安机关配枪单位' },
  //   ]
  // }

  // selectOptions2() {
  //   return [
  //     { code: '0', name: '非赢利组织' },
  //     { code: '1', name: '全额预算事业单位' },
  //     { code: '2', name: '国有企业' },
  //     { code: '3', name: '中外合资企业' },
  //     { code: '4', name: '三资企业' },
  //     { code: '5', name: '私营企业' },
  //     { code: '6', name: '股份合作制企业' },
  //     { code: '7', name: '外资企业' },
  //     { code: '8', name: '港资企业' },
  //     { code: '9', name: '其他' },
  //   ]
  // }

  // 填充网格的配置项
  options() {
    return [
      {
        label: '单位类别',
        key: 'dwlb',
        render: () => (
          <Select placeholder="请选择单位类别" style={{ width: '100%' }}>
            {
              this.props.gunUnitTypeList.map((v, i) => <Option value={v.dicKey} key={i}>{v.dicContent}</Option>)
            }
          </Select>
        ),
      },
      {
        label: '单位性质',
        key: 'dwxz',
        render: () => (
          <Select placeholder="请选择单位性质" style={{ width: '100%' }}>
            {
              this.props.gunUnitPropList.map((v, i) => <Option value={v.dicKey} key={i}>{v.dicContent}</Option>)
            }
          </Select>
        ),
      },
      {
        label: '枪支专管人',
        key: 'qzzgr',
        placeholder: '请输入枪支专管人',
        maxlength: 10,
      },
      {
        label: '联系人',
        key: 'lxr',
        placeholder: '请输入联系人',
        maxlength: 10,
      },
      {
        label: '联系电话',
        key: 'lxdh',
        placeholder: '请输入联系电话',
        maxlength: 20,
      },
      {
        label: '编制人数',
        key: 'bzrs',
        placeholder: '请输入编制人数',
        maxlength: 5,
      },
      {
        label: '审查单位',
        key: 'scdw',
        placeholder: '请输入审查单位',
        maxlength: 30,
      },
      {
        label: '审查人',
        key: 'scr',
        placeholder: '请输入审查人',
        maxlength: 10,
      },
      {
        label: '审核单位',
        key: 'shdw',
        placeholder: '请输入审核单位',
        maxlength: 30,
      },
      {
        label: '审核人',
        key: 'shrmc',
        placeholder: '请输入审核人',
        maxlength: 10,
      },
      {
        label: '审批单位',
        key: 'spdw',
        placeholder: '请输入审批单位',
        maxlength: 30,
      },
      {
        label: '审批人',
        key: 'spr',
        placeholder: '请输入审批人',
        maxlength: 10,
      },
      {
        label: '登记日期',
        key: 'djrq',
        placeholder: '请选择登记日期',
        render: () => <DatePicker placeholder="请选择登记日期" />,
      },
      {
        label: '备注说明',
        key: 'bzsm',
        placeholder: '请输入备注说明',
        render: () => <Input type="textarea" placeholder="请输入备注说明" autosize maxLength="50" />,
      },
    ]
  }

  // 网格模板
  gridsTemplate(o) {
    const { getFieldDecorator } = this.props.form
    return (
      <Col span={12} key={o.key} style={{/* border:'1px solid #010',margin:'-1px 0 0 -1px'*/}}>
        <FormItem
          {...layout1}
          label={o.label}
        >
        {
          getFieldDecorator(o.key, {})(
            o.render ? o.render() : <Input placeholder={o.placeholder} maxLength={o.maxlength || 10} />
          )
        }
        </FormItem>
      </Col>
    )
  }

  // 保存信息
  handleClick() {
    const param = this.props.form.getFieldsValue()
    param.dptId = this.props.departmentId || 32
    if (param.djrq) {
      param.djrq = moment(param.djrq).format('YYYY-MM-DD')
    }
    this.setState({ btnLoading: true })
    this.props.dispatch(saveGunUnitInfo({ ...param }, (response) => {
      if (response.status === 1) {
        message.success('保存成功')
      } else {
        message.error('保存失败')
      }
      this.setState({ btnLoading: false })
    }))
  }

  render() {
    return (
      <div className="detail-content">
        <Spin spinning={this.state.spinLoading}>
          <Row gutter={0} className="detail-content" style={{ flexFlow: 'row wrap', alignContent: 'flex-start' }}>
           {
            this.options().map((v, i) => this.gridsTemplate(v))
           }
          </Row>
        </Spin>
        <div className="ability-button">
          <Button onClick={this.handleClick} loading={this.state.btnLoading}>保存</Button>
        </div>
      </div>
    )
  }
}
