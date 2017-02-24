import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Spin } from 'antd'
// import Panel from 'components/panel'

import { updateTabList } from 'actions/tabList'
import {address_list_submenu} from 'utils/config'

import Count from './address/count'
import DivisionManage from './address/divisionManage'
import DeclarManage from './address/declarManage'

const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
    })
)

// 声明组件  并对外输出
export default class house extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = { activeSub: 'count'}
  }

  // 组件已经加载到dom中
  componentDidMount() {
  }

  componentWillMount() {
    if($GLOBALCONFIG.tabCache[`/house/addressList`]){
      this.setState({activeSub: $GLOBALCONFIG.tabCache[`/house/addressList`].val})
    }
  }

  _getTabMenus(){
    const menu = []
    // 这里没有遍历整个菜单列表是考虑到可能的权限
    menu.push(address_list_submenu[0])
    menu.push(address_list_submenu[1])
    menu.push(address_list_submenu[2])
    return menu
  }
  _tabChange = (key) => {
    this.setState({ activeSub: key })
    const tab = {key: `/house/addressList`, val: key}
    $GLOBALCONFIG.tabCache[`/house/addressList`] = tab
  }

  
  render() {
    let { loading } = this.props.houseDetailResult || false
    if(loading == 'undefined'){
      loading = false
    }
    // debugger
    const { dispatch } = this.props
    const houseId = this.props.houseId || this.props.params.houseId || 1
    const templateConfig = {
      count: (<Count houseId={1} />),
      divisionManage: (<DivisionManage houseId={1} />),
      declarManage: (<DeclarManage houseId={1} />),
    }


    return (
      <div className="nav-second-nextContent">
        <Spin spinning={ false }>
          <Tabs 
            defaultActiveKey={this.state.activeSub}
            className="right-nav-third"
            tabPosition="top" 
            onChange={this._tabChange} >
            {
              this._getTabMenus().map((sub) => (
                <TabPane tab={sub.name} key={sub.url}>
                 
                </TabPane>
              ))
            }
          </Tabs>
            <div className="tab-main">
              {templateConfig[this.state.activeSub]}
            </div>
        </Spin>
      </div>
    )
  }
}
