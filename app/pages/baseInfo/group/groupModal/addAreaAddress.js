/*新增区域地址*/
import React, { Component } from 'react'
import { Button, Form, Input, Select, Row, Col,Modal } from 'antd'
import {connect} from 'react-redux'
const createForm = Form.create
const FormItem = Form.Item
import {fetchAreaAddressAdd} from 'actions/groupCarRentalBusiness'
@Form.create({
  onFieldsChange(props, items) {
  },
})
@connect(
  (state, props) => ({
    config: state.config,
  })
)
 class AddAreaAddress extends Component {
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
      this.props.dispatch(fetchAreaAddressAdd({...values,dptId:this.props.departmentId},(result) =>{
        this.props.onOk()
        this.props.form.resetFields()
        }))
      this.setState({loading: false})
    });
  }
  checkChange(rule, value, callback) {
    if (value && value.length>30) {
        callback("经营区域输入值不能多余30个字符")
    }
    callback()
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 17},
    }
    return (
      <div className="modalcontent">
       <Modal
        title="区域地址"
        className="modal-header modal-body"
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={this.footer()}
        >
        <Form horizontal>
          <FormItem {...formItemLayout} label="经营区域"  hasFeedback>
          {getFieldDecorator('jyqy',{
                rules: [
                  {type:"string",required: true, message:'请输入经营区域'},
                  {validator:this.checkChange},
                ],
               
              })(
                <Input type='text' maxLength="30" />
            )}
          </FormItem>
        </Form>
       </Modal>
      </div>
    )
  }
}
export default  AddAreaAddress = Form.create({})(AddAreaAddress)
