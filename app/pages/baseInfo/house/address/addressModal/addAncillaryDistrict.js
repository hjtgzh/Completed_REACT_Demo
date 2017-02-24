/*
    页面作废，暂时保留
 */
//import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { Button, Form, Input, Select, Row, Col,message,Modal} from 'antd'
//const createForm = Form.create
//const FormItem = Form.Item
//
//import {
//  fetchDeclarAdd,
//  fetchDeclarUpdate
//} from 'actions/houseAddress'
//
//
////连接公用常量、后端返回的数据方法  并放置在props里面调用
//@connect(
//  (state, props) => ({
//    config: state.config,
//  })
//)
//
//@Form.create({})
//
//export default class Index extends Component {
//  constructor(props) {
//    super(props)
//    this.state = {
//      loading: false,
//    }
//    this.handleSubmit = this.handleSubmit.bind(this)
//    this.handleCancel = this.handleCancel.bind(this)
//  }
//
//  componentDidMount(){
//    this.props.form.setFieldsValue({
//      name:this.props.value.name
//    })
//  }
//
//  handleSubmit(e) {
//    e.preventDefault();
//    this.props.form.validateFields((errors, values) => {
//      if (!!errors) {
//        console.log('Errors in form!!!');
//        return;
//      }
//      //如果名称不做改变，则直接关闭窗口，更新列表，不再做其他操作
//      if(values.name ==this.props.value.name){
//        this.props.handleOk(false);
//        return;
//      }
//      this.setState({loading: true})
//      if(this.props.type == 'edit'){
//        this.props.dispatch(fetchDeclarUpdate({...values,id:this.props.roadId},(result) =>{
//          this.props.handleOk(false)
//        }))
//      }else{
//        const sData = values;
//        sData.relativeId = this.props.relativeId;
//        sData.sblx = this.props.sblx;
//        this.props.dispatch(fetchDeclarAdd(sData,(result) =>{
//          this.props.handleOk(false)
//        }))
//      }
//      this.setState({loading: false})
//      this.props.form.resetFields()
//    });
//  }
//  handleCancel(e){
//    e.preventDefault();
//    this.props.handleCancel();
//    this.props.form.resetFields();
//  }
//  render() {
//    const { getFieldDecorator } = this.props.form;
//    const formItemLayout = {
//      labelCol: {span: 5},
//      wrapperCol: {span: 17},
//    }
//    return (
//      <Modal
//        visible={this.props.visible}
//        className='modal-header'
//        title={this.props.title}
//        onCancel={this.handleCancel}
//        footer={[
//        <Button type="primary" onClick={this.handleSubmit}>确定</Button>,
//        <Button onClick={this.handleCancel}>取消</Button>]}
//      >
//        <Form horizontal>
//          <FormItem {...formItemLayout} label="附属区苑名称" hasFeedback>
//            {getFieldDecorator('name',{
//              rules: [
//                {required: true, message:'请输入附属区苑名称'},
//              ]
//            })(
//              <Input  />
//            )}
//          </FormItem>
//        </Form>
//      </Modal>
//    )
//  }
//}
