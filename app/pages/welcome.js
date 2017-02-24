/*
** creator: 杜显威  2016-11-10 11:30  创建js
** editor: 杜显威 2016-02-09 16:00 在头部添加文件修改记录
*/
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory, Link } from 'react-router'
import { Spin, message } from 'antd'
import { 
  fetchLogin, 
  loginResponse,
} from 'actions/common'
import './welcome.less'

@connect(
    (state, props) => ({
      config: state.config,
      loginResponse: state.loginResponse,
    })
)
export default class welcome extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = { 
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    const { location, children, loginResponse } = this.props
    return (
      <div className="welcome">
        <div className="content_right content_rightBg">
          {/*<div className="jcxx_bt">
            <p>宿迁市公安局</p>
            <p>派出所基础信息化</p>
            <p>V2.0</p>
          </div>*/}
          <div className="footer">
            <p>科技信息化局 浙江七巧板信息科技有限公司 联合研发</p>
          </div>
        </div>
      </div>
    )
  }
}
