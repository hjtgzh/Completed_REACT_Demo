/*新增租赁信息*/
import React, { Component } from 'react'
import { Button, Form, Input, Select, Row, Col,Modal } from 'antd'
import {connect} from 'react-redux'
import {fetchRentMessageAdd} from 'actions/groupCarRentalBusiness'

const createForm = Form.create
const FormItem = Form.Item
@connect(
  (state, props) => ({
    config: state.config,
  })
)
@Form.create({
  getFieldDecorator(props, items) {
  },
})
 class AddRentMessage extends Component {
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
        <Button type="primary" size={'large'} onClick={this.handleSubmit}>确定</Button>
      </div>
    )
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      this.setState({loading: true})
      this.props.dispatch(fetchRentMessageAdd({...values,dptId:this.props.departmentId},(result) =>{
        this.props.onOk()
        this.props.form.resetFields()
        }))
      this.setState({loading: false})
    });
  }
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
        <Form horizontal>
          <FormItem {...formItemLayout} label="租赁人姓名" hasFeedback >
            {getFieldDecorator('zlrxm',{
              rules: [
                {required: true, message:'请输入租赁人姓名'},
              ],
            })(
              <Input maxLength='10'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="地址" >
             {getFieldDecorator('dz',{
              rules: [
                {required: true, message:'请输入地址'},
               
              ],
            })(
              <Input maxLength='30'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="联系方式" hasFeedback >
            {getFieldDecorator('lxfs',{
              rules: [
                {required: true, message:'请输入租赁人联系方式'},
                {validator:this.checkChange},
              ],
            })(
              <Input maxLength='11' />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="车牌号" >
            {getFieldDecorator('cp',{
              rules: [
                {required: true, message:'请输入车牌号'},
              ],
            })(
              <Input  maxLength='20'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="租赁线路gps"  hasFeedback>
            {getFieldDecorator('zlxlgps',{
              rules: [
                {required: true, message:'请输入租赁线路gps'},
              ],
            })(
              <Input  maxLength='30'/>
            )}
          </FormItem>
        </Form>
        </Modal>
      </div>
    )
  }
}
export default  AddRentMessage = Form.create({})(AddRentMessage)

