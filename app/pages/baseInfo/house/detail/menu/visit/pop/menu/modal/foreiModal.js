import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Tabs, Modal, Input, Form, Select, DatePicker, Spin, message } from 'antd'
import { fetchSearchCountryResult, fetchForeignerResult } from 'actions/people'

const Option = Select.Option
let cTimer
@connect(
    // (state, props) => ({
    //   config: state.config,
    //   peopleCheckSearchQuery: state.peopleCheckSearchQuery,
    //   peopleCheckSearchResult: state.peopleCheckSearchResult,
    // })
    function (state, props) {
      // debugger
      return { config: state.config,
      searchCountryResult: state.searchCountryResult,
      foreignerInfo: state.foreignerInfo }
    }
)


export default class foreignModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zjlx: '',
      zjhm: '',
      gjdm: '',
      gjmc: '',
      isShowCountryList: false,
      visible: false,
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
    // debugger
    if (this.props.foreignerInfo !== nextProps.foreignerInfo) {
      // debugger
      this.setState(nextProps.foreignerInfo)
    }
    // if(this.props.searchCountryResult!==nextProps.searchCountryResult){
    //  // if(nextProps.searchCountryResult.state==1){
    //    this.setState({isShowCountryList:true})
    //  // }
    // }
  }
  // 证件类型下拉框的选项配置
  zjlxItems() {
    return [
    { code: '00', zjlx: '无证件' }, { code: '06', zjlx: '台湾居民来往大陆通行证（一次有效）' }, { code: '0A', zjlx: '非税票据' }, { code: '0B', zjlx: '回乡证白卡' },
    { code: '10', zjlx: '身份证' }, { code: '11', zjlx: '外交护照' }, { code: '12', zjlx: '公务护照' }, { code: '13', zjlx: '因公普通护照' },
    { code: '14', zjlx: '普通护照' }, { code: '15', zjlx: '中华人民共和国旅行证' }, { code: '16', zjlx: '台湾居民来往大陆通行证（五年有效）' }, { code: '20', zjlx: '中华人民共和国入出境通行证' },
    { code: '21', zjlx: '往来港澳通行证' }, { code: '23', zjlx: '前往港澳通行证' }, { code: '24', zjlx: '港澳居民来往内地通行证' }, { code: '25', zjlx: '大陆居民往来台湾通行证' },
    { code: '28', zjlx: '华侨回国定居证' }, { code: '29', zjlx: '台湾居民定居证' }, { code: '30', zjlx: '外国人出入境证' }, { code: '31', zjlx: '外国人旅行证' },
    { code: '32', zjlx: '外国人居留证、居留许可' }, { code: '33', zjlx: '外国人临时居留证' }, { code: '34', zjlx: '外国人永久居留证' }, { code: '35', zjlx: '入籍证书' },
    { code: '36', zjlx: '出籍证书' }, { code: '37', zjlx: '复籍证书' }, { code: '3E', zjlx: '特区旅游签证' }, { code: '3P', zjlx: '普通签证' },
    { code: '3T', zjlx: '团体签证' }, { code: '49', zjlx: '台湾居民登陆证' }, { code: '51', zjlx: '签证身份书' }, { code: '60', zjlx: '边境通行证' },
    { code: '66', zjlx: '回美证' }, { code: '70', zjlx: '香港特别行政区护照' }, { code: '71', zjlx: '澳门特别行政区护照' }, { code: '74', zjlx: '港澳证贴纸签注' },
    { code: '75', zjlx: '大陆证贴纸签注' }, { code: '76', zjlx: '台湾居民居留贴纸签注' }, { code: '77', zjlx: '台湾居民来往贴纸签注' }, { code: '78', zjlx: '贴纸加注' },
    { code: '98', zjlx: '转印膜' }, { code: '99', zjlx: '其它证件' }, { code: '9A', zjlx: '电子护照塑封膜' }, { code: '9B', zjlx: '退籍证书' },
    { code: '9C', zjlx: '复籍证书' }, { code: '9D', zjlx: '电子港澳证塑封膜' }, { code: '9E', zjlx: '2014版塑封膜' },
    ]
  }
  // 身份证下拉框的选项配置
  selectItems() {
    return [{ code: '01', name: '身份证' }, { code: '02', name: '无证件' }]
  }
  // 性别下拉框的选项配置
  sexItems() {
    return [{ code: '1', sex: '男' }, { code: '2', sex: '女' }]
  }
  // 当前组件的确定按钮的回调函数
  // 参数为当前组件的state
  handleOk() {
    this.props.onOk(this.state)
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
    this.setState({ [e.target.name]: e.target.value })
    if (!e.target.value) {
      return
    }
    const obj = { name: e.target.value }
    cTimer = setTimeout(function () {
      _self.props.dispatch(fetchSearchCountryResult(obj), function (data) {
        if (data.state == 1) {
          _self.setState({ isShowCountryList: true })
        }
      })
    }, 500)
  }
  // 选择查询到的国籍
  _selectCountryItem(code, name) {
    this.setState({ gjdm: code, gjmc: name, isShowCountryList: false })
  }
  // 根据信息查询境外人员
  _searchForeigner() {
    if (!this.state.zjlx || !this.state.zjhm || !this.state.gjdm) {
      // alert("error")
      message.error('请输入全部信息')
      console.log(this.state)
    } else {
      this.props.dispatch(fetchForeignerResult(this.state))
    }
  }
  // 关闭下拉搜索结果栏
  _closeUnderList() {
    console.log('close');
    this.setState({ isShowCountryList: false });
  }
  // 显示关联地址组件，并隐藏当前组件
  handleShowGlAddress() {
    this.setState({ visible: true })
    this.props.handleFisrtLevelModalHide()
  }
  // 关联地址组件的确定按钮的回调函数
  getAddressInfo(obj) {
    this.setState({ ...obj, visible: false })
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
        <Button size={'large'} onClick={this.handleOk} loading={this.props.btnLoading || false}>确定</Button>
        <Button size={'large'} onClick={this.handleCancel}>取消</Button>
      </div>
    )
  }
  render() {
    const { visible, foreignerInfo } = this.props
    return (
    <Modal className="modal-body" footer={this.footer()} visible={visible} title="新增境外人员" onCancel={this.handleCancel}>
    <section onClick={this._closeUnderList} style={{ height: '100%' }}>
      <section className="search-module">
        <div><label>证件类型：</label><Select name="zjzl" onChange={this._handleSelectIDType} size="large" style={{ width: '200px' }} placeholder="请选择证件类型">
          {this.zjlxItems().map((v, i) => <Option value={v.code} key={v.code}>{v.zjlx}</Option>)}
          </Select>
        </div>
        <div><label>证件号码：</label><Input name="zjhm" onChange={this._handleChange} value={this.state.zjhm} style={{ width: '200px' }} maxLength="25" placeholder="请输入证件号码" /></div>
        <div style={{ position: 'relative' }}>
          <label>国籍：</label><Input name="gjmc" onChange={this._fuzzySearchForCountry} value={this.state.gjmc} style={{ width: '200px' }} placeholder="模糊查询国籍" />
          {this.state.isShowCountryList ? <div className="underList" style={{ width: '200px', left: '60px' }}><ul>
            {this.props.searchCountryResult.list.map((v, i) => <li name="gjdm" key={v.code} value={v.code} onClick={this._selectCountryItem.bind(this, v.code, v.name)}>{v.name}</li>)}
          </ul></div> : null}
        </div>
        <Button onClick={this._searchForeigner} loading={foreignerInfo.loading}>查询</Button>
      </section>
      <section style={{ marginTop: '20px' }}>
        <div className="pic-div"><img src={this.props.foreignerInfo.avater} alt="图片" /></div>
        <table className="foreignTable"><tbody>
          <tr><td>姓名<span className="color-red">（必填）</span></td><td><Input onChange={this._handleChange} value={this.state.xm} name="xm" placeholder="请输入姓名" /></td></tr>
          <tr><td>性别</td><td><Select onChange={this._handleSelectSex} value={this.state.xb} size="large" name="xb" placeholder="请选择性别">
            {this.sexItems().map((v, i) => <Option value={v.code} key={v.code}>{v.sex}</Option>)}
          </Select></td></tr>
          <tr><td>证件号码<span className="color-red">（必填）</span></td><td><Input readOnly value={this.state.zjhm2} name="zjhm2" /></td></tr>
          <tr><td>国籍<span className="color-red">（必填）</span></td><td><Input readOnly value={this.state.gjmc2} name="gjmc2" /></td></tr>
          <tr><td>出生日期</td><td><DatePicker readOnly onChange={this._handleSelectTime} value={this.state.csrq} locale={'zh_CN'} format={'yyyy-MM-dd'} /></td></tr>
          <tr><td>电话号码</td><td><Input onChange={this._handleChange} value={this.state.dhhm} name="dhhm" placeholder="请输入电话号码" /></td></tr>
          <tr><td>登记地址</td><td><Input onChange={this._handleChange} value={this.state.djdz} name="djdz" placeholder="请输入登记地址" /></td></tr>
          <tr><td>证件有效期</td><td><Input onChange={this._handleChange} value={this.state.zjyxq} name="zjyxq" placeholder="请输入证件有效期" /></td></tr>
          <tr><td>重点国家标注</td><td><Input onChange={this._handleChange} value={this.state.zdgjbz} name="zdgjbz" placeholder="重点国家标注" /></td></tr>
          <tr><td>关注信息</td><td><Input onChange={this._handleChange} value={this.state.gzxx} name="gzxx" placeholder="关注信息" /></td></tr>
        </tbody></table>
      </section>
    </section>
    </Modal>
    )
  }
}
