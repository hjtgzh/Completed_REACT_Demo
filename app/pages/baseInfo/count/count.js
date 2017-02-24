import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs } from 'antd'
import { count_submenu } from 'utils/config'
import Panel from 'components/panel'
import { updateTabList } from 'actions/tabList'
import SecurityGuard from './securityGuard'
import CountForms from './countForms'
import Goods from './goods'
import './style.css'


const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
    })
)

// 声明组件  并对外输出
export default class count extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeSub: 'securityGuard'
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: `统计`,
        key: `/count`,
      }))
    }
  }

_getTabMenus() {
    const menu = []
    // 这里没有遍历整个菜单列表是考虑到可能的权限
    menu.push(count_submenu[0])
    menu.push(count_submenu[1])
    menu.push(count_submenu[2])
    return menu
  }

  _tabChange = (key) => {
    this.setState({activeSub: key})
  }
  
  render() {
    let { loading } = this.props.houseDetailResult || false
    if (loading == 'undefined') {
      loading = false
    }
    // debugger
    const { dispatch } = this.props
    const manageId = this.props.houseId || this.props.params.houseId || 1
    const templateConfig = {
      securityGuard: (<SecurityGuard manageId={1}/>),
      countForms: (<CountForms manageId={1}/>),
      goods: (<Goods manageId={manageId}/>),
    }

    return (
      <Panel>
        <Tabs tabPosition="top" onChange={this._tabChange}>
          {
            this._getTabMenus().map((sub) => (
              <TabPane tab={sub.name} key={sub.url} className="maTop-jxy">
                { templateConfig[this.state.activeSub]}
              </TabPane>
            ))
          }
        </Tabs>
      
      </Panel>
    )
  }
}
