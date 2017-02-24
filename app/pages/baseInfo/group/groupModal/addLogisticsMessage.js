/*新增业主*/
import React, { Component } from 'react'
import { Button, Form, Input, Select, Row, Col,Modal} from 'antd'
import {connect} from 'react-redux'
const createForm = Form.create
const FormItem = Form.Item
import {fetchLogisticsMsgAdd } from 'actions/groupLogisticsIndustry'
@Form.create({
  onFieldsChange(props, items) {
  },
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
        <Button type="primary" size={'large'} onClick={this.handleSubmit} loading={this.state.loading}>确定</Button>
      </div>
    )
  }
  // 组件已经加载到dom中
  componentDidMount() {
    //this.props.form.setFieldsValue(this.props.values)
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      this.setState({loading: true})
      const that=this
      this.props.dispatch(fetchLogisticsMsgAdd({...values,dptId:this.props.departmentId},(result) =>{ 
        console.log(result.status)
        if(result){
          if(result.status==1){
            that.props.onOk()
          }
        }
        that.props.form.resetFields()
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
    const { getFieldDecorator } = this.props.form
    const {
      onOk
    } = this.props
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 17},
    }
    return (
      <div className="modalcontent">
       <Modal
          title="物流信息"
          className="modal-header modal-body"
          visible={this.props.visible}
          onCancel={this.props.onCancel}
          footer={this.footer()}
        >
        <Form horizontal>
          <FormItem {...formItemLayout} label="货物信息" >
            {getFieldDecorator('hwxx',{
              rules: [
                {required: true, message:'请输入货物信息'},
              ],
            })(
              <Input maxLength='50' />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="收件人姓名" >
            {getFieldDecorator('sjrxm',{
              rules: [
                {required: true, message:'请输入收件人姓名'},
              ],
            })(
              <Input maxLength='10'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="收件人地址" >
           {getFieldDecorator('sjrdz',{
              rules: [
                {required: true, message:'请输入收件人地址'},
              ],
            })(
              <Input maxLength='30'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="收件人联系方式" >
            {getFieldDecorator('sjrlxfs',{
              rules: [
                {required: true, message:'请输入收件人联系方式'},
                {validator:this.checkChange},
              ],
            })(
              <Input maxLength='11'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="寄件人姓名" >
            {getFieldDecorator('jjrxm',{
              rules: [
                {required: true, message:'请输入寄件人姓名'},
              ],
            })(
              <Input  maxLength='10'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="寄件人地址" >
            {getFieldDecorator('jjrdz',{
              rules: [
                {required: true, message:'请输入寄件人地址'},
              ],
            })(
              <Input maxLength='30'/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="寄件人联系方式" >
            {getFieldDecorator('jjrlxfs',{
              rules: [
                {required: true, message:'请输入寄件人联系方式'},
                {validator:this.checkChange},
              ],
            })(
              <Input maxLength='11'/>
            )}
          </FormItem>
        </Form>
       </Modal>
      </div>
    )
  }
}
