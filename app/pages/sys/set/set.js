/**
 * Created by 江夏云 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs } from 'antd'
import Panel from 'components/panel'
import { set_submenu } from 'utils/config'
import { updateTabList } from 'actions/tabList'
import User from './manage/userManage'
import Role from './manage/roleManage'
import Module from './manage/moduleManage'
import './style.css'

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
    this.state = { activeSub: 'user' }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '用户管理',
        key: '/set$',
      }))
    }
  }

  componentWillMount() {
    if ($GLOBALCONFIG.tabCache['/set']) {
      this.setState({ activeSub: $GLOBALCONFIG.tabCache['/set'].val })
    }
  }

  _getTabMenus() {
    const menu = []
    // 这里没有遍历整个菜单列表是考虑到可能的权限
    menu.push(set_submenu[0])
    menu.push(set_submenu[1])
    menu.push(set_submenu[2])
    return menu
  }

  _tabChange = (key) => {
    this.setState({ activeSub: key })
    const tab = { key: '/set', val: key }
    $GLOBALCONFIG.tabCache['/set'] = tab
  }

  render() {
    const manageId = this.props.houseId || this.props.params.houseId || 1
    const templateConfig = {
      user: (<User manageId={1} />),
      role: (<Role manageId={1} />),
      module: (<Module manageId={manageId} />),
    }

    return (
      <Panel>
        <Tabs
          defaultActiveKey={this.state.activeSub}
          tabPosition="top"
          onChange={this._tabChange}
          className="right-nav-second "
        >
          {
            this._getTabMenus().map((sub) => (
              <TabPane tab={sub.name} key={sub.url} className="maTop-jxy" />
            ))
          }
        </Tabs>
        <div className="maTop-jxy main">
          { templateConfig[this.state.activeSub]}
        </div>
      </Panel>
    )
  }
}
