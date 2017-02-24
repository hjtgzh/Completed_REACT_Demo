/*关联案件*/
import React, { Component } from 'react'
import { Button, Form, Input, Select, Row, Col,Modal} from 'antd'
import {connect} from 'react-redux'
const createForm = Form.create
const FormItem = Form.Item
import {fetchCaseMsgAdd } from 'actions/houseAddressDetail'
@Form.create({
  onFieldsChange(props, items) {
  },
})
@connect(
  (state, props) => ({
    config: state.config,
  })
)
 class CaseMsg extends Component {
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
        <Button type="primary" size={'large'} onClick={this.handleSubmit} >确定</Button>
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
       this.props.onOk(values)
    });
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
        title="新增关联案件"
        className="modal-header modal-body"
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={this.footer()}
        >
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="案件编号" >
            {getFieldDecorator('ajbh',{
              rules: [
                {required: true, message:'请输入案件编号'},
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
export default  CaseMsg = Form.create({})(CaseMsg)
