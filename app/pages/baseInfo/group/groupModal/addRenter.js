/*新增租客*/
import React, { Component } from 'react'
import { Button, Form, Input, Select, Row, Col ,Modal} from 'antd'
import {connect} from 'react-redux'
const createForm = Form.create
const FormItem = Form.Item
import {fetchRenterMessageAdd} from 'actions/groupServicedApartment'

@Form.create({
  
})
@connect(
  (state, props) => ({
    config: state.config,
  })
)
export default class Index extends Component {
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
      this.props.dispatch(fetchRenterMessageAdd({...values,dptId:this.props.departmentId},(result) =>{
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
      wrapperCol: {span: 16},
    }
    return (
      <div className="modalcontent">
        <Modal
          title="租客信息"
          className="modal-header modal-body"
          visible={this.props.visible}
          onCancel={this.props.onCancel}
          footer={this.footer()}
          >
        <Form horizontal>
          <FormItem {...formItemLayout} label="租客姓名" hasFeedback >
            {getFieldDecorator('xm',{
              rules: [
                {required: true, message:'请输入租客姓名'},
              ],
            })(
              <Input maxLength='30'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="户籍地址" >
            {getFieldDecorator('hjdz')(
              <Input maxLength='10'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="实际居住人员情况" >
            {getFieldDecorator('sjjzryqk',{
            })(
              <Input maxLength='50'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="联系电话" >
            {getFieldDecorator('lxfs',{
              rules: [
                {required: true, message:'请输入联系电话'},
                {validator:this.checkChange},
              ],
            })(
              <Input maxLength='11'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="门禁卡信息" >
            {getFieldDecorator('mjkxx',{
              rules: [
                {required: true, message:'请输入门禁卡信息'},
              ],
            })(
              <Input maxLength='50'/>
            )}
          </FormItem>
        </Form>
        </Modal>
      </div>
    )
  }
}
