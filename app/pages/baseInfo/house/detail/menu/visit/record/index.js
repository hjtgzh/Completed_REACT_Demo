import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs } from 'antd'
import Panel from 'components/panel'

import Clue from 'components/clue'


const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
    })
)

// 声明组件  并对外输出
export default class record extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = { 
      activeTab: 'pop' ,
    }

  }

  // 组件已经加载到dom中
  componentDidMount() {
   
  }



  
  render() {
    return (
      <div>
        <p className="address_detail_ytt">{this.props.fullName}</p>
        <Clue type="room" clueType='recordFj' id={this.props.roomId} locationType='house'/>
      </div>
    )
  }
}
