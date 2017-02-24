/**
 * Created by 从潘潘
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button, Form, Input, Select, Row, Col,Modal} from 'antd'
import {fetchOwnerMessageAdd } from 'actions/groupServicedApartment'

const createForm = Form.create
const FormItem = Form.Item

@Form.create({
  onFieldsChange(props, items) {
  },
})
@connect(
  (state, props) => ({
    config: state.config,
  })
)
 class AddOwner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
   footer(){
    return(
      <div>
        <Button size={'large'} onClick={this.props.onCancel}>取消</Button>
        <Button type="primary" size={'large'} onClick={this.handleSubmit} loading={this.state.loading}>确定</Button>
      </div>
    )
  }
    // 组件已经加载到dom中
  componentDidMount() {
    this.props.form.setFieldsValue(this.props.values)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      this.setState({loading: true})
      this.props.dispatch(fetchOwnerMessageAdd({...values,dptId:this.props.departmentId},(result) =>{
        this.props.onOk()
        this.props.form.resetFields()
        }))
      this.setState({loading: false})
    });
  }
  //电话号码的验证
  checkChange(rule, value, callback) {
    if(isNaN(value)){
       callback("只能输入数字")
    }
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 17},
    }
    return (
      <div className="modalcontent">
        <Modal
        title="租赁信息"
        className="modal-header modal-body"
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={this.footer()}
        >
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="物业公司负责人" >
            {getFieldDecorator('wygsfzr',{
              rules: [
                {required: true, message:'请输入公司负责人'},
              ],
            })(
              <Input maxLength='10'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="联系电话" >
            {getFieldDecorator('lxdh',{
              rules: [
                {required: true, message:'请输入联系电话'},
                {validator:this.checkChange},
              ],
            })(
              <Input maxLength='11'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="业主姓名" >
            {getFieldDecorator('yzxm',{
              rules: [
                {required: true, message:'请输入业主姓名'},
              ],
            })(
              <Input maxLength='10'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="业主户籍地址" >
            {getFieldDecorator('yzhjdz')(
              <Input maxLength='30'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="业主实际居住地址" >
            {getFieldDecorator('yzsjjzdz',{
              })(
                <Input maxLength='30'/>
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="业主联系方式" >
            {getFieldDecorator('yzlxfs',{
              rules: [
                {required: true, message:'请输入业主联系方式'},
              ],
            })(
              <Input maxLength='30'/>
            )}
          </FormItem>
        </Form>
        </Modal>
      </div>
    )
  }
}
export default  AddOwner = Form.create({})(AddOwner)
