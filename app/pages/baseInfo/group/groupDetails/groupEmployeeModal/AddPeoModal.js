/**
 * Created by 余金彪 on 2016/12/13.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Modal, message, Form, Select, DatePicker } from 'antd'
import { regExpConfig } from 'utils/config'
import moment from 'moment'
import {
  fetchInsertCyry,
  fetchGetBaseBySfzh,
} from 'actions/groupEmployee'

const FormItem = Form.Item
const Option = Select.Option
const businessRegisterState = [
  { code: '1', name: '男' },
  { code: '2', name: '女' },
]
@Form.create({})
@connect(
  (state, props) => ({})
)
export default class AddPeoModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      baseid: '',
      loading: false,
      startTime: '',
      endTime: '',
    }
    this.searchLegalPersonByIdnumber = this.searchLegalPersonByIdnumber.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.onOk = this.onOk.bind(this)
    this.disabledDate = this.disabledDate.bind(this)
    this.selctStartTime = this.selctStartTime.bind(this)
    this.selctEndTime = this.selctEndTime.bind(this)
  }

  handleCancel() {
    this.props.onCancel()
    this.props.form.resetFields()
  }

  onOk() {
    this.props.onCancel()
  }

  // 保存
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (this.state.endTime < this.state.startTime) {
        message.error('解聘时间不能小于聘任时间 请重新选择')
        return false
      }
      if (err) return
      const values = {
        ...fieldsValue,
        prsj: fieldsValue.prsj? fieldsValue.prsj.format('YYYY-MM-DD HH:mm:ss') : '',
        jpsj: fieldsValue.jpsj ? fieldsValue.jpsj.format('YYYY-MM-DD HH:mm:ss') : '',
        baseid: this.state.baseid,
        dptId: this.props.dptId,
      };
      this.props.dispatch(fetchInsertCyry({ ...values }, (result) => {
        message.success(result.msg)
        this.props.form.resetFields()
        this.props.onOk()
      }))
    });
  }

  // 根据身份证查询人员
  searchLegalPersonByIdnumber() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (fieldsValue.sfzh != '') {
        if (!(regExpConfig.IDcard.test(fieldsValue.sfzh))) {
          return;
        } else {
          const idnumber = this.props.form.getFieldValue('sfzh')
          this.setState({
            loading: true,
          })
          this.props.dispatch(fetchGetBaseBySfzh({ sfzh: idnumber }, (data) => {
            if (data.msg != '') {
              message.success(data.msg)
            }
            if (data.data.xb != undefined) {
              data.data.xb = data.data.xb.toString()
            }
            this.props.form.resetFields()
            this.props.form.setFieldsValue(data.data)
            this.setState({
              baseid: data.data.id,
              loading: false,
            })
          }))
        }
      } else if (fieldsValue.sfzh == '') {
        message.error('身份证不能为空！');
        return
      }
    })
  }

  // 选择的日期时间不能大于今天
  disabledDate(value) {
    if (!value) {
      return false
    }
    return value.valueOf() > moment(new Date()).valueOf()
  }

  // 选择聘任时间
  selctStartTime(value) {
    this.setState({
      startTime: value,
    })
  }

  // 选择解聘时间
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

  render() {
    const { title = '新增境内从业人员' } = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
      hasFeedback: true,
    }

    return (
      <Modal
        onOk={this.onhandleOk}
        className="modal-body modal-header "
        visible={this.props.visible}
        title={title}
        footer={this.footer()}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="身份证号码"
            {...formItemLayout}
            style={{ position: 'relative' }}
          >
            {
              getFieldDecorator('sfzh', {
                rules: [
                  { required: true, message: '请输入法人身份证' },
                  { pattern: regExpConfig.IDcard, message: '请输入正确的法人身份证' },
                ],
              })(
                <Input placeholder="请输入法人身份证" />
              )
            }
            <Button
              type="primary"
              style={{ position: 'absolute', right: '-81px' }}
              loading={this.state.loading}
              onClick={this.searchLegalPersonByIdnumber}
            >查询</Button>
          </FormItem>
          <FormItem
            label="工作部门"
            {...formItemLayout}
          >
            {
              getFieldDecorator('gzbm', {})(
                <Input placeholder="请输入工作部门" />
              )
            }
          </FormItem>
          <FormItem
            label="从业人员姓名"
            {...formItemLayout}
          >
            {
              getFieldDecorator('xm', {

              })(
                <Input placeholder="" disabled />
              )
            }
          </FormItem>
          <FormItem
            label="别名绰号"
            {...formItemLayout}
          >
            {
              getFieldDecorator('bmch', {})(
                <Input placeholder="" />
              )
            }
          </FormItem>
          <FormItem
            label="联系方式"
            {...formItemLayout}
          >
            {
              getFieldDecorator('dhhm', {

              })(
                <Input disabled />
              )
            }
          </FormItem>
          <FormItem
            label="性别"
            {...formItemLayout}
          >
            {
              getFieldDecorator('xb', {})(
                <Select placeholder="" disabled style={{ width: '100%' }}>
                  {
                    businessRegisterState.map((v, i) => <Option key={i} value={v.code}>{v.name}</Option>)
                  }
                </Select>
              )
            }
          </FormItem>
          <FormItem
            label="户籍省县"
            {...formItemLayout}
          >
            {
              getFieldDecorator('hksx', {})(
                <Input placeholder="" />
              )
            }
          </FormItem>
          {/*  <FormItem
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
                <Input placeholder="" />
              )
            }
          </FormItem>
          {/*  <FormItem
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
                <Input placeholder="" />
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
                <Input placeholder="" />
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
              getFieldDecorator('hkxz', {})(
                <Input placeholder="" />
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
                <Input placeholder="" />
              )
            }
          </FormItem>
          <FormItem
            label="备注职务"
            {...formItemLayout}
          >
            {
              getFieldDecorator('bzzw', {})(
                <Input placeholder="" />
              )
            }
          </FormItem>
          <FormItem
            label="重点人员"
            {...formItemLayout}
          >
            {
              getFieldDecorator('zdry', {})(
                <Input placeholder="" disabled />
              )
            }
          </FormItem>
          <FormItem
            label="备注"
            {...formItemLayout}
          >
            {
              getFieldDecorator('bz', {})(
                <Input placeholder="" type="textarea" autosize />
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
