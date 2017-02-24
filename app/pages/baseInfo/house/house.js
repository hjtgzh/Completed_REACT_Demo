/**
 * Created by 黄建停---实有房屋
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Spin } from 'antd'
import Panel from 'components/panel'
import { updateTabList } from 'actions/tabList'
import { houseSubmenu } from 'utils/config'
import HouseAddrList from './houseAddrList'
import HouseRoomList from './houseRoomList'
import AddressList from './addressList'

const TabPane = Tabs.TabPane;

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
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
    this.state = { activeSub: 'houseAddrList' }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '实有房屋',
        key: '/house$',
      }))
    }
  }
  componentWillMount() {
    if (global.$GLOBALCONFIG.tabCache['/house']) {
      this.setState({ activeSub: global.$GLOBALCONFIG.tabCache['/house'].val })
    }
  }

  //遍历整个菜单列表
  _getTabMenus() {
    const menu = []
    // 这里没有遍历整个菜单列表是考虑到可能的权限
    menu.push(houseSubmenu[0])
    menu.push(houseSubmenu[1])
    menu.push(houseSubmenu[2])
    return menu
  }

  //tab切换
  _tabChange = (key) => {
    this.setState({ activeSub: key })
    const tab = { key: '/house', val: key }
    global.$GLOBALCONFIG.tabCache['/house'] = tab
  }

  render() {
    let { loading } = this.props.houseDetailResult || false
    if (loading === 'undefined') {
      loading = false
    }
    const templateConfig = {
      houseAddrList: (<HouseAddrList houseId={1} />),
      houseRoomList: (<HouseRoomList houseId={1} />),
      addressList: (<AddressList houseId={1} />),
    }
    return (
      <Panel>
        <Spin spinning={false}>
          <Tabs
            className="right-nav-second"
            defaultActiveKey={this.state.activeSub}
            tabPosition="top"
            onChange={this._tabChange}
          >
            {
              this._getTabMenus().map((sub) => (
                <TabPane tab={sub.name} key={sub.url} />
              ))
            }
          </Tabs>
          <div className="tab-main">
            {templateConfig[this.state.activeSub]}
          </div>
        </Spin>
      </Panel>
    )
  }
}
