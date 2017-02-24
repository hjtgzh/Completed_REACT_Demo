import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Spin } from 'antd'
import Panel from 'components/panel'
import './style.css'

import { updateTabList } from 'actions/tabList'
import { pop_submenu } from 'utils/config'

import Visit from './visit'
import Rely from './rely/rely'
import Tip from './tip'
import Local from './local'
import Flow from './flow'
import Abroad from './abroad'
import Data from './data'
import Job from './job'
import Old from './old'


const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
    })
)

// 声明组件  并对外输出
export default class pop extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = { activeSub: 'visit'}
  }

  // 组件已经加载到dom中
  componentDidMount() {
    const houseId = this.props.houseId || this.props.params.houseId || 1
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '实有人口',
        key:'/pop$',
      }))
    }
  }

  componentWillMount() {
    if($GLOBALCONFIG.tabCache[`/pop`]){
      this.setState({activeSub: $GLOBALCONFIG.tabCache[`/pop`].val})
    }
  }

  _getTabMenus(){
    const menu = []
    // 这里没有遍历整个菜单列表是考虑到可能的权限
    menu.push(pop_submenu[0])
    menu.push(pop_submenu[1])
    menu.push(pop_submenu[2])
    // menu.push(pop_submenu[3])
    // menu.push(pop_submenu[4])
    // menu.push(pop_submenu[5])
    // menu.push(pop_submenu[6])
    menu.push(pop_submenu[7])
    menu.push(pop_submenu[8])
    return menu
  }
  _tabChange = (key) => {
    this.setState({ activeSub: key })
    const tab = {key: `/pop`, val: key}
    $GLOBALCONFIG.tabCache[`/pop`] = tab
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
      visit: (<Visit houseId={1} />),
      rely: (<Rely houseId={1} />),
      tip: (<Tip houseId={houseId} />),
      local: (<Local houseId={houseId} />),
      flow: (<Flow houseId={houseId} />),
      // abroad: (<Abroad houseId={houseId} />),
      // data: (<Data houseId={houseId} />),
      job: (<Job houseId={houseId} />),
      old: (<Old houseId={houseId} />),
    }

    // console.log(this.state.activeSub);

    return (
      <Panel>
        <Spin spinning={ false }>
          <Tabs 
            defaultActiveKey={this.state.activeSub} 
            tabPosition="top" 
            onChange={this._tabChange} 
            className="right-nav-second">
            {
              this._getTabMenus().map((sub) => (
                <TabPane tab={sub.name} key={sub.url}>
                  
                </TabPane>
              ))
            }
          </Tabs>
          <div className="tab-main">
            { templateConfig[this.state.activeSub]}
          </div>
        </Spin>
      </Panel>
    )
  }
}
