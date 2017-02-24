import React, { Component } from 'react'
import { Button, Form, Input, Select, Row, Col ,Modal} from 'antd'
const createForm = Form.create
const FormItem = Form.Item


@Form.create({

})

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount(){
    this.props.form.setFieldsValue({resAreaName:this.props.resAreaName})
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.setState({loading: true})
      setTimeout(() => {
        this.setState({loading: false})
        this.props.handleSubmit(values)
      }, 1000)
    });
  }
 
  footer(){
    return(
      <div>
        <Button size={'large'} onClick={this.props.onCancel}>取消</Button>
        <Button type="primary" size={'large'} onClick={this.handleSubmit} loading={this.state.loading}>确定</Button>
      </div>
    )
  }
  render() {
    const { getFieldDecorator,setFieldsValue } = this.props.form;
    const {
      curResAreaId,
      visible,onCancel
    } = this.props;
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 17},
    }
    return (
    <Modal
        className="modal-header modal-body"
        visible={visible}
        title={curResAreaId==""?"新增责任区":"修改责任区"}
        onCancel={onCancel}
        footer={this.footer()}
    >
      <div className="modalcontent">
        <Form horizontal>
          <FormItem {...formItemLayout} label="责任区名称">
              {getFieldDecorator('resAreaName',{
                  rules:[{required:true,message:'请输入责任区名称'}]
              })(
                  <Input  type='text' placeholder="请输入责任区名称"  maxLength="30"/>
              )}
          </FormItem>
        </Form>
      </div>
    </Modal>
    )
  }
}
