/**
 * Created by 余金彪 on 2016/12/13.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Input, Button, Modal, message, Form, Select, DatePicker} from 'antd'
import moment from 'moment'
import {
  fetchFindGjByGjmc,
  fetchGetBaseFromJw,
  fetchInsertCyry,
} from 'actions/groupEmployee'

const FormItem = Form.Item
const Option = Select.Option
const businessRegisterState = [
  {code: '00', name: '无证件'},
  {code: '06', name: '台湾居民来往大陆通行证（一次有效）'},
  {code: '0A', name: '非税票据'},
  {code: '0B', name: '回乡证白卡'},
  {code: '10', name: '身份证'},
  {code: '11', name: '外交护照'},
  {code: '12', name: '公务护照'},
  {code: '13', name: '因公普通护照'},
  {code: '14', name: '普通护照'},
  {code: '15', name: '中华人民共和国旅行证'},
  {code: '16', name: '台湾居民来往大陆通行证（五年有效）'},
  {code: '20', name: '中华人民共和国入出境通行证'},
  {code: '21', name: '往来港澳通行证'},
  {code: '23', name: '前往港澳通行证'},
  {code: '24', name: '港澳居民来往内地通行证'},
  {code: '25', name: '大陆居民往来台湾通行证'},
  {code: '28', name: '华侨回国定居证'},
  {code: '29', name: '台湾居民定居证'},
  {code: '30', name: '外国人出入境证'},
  {code: '31', name: '外国人旅行证'},
  {code: '32', name: '外国人居留证、居留许可'},
  {code: '33', name: '外国人临时居留证'},
  {code: '34', name: '外国人永久居留证'},
  {code: '35', name: '入籍证书'},
  {code: '36', name: '出籍证书'},
  {code: '37', name: '复籍证书'},
  {code: '3E', name: '特区旅游签证'},
  {code: '3P', name: '普通签证'},
  {code: '3T', name: '团体签证'},
  {code: '49', name: '台湾居民登陆证'},
  {code: '51', name: '签证身份书'},
  {code: '60', name: '边境通行证'},
  {code: '66', name: '回美证'},
  {code: '70', name: '香港特别行政区护照'},
  {code: '71', name: '澳门特别行政区护照'},
  {code: '74', name: '港澳证贴纸签注'},
  {code: '75', name: '大陆证贴纸签注'},
  {code: '76', name: '台湾居民居留贴纸签注'},
  {code: '77', name: '台湾居民来往贴纸签注'},
  {code: '78', name: '贴纸加注'},
  {code: '98', name: '转印膜'},
  {code: '99', name: '其它证件'},
  {code: '9A', name: '电子护照塑封膜'},
  {code: '9B', name: '退籍证书'},
  {code: '9C', name: '复籍证书'},
  {code: '9D', name: '电子港澳证塑封膜'},
  {code: '9E', name: '2014版塑封膜'},

]

const startBusinessState = [
  {code: '1', name: '男'},
  {code: '2', name: '女'},
]
let cTimer
@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,
    searchCountryResult: state.searchCountryResult,
  })
)
export default class AddForeignModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      isShowCountryList: false,
      gjmc: [],
      gj: '',
      gjmcName: '',
      sfzdgj: '',
      id: '',
      endTime: '',
      startTime: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.selectedCountry = this.selectedCountry.bind(this)
    this._fuzzySearchForCountry = this._fuzzySearchForCountry.bind(this)
    this.disabledDate = this.disabledDate.bind(this)
    this.selctStartTime = this.selctStartTime.bind(this)
    this.selctEndTime = this.selctEndTime.bind(this)
    this._selectCountryItem = this._selectCountryItem.bind(this)
  }

  // 保存从业人员
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (this.state.endTime < this.state.startTime) {
        message.error('解聘时间不能小于聘任时间 请重新选择')
        return false
      }
      if (err) {
        return false
      }
      if (fieldsValue.xm == "" || fieldsValue.xm == undefined) {
        message.error('请重新查询境外人员')
        return false
      }
      const values = {
        ...fieldsValue,
        prsj: fieldsValue.prsj ? fieldsValue.prsj.format('YYYY-MM-DD HH:mm:ss') : '',
        jpsj: fieldsValue.jpsj ? fieldsValue.jpsj.format('YYYY-MM-DD HH:mm:ss') : '',
        baseid: this.state.id,
        dptId: this.props.dptId,
      };
      this.props.dispatch(fetchInsertCyry({...values}, (result) => {
        message.success(result.msg)
        this.props.onOk()
      }))
    });
  }

  // 模糊查询国籍
  _fuzzySearchForCountry(e) {
    const _self = this
    clearTimeout(cTimer)
    // this.setState({[e.target.name]:e.target.value})
    if (!e.target.value) {
      _self.setState({isShowCountryList: false})
      return
    }
    const obj = {gjmc: e.target.value}
    cTimer = setTimeout(() => {
      _self.props.dispatch(fetchFindGjByGjmc(obj, (response) => {
        if (response.status === 1) {
          _self.setState({gjmc: response.data, isShowCountryList: true})
        }
      }))
    }, 500)
  }

// 选择查询到的国籍
  _selectCountryItem(code, name, sfzdgj) {
    const self = this
    return function () {
      self.props.form.setFieldsValue({gj: name})
      self.setState({gj: code, gjmcName: name, sfzdgj, isShowCountryList: false})
    }
  }

  handleCancel() {
    this.props.form.resetFields()
    this.props.onCancel()
  }

  //查询境外人员
  selectedCountry() {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      const param = {
        gj: this.state.gj,
        gjmc: this.state.gjmcName,
        sfzdgj: this.state.sfzdgj,
        sfzh: values.sfzh,
        zjzl: values.zjzl,
      }
      this.props.dispatch(fetchGetBaseFromJw(param, (result) => {
        result.data.xb = result.data.xb.toString()
        this.props.form.setFieldsValue(result.data)
        this.props.form.setFieldsValue({gj: result.data.gjmc})
        this.setState({
          id: result.data.id,
        })
      }))
    })
  }

  selctStartTime(value) {
    this.setState({
      startTime: value,
    })
  }

  selctEndTime(value) {
    this.setState({
      endTime: value,
    })
    if (this.state.startTime == '') {
      message.error('请先选择聘任时间')
    }
  }

  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
        <Button type="" onClick={this.handleCancel}>取消</Button>
      </div>
    )
  }

  disabledDate(value) {
    if (!value) {
      return false
    }
    return value.valueOf() > moment(new Date()).valueOf()
  }

  render() {
    const {title = '新增境外从业人员'} = this.props
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 15},
      hasFeedback: true,
    }
    const self = this
    const gjValidate = {
      rules: [
        {required: true, message: '请输入国籍'},
        {
          validator(rule, value, callback) {
            if (!value) {
              callback()
              return
            }
            if (value !== self.state.gjmcName || !self.state.gjmcName) {
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
        onCancel={this.handleCancel}
        className="modal-body modal-header "
        visible={this.props.visible}
        title={title}
        footer={this.footer()}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="证件类型"
            {...formItemLayout}
          >
            {
              getFieldDecorator('zjzl', {
                rules: [{required: true, message: '请选择证件类型'}]
              })(
                <Select placeholder="请选择" style={{width: '100%'}}>
                  {
                    businessRegisterState.map((v, i) => <Option key={i} value={v.code}>{v.name}</Option>)
                  }
                </Select>
              )
            }
          </FormItem>
          <FormItem
            label="证件号码"
            {...formItemLayout}
          >
            {
              getFieldDecorator('sfzh', {
                rules: [{required: true, message: '请输入证件号码'}],
              })(
                <Input placeholder="请输入证件号码"/>
              )
            }
          </FormItem>
          <FormItem
            label="国籍"
            {...formItemLayout}
            style={{position: 'relative'}}
            hasFeedback={false}
          >
            {
              getFieldDecorator('gj', gjValidate)(
                <Input
                  name="gjmc"
                  placeholder="请输入国籍"
                  onChange={this._fuzzySearchForCountry}
                />
              )
            }
            <Button
              type="primary"
              style={{position: 'absolute', right: '-81px'}}
              onClick={this.selectedCountry}
            >
              查询
            </Button>
            {
              this.state.isShowCountryList ?
                <div className="underList" style={{width: '280px', left: '0px'}}>
                  <ul>
                    {
                      this.state.gjmc.map((v, i) => {
                        return (<li
                          name="gjdm"
                          key={v.gj}
                          onClick={this._selectCountryItem(v.gj, v.gjmc, v.sfzdgj)}
                        >
                          {v.gjmc}
                        </li>)
                      })
                    }
                  </ul>
                </div> : null
            }
          </FormItem>
          <FormItem
            label="工作部门"
            {...formItemLayout}
          >
            {
              getFieldDecorator('gzbm', {})(
                <Input placeholder="请输入工作部门"/>
              )
            }
          </FormItem>
          <FormItem
            label="姓名"
            {...formItemLayout}
          >
            {
              getFieldDecorator('xm', {})(
                <Input placeholder="" disabled/>
              )
            }
          </FormItem>
          <FormItem
            label="性别"
            {...formItemLayout}
          >
            {
              getFieldDecorator('xb', {})(
                <Select placeholder="" disabled style={{width: '100%'}}>
                  {
                    startBusinessState.map((v, i) => <Option key={i} value={v.code}>{v.name}</Option>)
                  }
                </Select>
              )
            }
          </FormItem>
          <FormItem
            label="别名绰号"
            {...formItemLayout}
          >
            {
              getFieldDecorator('bm', {})(
                <Input placeholder=""/>
              )
            }
          </FormItem>
          <FormItem
            label="联系方式"
            {...formItemLayout}
          >
            {
              getFieldDecorator('dhhm', {})(
                <Input disabled/>
              )
            }
          </FormItem>
          <FormItem
            label="户籍省县"
            {...formItemLayout}
          >
            {
              getFieldDecorator('houseOld', {})(
                <Input placeholder=""/>
              )
            }
          </FormItem>
          {/* <FormItem
           label='暂住省县'
           {...formItemLayout}
           >
           {
           getFieldDecorator('shack', {})(
           <Input placeholder=""/>
           )
           }
           </FormItem>*/}
          <FormItem
            label="户籍派出所"
            {...formItemLayout}
          >
            {
              getFieldDecorator('police', {})(
                <Input placeholder=""/>
              )
            }
          </FormItem>
          {/* <FormItem
           label='	暂住派出所'
           {...formItemLayout}
           >
           {
           getFieldDecorator('shackPolice', {})(
           <Input placeholder=""/>
           )
           }
           </FormItem>*/}
          <FormItem
            label="户籍社区"
            {...formItemLayout}
          >
            {
              getFieldDecorator('community', {})(
                <Input placeholder=""/>
              )
            }
          </FormItem>
          {/* <FormItem
           label='暂住社区'
           {...formItemLayout}
           >
           {
           getFieldDecorator('shackCommunity', {})(
           <Input placeholder=""/>
           )
           }
           </FormItem>*/}
          <FormItem
            label="户籍街巷"
            {...formItemLayout}
          >
            {
              getFieldDecorator('HuKouStreet', {})(
                <Input placeholder=""/>
              )
            }
          </FormItem>
          {/* <FormItem
           label='暂住街巷'
           {...formItemLayout}
           >
           {
           getFieldDecorator('shackStreet', {})(
           <Input placeholder=""/>
           )
           }
           </FormItem>*/}
          <FormItem
            label="户籍详址"
            {...formItemLayout}
          >
            {
              getFieldDecorator('detail', {})(
                <Input placeholder=""/>
              )
            }
          </FormItem>
          {/* <FormItem
           label='暂住详址'
           {...formItemLayout}
           >
           {
           getFieldDecorator('shackDetail', {})(
           <Input placeholder=""/>
           )
           }
           </FormItem>*/}


          <FormItem
            label="聘任时间"
            {...formItemLayout}
            hasFeedback={false}
          >
            {
              getFieldDecorator('prsj', {})(
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  disabledDate={this.disabledDate}
                  onChange={this.selctStartTime}
                />
              )
            }
          </FormItem>
          <FormItem
            label="解聘时间"
            {...formItemLayout}
            hasFeedback={false}
          >
            {
              getFieldDecorator('jpsj', {})(
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  disabledDate={this.disabledDate}
                  onChange={this.selctEndTime}
                />
              )
            }
          </FormItem>

          <FormItem
            label="职务"
            {...formItemLayout}
          >
            {
              getFieldDecorator('zw', {})(
                <Input placeholder=""/>
              )
            }
          </FormItem>
          <FormItem
            label="备注职务"
            {...formItemLayout}
          >
            {
              getFieldDecorator('bzzw', {})(
                <Input placeholder=""/>
              )
            }
          </FormItem>
          <FormItem
            label="备注"
            {...formItemLayout}
          >
            {
              getFieldDecorator('startBusinessState', {})(
                <Input placeholder="" type="textarea" autosize/>
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
