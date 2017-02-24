/*新增车辆*/
import React, { Component } from 'react'
import { Button, Form, Input, Select, Row, Col,Modal } from 'antd'
import {connect} from 'react-redux'
const createForm = Form.create
const FormItem = Form.Item
import {fetchCarMessageAdd,fetchCarMessage} from 'actions/groupLogisticsIndustry'
@connect(
  (state, props) => ({
    config: state.config,
  })
)
@Form.create({
  onFieldsChange(props, items) {
  },
})
 class AddCarMewssage extends Component {
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
      this.props.dispatch(fetchCarMessageAdd({...values,dptId:this.props.departmentId},(result) =>{
        this.props.onOk(false)
        this.props.form.resetFields()
         //this.props.dispatch(fetchCarMessage({this.props.departmentId}))
       }))
      this.setState({loading: false})
    });
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
          title="新增车辆"
          className="modal-header modal-body"
          visible={this.props.visible}
          onCancel={this.props.onCancel}
          footer={this.footer()}
          >
        <Form horizontal>
          <FormItem {...formItemLayout} label="车牌号" >
            {getFieldDecorator('cph',{
                rules: [
                  {required: true, message:'请输入车牌号'},
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
export default  AddCarMewssage = Form.create({})(AddCarMewssage)