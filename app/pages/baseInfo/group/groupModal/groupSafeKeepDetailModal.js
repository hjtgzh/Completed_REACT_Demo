import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Table, Button, Tabs, Select, Modal, Input, Form, Row, Col, DatePicker} from 'antd'
import moment from 'moment'
import {fetchSafeKeepDetail, fetchDeleteSafeKeep} from 'actions/houseVisitPop'

const {MomthPicker, RangePicker} = DatePicker
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
export default class groupSafeKeepDetailModal extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchSafeKeepDetail({currentPage: 1, pageSize: 10}))
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.visible !== nextProps.visible) {
      this.setState({"visible": nextProps.visible})
    }
  }

  handleOk() {
    console.log('Clicked OK');
    this.setState({
      visible: false,
    });
    //this.props.handleSubmit()
  }

  handleCancel(e) {
    /* this.setState({
     visible: false,
     });*/
    this.props.cancle()
  }

  //设施种类下拉配置
  sszlItem() {
    return [
      {code: "1", sszl: "视频监控"}, {code: "2", sszl: "入侵报警"}, {code: "3", sszl: "紧急报警"}, {code: "4", sszl: "实时录音"},
      {code: "5", sszl: "物防设施"}, {code: "9", sszl: "其他"},
    ]
  }

  //联网情况下拉配置
  lwqkItem() {
    return [
      {code: "1", lwqk: "本地监控"}, {code: "2", lwqk: "110报警联网"}, {code: "3", lwqk: "其他联网"}, {code: "4", lwqk: "无联网"},
    ]
  }

  //删除物品信息
  handleDelete(e) {
    e.preventDefault();
    this.props.dispatch(fetchDeleteSafeKeep({"id": 1}))
  }

  //保存
  handleSubmit(e) {
    //debugger
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      // Should format date value before submit.
      const rangeValue = fieldsValue['range-picker'];
      const rangeTimeValue = fieldsValue['range-time-picker'];
      const values = {
        ...fieldsValue,
        'azsj': fieldsValue['azsj'] ? fieldsValue['azsj'].format('YYYY-MM-DD') : '',
      };
      console.log('Received values of form: ', values);
    });
  }

  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.handleDelete}>删除安全防范</Button>
        <Button type="primary" onClick={this.handleSubmit} loading={this.props.btnLoading || false}>保存修改内容</Button>
        <Button type="" onClick={this.handleCancel}>取消</Button>
      </div>
    )
  }

  render() {
    const {
      safeKeepDetailSearchResult,
    } = this.props;

    const {getFieldDecorator, getFieldError, isFieldValidating} = this.props.form;
    const infItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    };
    const config = {
      rules: [{type: 'object', required: true, message: 'Please select time!'}],
    };

    return (
      <Modal className='modal-body modal-header ' footer={this.footer()} title="安全防范详情" visible={this.state.visible}
             onOk={this.handleOk} onCancel={this.handleCancel}>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span="24">
              <FormItem {...infItemLayout} label="设施名称">
                {getFieldDecorator('ssmc', {initialValue: `${safeKeepDetailSearchResult.ssmc ? safeKeepDetailSearchResult.ssmc : ""}`})
                (
                  <Input type="text"/>
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="设施种类">
                {getFieldDecorator('sszl', {initialValue: `${safeKeepDetailSearchResult.sszl ? safeKeepDetailSearchResult.sszl : ""}`})
                (
                  <Select>
                    {this.sszlItem().map((v, i) => <Option value={v.code} key={v.code}>{v.sszl}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="投资总额">
                {getFieldDecorator('tzze', {initialValue: `${safeKeepDetailSearchResult.ssmc ? safeKeepDetailSearchResult.ssmc : ""}`})
                (
                  <Input type="text"/>
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="安装部位">
                {getFieldDecorator('azbw', {initialValue: `${safeKeepDetailSearchResult.ssmc ? safeKeepDetailSearchResult.ssmc : ""}`})
                (
                  <Input type="text"/>
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="联网情况">
                {getFieldDecorator('lwqk', {initialValue: `${safeKeepDetailSearchResult.ssmc ? safeKeepDetailSearchResult.ssmc : ""}`})
                (
                  <Select>
                    {this.lwqkItem().map((v, i) => <Option value={v.code} key={v.code}>{v.lwqk}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="安装时间">
                {getFieldDecorator('azsj', {initialValue: moment("2015-10-10")})
                (
                  <DatePicker showTime format="YYYY-MM-DD"/>
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="数量">
                {getFieldDecorator('sl', {initialValue: `${safeKeepDetailSearchResult.ssmc ? safeKeepDetailSearchResult.ssmc : ""}`})
                (
                  <Input type="text"/>
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="型号">
                {getFieldDecorator('xh', {initialValue: `${safeKeepDetailSearchResult.ssmc ? safeKeepDetailSearchResult.ssmc : ""}`})
                (
                  <Input type="text"/>
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="检修情况">
                {getFieldDecorator('jxqk', {initialValue: `${safeKeepDetailSearchResult.ssmc ? safeKeepDetailSearchResult.ssmc : ""}`})
                (
                  <Input type="text"/>
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="备注">
                {getFieldDecorator('bz', {initialValue: `${safeKeepDetailSearchResult.ssmc ? safeKeepDetailSearchResult.ssmc : ""}`})
                (
                  <Input type="text"/>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}