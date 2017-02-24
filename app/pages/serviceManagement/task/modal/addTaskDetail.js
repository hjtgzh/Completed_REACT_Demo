/**
 * Created by Administrator on 2016/11/21.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Checkbox, Button,Input,Select,Modal,DatePicker} from 'antd'
import Panel from 'components/panel'
import {updateTabList} from 'actions/tabList'
const FormItem = Form.Item
const Option=Select.Option
/*import {
 fetchTaskDetail,
 } from 'actions/task'*/

@connect(
	(state) => ({
		config: state.config,
	})
)

class addTaskDetail extends Component{
	constructor(props){
		super(props)
		this.state={
			detailValue:
			{
				taskName:"巡逻",
				dateStartTime:"",
				dateEedTime:"",
				completion:"是东方省飞三翻四复是东方省飞",
				valid:"永久",

			}

		}
		this.handleSubmit=this.handleSubmit.bind(this)
	}

// 组件已经加载到dom中
	componentDidMount() {
		/*debugger;
		 const  taskId=this.props.taskId
		 this.props.dispatch(fetchTaskDetail({id:taskId}),(result)=>{
		 console.log(result)
		 //this.props.form.setFieldsValue(detailValue.data)//获取的一组数值放到DOM中
		 })*/
		//this.props.form.setFieldsValue(this.state.detailValue)//获取的一组数值放到DOM中

	}
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((errors,values)=>{
			if(errors){
				console.log("Errors in form");
				return;
			}
			/*this.props.dispatch(fetchTaskAdd(fieldsValue,(result)=>{
			 this.props.handleOk();
			 }))*/
			const fieldsValue={
				"taskname":values["taskname"],
				"startdate":values["startdate"].format("YYYY-MM-DD HH:mm:ss"),
				"enddate":values["enddate"].format("YYYY-MM-DD HH:mm:ss")
			}
			debugger;
			console.log(fieldsValue);

		});
	}
	footer(){
		return(
			<div>
				<Button type="primary" size={'large'} onClick={this.handleSubmit}>确定</Button>
				<Button size={'large'} onClick={this.props.onCancel}>取消</Button>
			</div>
		)
	}
	render(){

		const formItemLayout = {
			labelCol: { span: 5 },
			wrapperCol: { span: 17 },
		}
		const configTaskName={
			rules:[{required:true,massage:'请填写任务名称'}]
		}
		const configStart={
			rules:[{type:"object",required:true,massage:'请选择起始时间'}]
		}
		const configEnd={
			rules:[{type:"object",required:true,massage:'请选择起始时间'}]
		}
		const {getFieldDecorator}=this.props.form

		return(
			<Modal
				title="新增子任务"
				className="modal-header"
				visible={this.props.visible}
				onCancel={this.props.onCancel}
				footer={this.footer()}
			>
				<Form horizontal onSubmit={this.handleSubmit}>
					<FormItem {...formItemLayout} label="任务名称">
						{getFieldDecorator('taskname',configTaskName)(
							<Input/>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="任务对象">
						{getFieldDecorator('taskdx',configTaskName)(
							<Select>
								<Option value="0">地址</Option>
								<Option value="1">人员</Option>
								<Option value="2">单位</Option>
							</Select>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="起始时间">
						{getFieldDecorator('startdate',configStart)(
							<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="结束时间">
						{getFieldDecorator('enddate',configEnd)(
							<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="考核内容">
						{getFieldDecorator('taskkhnr',configTaskName)(
							<Select>
								<Option value="0">访查量</Option>
							</Select>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="任务值">
						{getFieldDecorator('rwz',{})(
							<Input />
						)}
					</FormItem>
				</Form>

			</Modal>
		)
	}
}
export default  addTaskDetail = Form.create({})(addTaskDetail)