import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs } from 'antd'
import {fetchJobListList} from 'actions/job'
import Panel from 'components/panel'
import Clue from 'components/clue'
//import './style.css'


const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    jobListSearchResult: state.jobListSearchResult,
  })
)

// 声明组件  并对外输出
export default class jobList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      exportData: false,
      activeTab: 'list' ,
      
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    // this.props.dispatch(fetchJobListList({ currentPage: 1, pageSize:10 }))
  }


  
  render() {
    const {
        //jobListSearchResult,
        //hasSubmitBtn,
        //hasResetBtn,
    } = this.props

    return (
      <Clue type="unit" clueType='recordDw' id={this.props.departmentId} locationType='group'/>
    )
  }
}
