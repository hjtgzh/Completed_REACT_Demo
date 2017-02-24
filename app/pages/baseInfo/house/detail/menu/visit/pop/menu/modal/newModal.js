import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Select, Modal, Input } from 'antd'

const NewModal = React.createClass({
  getInitialState() {
    return { visible: this.props.visible };
  },

  showModal() {
    this.setState({
      visible: true,
    });
  },

	                                                                                componentWillReceiveProps(nextProps) {
		                                                                                if (this.state.visible !== nextProps.visible) {
			                                                                                this.setState({ 'visible': nextProps.visible })
		}
	},

  handleOk() {
    console.log('Clicked OK');
    this.setState({
      visible: false,
    });
  },

  handleCancel(e) {
    this.setState({
      visible: false,
    });
    this.props.onCancel()
  },
  render() {
    return (
      <div>
        <Modal className="sideModal foreignModal" title="新增人员" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <div>
            <label htmlFor="sfzh">身份证号:</label>
            <Input type="text" id="sfzh" placeholder="请输入身份证信息" />
            <Button type="ghost" onClick={this.handleReset}>查询</Button>
          </div>
          <div>
            <div className="pop-img-trf"><img src="123" alt="照片" /></div>
            <table>
              <tbody>
                <tr>
                  <td>姓名</td>
                  <td><span>sss</span></td>
                </tr>
                <tr>
                  <td>性别</td>
                  <td><span>sss</span></td>
                </tr>
                <tr>
                  <td>身份证号</td>
                  <td><span>sss</span></td>
                </tr>
                <tr>
                  <td>户籍地址</td>
                  <td><span>sss</span></td>
                </tr>
                <tr>
                  <td>人口类别</td>
                  <td><span>sss</span></td>
                </tr>
                <tr>
                  <td>登记状态</td>
                  <td><span>sss</span></td>
                </tr>
                <tr>
                  <td>重点人员</td>
                  <td><span>sss</span></td>
                </tr>
                <tr>
                  <td>前科</td>
                  <td><span>sss</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal>
      </div>
    );
  },
});
export default NewModal
