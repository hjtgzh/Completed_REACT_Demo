import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Select, Input, Form, Row, Col, DatePicker } from 'antd'
import moment from 'moment'
import Panel from 'components/panel'
import {fetchSafeKeepDetail} from 'actions/houseVisitPop'

const { MomthPicker , RangePicker } = DatePicker
const FormItem = Form.Item
const Option = Select.Option
const createForm = Form.create

@Form.create({
  onFieldsChange(props, items) {
   
  },
})
//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    safeKeepDetailSearchResult: state.safeKeepDetailSearchResult,
  })
)
export default class groupSafeKeepDetail extends Component{
  // 初始化页面常量 绑定事件方法
  constructor(props){
    super(props)
    this.state={
      visible : false,
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleback = this.handleback.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchSafeKeepDetail({ currentPage: 1, pageSize:10 }))
  }

  //设施种类下拉配置
  sszlItem() {
    return [
    {code: "1",sszl: "视频监控"},{code: "2",sszl: "入侵报警"},{code: "3",sszl: "紧急报警"},{code: "4",sszl: "实时录音"},
    {code: "5",sszl: "物防设施"},{code: "9",sszl: "其他"},
    ]
  }
  //联网情况下拉配置
  lwqkItem() {
    return [
      {code: "1",lwqk: "本地监控"},{code: "2",lwqk: "110报警联网"},{code: "3",lwqk: "其他联网"},{code: "4",lwqk: "无联网"},
    ]
  }
  //保存
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const rangeValue = fieldsValue['range-picker'];
      const rangeTimeValue = fieldsValue['range-time-picker'];
      const values = {
        ...fieldsValue,
        'pcsj': fieldsValue['pcsj'] ? fieldsValue['pcsj'].format('YYYY-MM-DD') : '',
        'tjsj': fieldsValue['tjsj'] ? fieldsValue['tjsj'].format('YYYY-MM-DD') : '',
      };
      console.log('Received values of form: ', values);
    });
  }
  //删除物品信息
  handleDelete(e) {
    e.preventDefault();
    //this.props.dispatch(fetchDeleteGoodsDetail({"id" : 1}))
  }  
  //返回列表
  handleback(e) {
    e.preventDefault(); 
  }

  render() {
    const {
      safeKeepDetailSearchResult,
    } = this.props;

    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const infItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };

    return (
      <Panel>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span="24">
              <FormItem {...infItemLayout} label="设施名称">
                {getFieldDecorator('ssmc', { initialValue:`${safeKeepDetailSearchResult.zrrsfz?safeKeepDetailSearchResult.zrrsfz:""}` })
                (
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="设施种类">
                {getFieldDecorator('sszl', { initialValue:`${safeKeepDetailSearchResult.zrrsfz?safeKeepDetailSearchResult.zrrsfz:""}` })
                  (
                    <Select>
                      {this.sszlItem().map((v,i) => <Option value={v.code} key={v.code} >{v.sszl}</Option>)}
                    </Select>
                  )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="投资总额">
                {getFieldDecorator('tzze', { initialValue:`${safeKeepDetailSearchResult.zrrsfz?safeKeepDetailSearchResult.zrrsfz:""}` })
                (
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="安装部位">
                {getFieldDecorator('azbw', { initialValue:`${safeKeepDetailSearchResult.zrrsfz?safeKeepDetailSearchResult.zrrsfz:""}` })
                (
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="联网情况">
                {getFieldDecorator('lwqk', { initialValue:`${safeKeepDetailSearchResult.zrrsfz?safeKeepDetailSearchResult.zrrsfz:""}` })
                  (
                    <Select>
                      {this.lwqkItem().map((v,i) => <Option value={v.code} key={v.code} >{v.lwqk}</Option>)}
                    </Select>
                  )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="安装时间">
                {getFieldDecorator('azsj',{ initialValue:`${safeKeepDetailSearchResult.zrrsfz?safeKeepDetailSearchResult.zrrsfz:""}` })
                  (
                    <DatePicker showTime format="YYYY-MM-DD"/>
                  )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="数量">
                {getFieldDecorator('sl', { initialValue:`${safeKeepDetailSearchResult.zrrsfz?safeKeepDetailSearchResult.zrrsfz:""}` })
                (
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="型号">
                {getFieldDecorator('xh', { initialValue:`${safeKeepDetailSearchResult.zrrsfz?safeKeepDetailSearchResult.zrrsfz:""}` })
                (
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="检修情况">
                {getFieldDecorator('jxqk', { initialValue:`${safeKeepDetailSearchResult.zrrsfz?safeKeepDetailSearchResult.zrrsfz:""}` })
                (
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="备注">
                {getFieldDecorator('bz', { initialValue:`${safeKeepDetailSearchResult.zrrsfz?safeKeepDetailSearchResult.zrrsfz:""}` })
                (
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div>
          <Button type="primary" onClick={this.handleDelete}>删除安全防范</Button>
          <Button type="primary" onClick={this.handleSubmit}>保存修改内容</Button>
          <Button type="primary" onClick={this.handleback}>返回列表
            <Link to={`/group$/departmentDetail/${1}`}>详情</Link>
          </Button>
        </div>
      </Panel>
    )
  }
}