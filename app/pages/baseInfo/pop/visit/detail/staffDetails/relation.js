/**
 * Created by Administrator on 2016/11/24.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Popup from './relationModal'
import TypeList from '../../../../house/common/typeList'

import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Input
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const RELATION = Form.create()(React.createClass({

  getInitialState: function () {
    return {
      value: []
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  },
  handleChange: function (event) {
    /*setState 是一个异步方法，所以需要操作缓存当前值*/
    // this.refs.myInput.focus();


    console.log(event)
  },

  aler(){
    console.log(this.refs.myTextInput.value)
  },
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  },
  columns() {
    return [
      {
        title: '低慢小序号',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '低慢小名称',
        dataIndex: 'nowAddress',
        key: 'nowAddress',
      },
      {
        title: '持有人',
        dataIndex: 'division',
        key: 'division',
      },
      {
        title: '持有人身份证',
        dataIndex: 'institutions',
        key: 'institutions',
      },
      {
        title: '操作',
        dataIndex: 'policeName',
        key: 'policeName',
        render: function (text, record, index) {
          return (
            <span>
                <a className="detaul-a">解绑</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a className="detaul-a">增加操作人</a>
              </span>);
        },
      },
      {
        title: '详情',
        dataIndex: 'houseStatus',
        key: 'houseStatus',
        render: function (text, record, index) {
          return (
            <span>
                <a className="detaul-a">操作人</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a className="detaul-a">详情</a>
              </span>);
        },
      },
    ]
  },
  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    const value = this.state.value;


    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="身份证号"
          hasFeedback
        >
          {
            <span><Input placeholder='' onChange={this.handleChange}/><Button type="primary" htmlType="submit" className="detaulSearch">查询</Button></span>
          }
        </FormItem>
        <TypeList
          columns={this.columns()}
          dataSource={this.state.list}
        />
      </Form>
    );
  },
}));

export default RELATION;

