/*新增业主*/
import React, { Component } from 'react'
import { Button, Form, Input, Select, Row, Col,Modal } from 'antd'
import {connect} from 'react-redux'
const createForm = Form.create
const FormItem = Form.Item
import {fetchLogisticsRoadAdd} from 'actions/groupLogisticsIndustry'

@Form.create({
  onFieldsChange(props, items) {
   // console.log(props)
    //console.log(items)
    // props.cacheSearch(items);
  },
})
@connect(
  (state, props) => ({
    config: state.config,
  })
)
 class addLogisticsRoad extends Component {
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
      this.props.dispatch(fetchLogisticsRoadAdd({...values,dptId:this.props.departmentId},(result) =>{
       // this.props.onCancel()
        this.props.onOk()
        // this.props.form.resetFields()
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
        title="线路名称"
        className="modal-header modal-body"
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={this.footer()}
        onOk={this.props.OkLogisticsRoad}
        >
        <Form horizontal>
          <FormItem {...formItemLayout} label="线路名称" hasFeedback>
            {getFieldDecorator('wlxl',{
                rules: [
                  {required: true, message:'请输入线路名称'},
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
export default  addLogisticsRoad = Form.create({})(addLogisticsRoad)