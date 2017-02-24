/*
 *Create By 韩卿
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Input, Form, Select, DatePicker } from 'antd'
import moment from 'moment'
import ContactAddressModal from 'components/relateAddrModal/relateAddrModal'
import { fetchSearchCountryResult, fetchForeignerResult, getForeignerPic } from 'actions/people'
import { hasResponseError } from 'utils'

const Option = Select.Option
const FormItem = Form.Item
// const translateSex = (code) => {
//   switch (String(code)) {
//   case '1':
//     return '男'
//   case '2':
//     return '女'
//   default:
//     return code || ''
//   }
// }
let cTimer

@connect(
    (state, props) => ({
      config: state.config,
      searchCountryResult: state.searchCountryResult,
      foreignerInfo: state.foreignerInfo,
    })
)

class foreignModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pic: '',
      zjlx: '',
      zjhm: '',
      gj: '',
      gjmc: '',
      sfzdgj: '',
      isShowCountryList: false,
      visible: false,
      foreignerInfo: {},
    }
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this._handleChange = this._handleChange.bind(this)
    this._fuzzySearchForCountry = this._fuzzySearchForCountry.bind(this)
    this._searchForeigner = this._searchForeigner.bind(this)
    this._closeUnderList = this._closeUnderList.bind(this)
    this._handleSelectIDType = this._handleSelectIDType.bind(this)
    this._handleSelectSex = this._handleSelectSex.bind(this)
    this.handleShowGlAddress = this.handleShowGlAddress.bind(this)
    this.getAddressInfo = this.getAddressInfo.bind(this)
    this.abortGetAddressInfo = this.abortGetAddressInfo.bind(this)
    this._handleSelectTime = this._handleSelectTime.bind(this)
  }
  componentWillReceiveProps(nextProps) {
  }
    // 身份证下拉框的选项配置
  selectItems() {
    return [
          { code: '00', name: '无证件' },
          { code: '06', name: '台湾居民来往大陆通行证（一次有效）' },
          { code: '0A', name: '非税票据' },
          { code: '0B', name: '回乡证白卡' },
          { code: '10', name: '身份证' },
          { code: '11', name: '外交护照' },
          { code: '12', name: '公务护照' },
          { code: '13', name: '因公普通护照' },
          { code: '14', name: '普通护照' },
          { code: '15', name: '中华人民共和国旅行证' },
          { code: '16', name: '台湾居民来往大陆通行证（五年有效）' },
          { code: '20', name: '中华人民共和国入出境通行证' },
          { code: '21', name: '往来港澳通行证' },
          { code: '23', name: '前往港澳通行证' },
          { code: '24', name: '港澳居民来往内地通行证' },
          { code: '25', name: '大陆居民往来台湾通行证' },
          { code: '28', name: '华侨回国定居证' },
          { code: '29', name: '台湾居民定居证' },
          { code: '30', name: '外国人出入境证' },
          { code: '31', name: '外国人旅行证' },
          { code: '32', name: '外国人居留证、居留许可' },
          { code: '33', name: '外国人临时居留证' },
          { code: '34', name: '外国人永久居留证' },
          { code: '35', name: '入籍证书' },
          { code: '36', name: '出籍证书' },
          { code: '37', name: '复籍证书' },
          { code: '3E', name: '特区旅游签证' },
          { code: '3P', name: '普通签证' },
          { code: '3T', name: '团体签证' },
          { code: '49', name: '台湾居民登陆证' },
          { code: '51', name: '签证身份书' },
          { code: '60', name: '边境通行证' },
          { code: '66', name: '回美证' },
          { code: '70', name: '香港特别行政区护照' },
          { code: '71', name: '澳门特别行政区护照' },
          { code: '74', name: '港澳证贴纸签注' },
          { code: '75', name: '大陆证贴纸签注' },
          { code: '76', name: '台湾居民居留贴纸签注' },
          { code: '77', name: '台湾居民来往贴纸签注' },
          { code: '78', name: '贴纸加注' },
          { code: '98', name: '转印膜' },
          { code: '99', name: '其它证件' },
          { code: '9A', name: '电子护照塑封膜' },
          { code: '9B', name: '退籍证书' },
          { code: '9C', name: '复籍证书' },
          { code: '9D', name: '电子港澳证塑封膜' },
          { code: '9E', name: '2014版塑封膜' },
    ]
  }
    // 性别下拉框的选项配置
  sexItems() {
    return [{ code: '1', sex: '男' }, { code: '2', sex: '女' }]
  }
    // 当前组件的确定按钮的回调函数
    // 参数为当前组件的state
  handleOk() {
    this.props.onOk(this.state.foreignerInfo)
  }
    // 当前组件的取消按钮的回调函数
  handleCancel() {
    this.props.onCancel()
  }
    // 普通输入框的Change函数
  _handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
    // 时间输入框的Change函数
  _handleSelectTime(Date, DateString) {
        // const time=Date.toLocaleDateString().replace(/\//g,'-')
    this.setState({ csrq: DateString })
  }
    // 证件类型select输入框的Change函数
  _handleSelectIDType(v) {
    this.setState({ zjlx: v })
  }
    // 性别select输入框的Change函数
  _handleSelectSex(v) {
    this.setState({ xb: v })
  }
    // 模糊查询国籍
  _fuzzySearchForCountry(e) {
    const _self = this
    clearTimeout(cTimer)
        // this.setState({[e.target.name]:e.target.value})
    if (!e.target.value) {
      _self.setState({ isShowCountryList: false })
      return
    }
    const obj = { gjmc: e.target.value }
    cTimer = setTimeout(() => {
      _self.props.dispatch(fetchSearchCountryResult(obj, (response) => {
        hasResponseError(response)
        if (response.status === 1) {
          _self.setState({ isShowCountryList: true })
        }
      }))
    }, 500)
  }
    // 选择查询到的国籍
  _selectCountryItem(code, name, sfzdgj) {
    this.props.form.setFieldsValue({ gj: name })
    this.setState({ gj: code, gjmc: name, sfzdgj, isShowCountryList: false })
  }
    // 根据信息查询境外人员
  _searchForeigner() {
    this.props.form.validateFields((err, values) => {
      if (err) {
        throw new Error(err);
        // return
      }
      values.gj = this.state.gj
      values.gjmc = this.state.gjmc
      values.sfzdgj = this.state.sfzdgj
      values.sfzh = values.zjhm
      this.props.dispatch(fetchForeignerResult(values, (response) => {
        if (response.status === 1) {
          this.setState({ foreignerInfo: response.data })
          this.props.dispatch(getForeignerPic({ ...values, id: response.data.id }, (_response) => {
            this.setState({ pic: _response.data.photopath })
          }))
        }
      }))
    })
  }
    // 关闭下拉搜索结果栏
  _closeUnderList() {
    this.setState({ isShowCountryList: false });
  }
    // 显示关联地址组件，并隐藏当前组件
  handleShowGlAddress() {
    this.setState({ visible: true })
    this.props.handleFisrtLevelModalHide()
  }
    // 关联地址组件的确定按钮的回调函数
  getAddressInfo(obj) {
    const foreignerInfo = { ...this.state.foreignerInfo, ...obj }
    this.setState({ foreignerInfo, visible: false })
    this.props.handleFisrtLevelModalShow()
  }
    // 关联地址组件的取消按钮的回调函数
  abortGetAddressInfo() {
    this.setState({ visible: false })
    this.props.handleFisrtLevelModalShow()
  }
  footer() {
    return (
      <div>
        <Button size={'large'} onClick={this.handleCancel}>取消</Button>
        <Button
          type="primary"
          size={'large'}
          onClick={this.handleOk}
          loading={this.props.btnLoading || false}
        >确定</Button>
      </div>
    )
  }
  render() {
      // window.moment=moment
    const self = this
    const {
          visible,
          className,
        } = this.props
    const { foreignerInfo } = this.state
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    }
    const { getFieldDecorator } = this.props.form
    const zjhmValidate = {
      rules: [{ required: true, message: '请填写证件号码' }],
      validateTrigger: 'onSubmit',
    }
    const gjValidate = {
      rules: [
            { required: true, message: '请输入国籍' },
        {
          validator(rule, value, callback) {
            if (!value) {
              callback()
              return
            }
            if (value !== self.state.gjmc || !self.state.gj) {
              callback('请选择下拉栏中搜索出来的国籍')
              return
            }
            callback()
          },
        },
      ],
      validateTrigger: 'onSubmit',
    }
    return (
      <Modal
        className={`modal-body modal-header foreignModal ${className}`}
        footer={this.footer()}
        visible={visible}
        title="新增境外人员"
        onCancel={this.handleCancel}
      >
        <section onClick={this._closeUnderList} style={{ height: '100%' }}>
          <section className="search-module">
            <FormItem
              {...formItemLayout}
              label="证件类型"
            >
            {
              getFieldDecorator('zjzl', {
                rules: [{ required: true, message: '请选择证件类型' }],
              })(
                <Select
                  name="zjzl"
                  onChange={this._handleSelectIDType}
                  size="large"
                  style={{ width: '280px' }}
                  placeholder="请选择证件类型"
                >
                  {
                    this.selectItems().map((v, i) =>
                      <Option key={v.code} value={v.code}>{v.name}</Option>
                    )
                  }
                </Select>
              )
            }
            </FormItem>
            <FormItem
              label="证件号码"
              {...formItemLayout}
              hasfeedback
            >
            {
              getFieldDecorator('zjhm', zjhmValidate)(
                <Input name="zjhm" style={{ width: '280px' }} maxLength="25" placeholder="请输入证件号码" />
              )
            }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="国籍"
              style={{ position: 'relative' }}
            >
              {
                getFieldDecorator('gj', gjValidate)(
                  <Input
                    name="gjmc"
                    style={{ width: '280px' }}
                    placeholder="模糊查询国籍"
                    onChange={this._fuzzySearchForCountry}
                  />
                )
              }
              {
                this.state.isShowCountryList ?
                  <div className="underList" style={{ width: '280px', left: '0px' }}>
                    <ul>
                    {
                      this.props.searchCountryResult.list.map((v, i) =>
                        <li
                          name="gjdm"
                          key={v.gj}
                          onClick={() => this._selectCountryItem(v.gj, v.gjmc, v.sfzdgj)}
                        >{v.gjmc}</li>
                      )
                    }
                    </ul>
                  </div> : null
              }
              <Button
                type="primary"
                onClick={this._searchForeigner}
                loading={this.props.foreignerInfo.loading}
              >查询</Button>
            </FormItem>
          </section>
          <section style={{ marginTop: '20px' }}>
            <div className="pic-div">
              <img src={this.state.pic} alt="图片" />
            </div>
            <table className="foreignTable">
              <tbody>
                <tr>
                  <td>姓名<span className="color-red">（必填）</span></td>
                  <td>
                    <Input value={foreignerInfo.xm} readOnly disabled />
                  </td>
                </tr>
                <tr>
                  <td>性别</td>
                  <td>
                    <Select
                      value={foreignerInfo.xb === undefined ? '' : String(foreignerInfo.xb)}
                      size="large" readOnly disabled
                    >
                    {
                      this.sexItems().map((v, i) => <Option value={v.code} key={v.code}>{v.sex}</Option>)
                    }
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td>证件号码<span className="color-red">（必填）</span></td>
                  <td>
                    <Input readOnly value={foreignerInfo.sfzh} disabled />
                  </td>
                </tr>
                <tr>
                  <td>国籍<span className="color-red">（必填）</span></td>
                  <td><Input readOnly value={foreignerInfo.gjmc} disabled /></td>
                </tr>
                <tr>
                  <td>出生日期</td>
                  <td>
                    <DatePicker
                      readOnly
                      value={foreignerInfo.csrqStr && moment(foreignerInfo.csrqStr)}
                      locale={'zh_CN'}
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>电话号码</td>
                  <td>
                    <Input value={foreignerInfo.dhhm} readOnly disabled />
                  </td>
                </tr>
                {/* <tr>
                  <td>登记地址</td>
                  <td>
                    <Input
                      onChange={this._handleChange}
                      value={this.state.djdz}
                      name='djdz'
                      placeholder='请输入登记地址'
                    />
                  </td>
                </tr>*/}
                {
                  this.props.needAddress ?
                    <tr>
                      <td>现住地址</td>
                      <td>
                        <Input
                          readOnly
                          value={foreignerInfo.xzdz}
                          name="xzdz"
                          onClick={this.handleShowGlAddress}
                          placeholder="点击关联地址"
                        />
                      </td>
                    </tr> : null
                }
                <tr>
                  <td>证件有效期</td>
                  <td>
                    <Input value={foreignerInfo.zjyxqstr} readOnly placeholder="请输入证件有效期" disabled />
                  </td>
                </tr>
                <tr>
                  <td>重点国家标注</td>
                  <td>
                    <Select
                      value={(foreignerInfo.sfzdgj === undefined ? '' : String(foreignerInfo.sfzdgj))}
                      size="large"
                      readOnly
                      disabled
                    >
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  </td>
                </tr>
                {/* <tr>
                    <td>关注信息</td>
                    <td>
                      <Input
                        onChange={this._handleChange}
                        value={this.state.gzxx}
                        name='gzxx'
                        placeholder='关注信息'
                      />
                    </td>
                  </tr>*/}
              </tbody>
            </table>
          </section>
        </section>
        {
          this.state.visible ?
            <ContactAddressModal visible onOk={this.getAddressInfo} onCancel={this.abortGetAddressInfo} /> : null
        }
      </Modal>
    )
  }
}

export default Form.create()(foreignModal)
