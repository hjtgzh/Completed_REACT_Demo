/**
 * Created by 叶婷婷
 * 语法检查:3 errors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Spin } from 'antd'
import Panel from 'components/panel'
import { HOUSEHOLD_SUB_MENUS } from 'utils/config'
import {
  updateTabList,
} from 'actions/tabList'
import HouseholdManagement from './detail/householdManagement'
import HouseholdStatistics from './detail/householdStatistics'

const TabPane = Tabs.TabPane;

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
  })
)

// 声明组件  并对外输出
export default class household extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeSub: 'householdManagement',
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '户号管理',
        key: '/household$',
      }))
    }
  }

  // 组件加载前
  componentWillMount() {
    if ($GLOBALCONFIG.tabCache['/household']) {
      this.setState({ activeSub: $GLOBALCONFIG.tabCache['/household'].val })
    }
  }

  // 菜单
  _getTabMenus() {
    const menu = [];
    // 这里没有遍历整个菜单列表是考虑到可能的权限
    menu.push(HOUSEHOLD_SUB_MENUS[0]);
    menu.push(HOUSEHOLD_SUB_MENUS[1]);
    return menu;
  }

  // 切换菜单
  _tabChange = (key) => {
    this.setState({ activeSub: key });
    const tab = { key: '/household', val: key };
    $GLOBALCONFIG.tabCache['/household'] = tab
  }

  render() {
    const templateConfig = {
      householdManagement: (<HouseholdManagement />),
      householdStatistics: (<HouseholdStatistics />),
    };

    return (
      <Panel>
        <Spin spinning={false}>
          <Tabs
            defaultActiveKey={this.state.activeSub}
            tabPosition="top"
            onChange={this._tabChange}
            className="right-nav-second"
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
