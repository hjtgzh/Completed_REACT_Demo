import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Input, Modal, DatePicker, message } from 'antd'
import {
  fetchTaskAdd,
} from 'actions/task'

const FormItem = Form.Item
@Form.create({
  /* onFieldsChange(props, items) {
   console.log(props)
   console.log(items)
   // props.cacheSearch(items);
   },*/
})
// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
  })
)
export default class addTask extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const fieldsValue = {
        'taskname': values['taskname'],
        'startdate': values['startdate'].format('YYYY-MM-DD HH:mm:ss'),
        'enddate': values['enddate'].format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log(fieldsValue);
      this.props.dispatch(fetchTaskAdd({ ...fieldsValue }, (reply) => {
        console.log(reply)
        message.success(reply.msg)
        this.props.handleOk()
      }))
    });
  }

  footer() {
    return (
      <div>
        <Button type="primary" size={'large'} onClick={this.handleSubmit}>确定</Button>
        <Button size={'large'} onClick={this.props.onCancel}>取消</Button>
      </div>
    )
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    }
    const configTaskName = {
      rules: [
        { required: true, message: '请输入任务名称' },
      ],

    }

    const configStart = {
      // rules:[{type:"object",required:true,massage:'请选择起始时间'}]
      rules: [
        { type: 'object', required: true, message: '请选择起始时间' },
      ],
    }
    const configEnd = {
      rules: [
        { type: 'object', required: true, message: '请选择结束时间' },
      ],
    }
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title="新增任务"
        className="modal-header"
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={this.footer()}
      >
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="任务名称">
            {getFieldDecorator('taskname', configTaskName)(
              <Input maxLength="100" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="起始时间">
            {getFieldDecorator('startdate', configStart)(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="结束时间">
            {getFieldDecorator('enddate', configEnd)(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
// export default addTask = Form.create({})(addTask)
