/*
 * creator：周美英 2016-11-10 10:30 创建js
 * editor:周美英 2017-2-13 10:30 在头部添加文件修改记录
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Spin } from 'antd'
import Panel from 'components/panel'
import { updateTabList } from 'actions/tabList'
import { DECLARE_SUB_MENUS } from 'utils/config'
import Management from './declareManagement/declareManagement'
import Count from './declareCount/declareCount'

const TabPane = Tabs.TabPane;
// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    declareListSearchResult: state.declareListSearchResult,
  })
)

// 声明组件  并对外输出
export default class declare extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeSub: 'declareManagement',
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '社会申报',
        key: '/declare$',
      }))
    }
  }

  componentWillMount() {
    if ($GLOBALCONFIG.tabCache['/declare']) {
      this.setState({ activeSub: $GLOBALCONFIG.tabCache['/declare'].val })
    }
  }

  _getTabMenus() {
    const menu = []
    // 这里没有遍历整个菜单列表是考虑到可能的权限
    menu.push(DECLARE_SUB_MENUS[0])
    menu.push(DECLARE_SUB_MENUS[1])
    return menu
  }
  _tabChange = (key) => {
    this.setState({ activeSub: key })
    const tab = { key: '/declare', val: key }
    $GLOBALCONFIG.tabCache['/declare'] = tab
  }
  render() {
    // const declareId=this.props.declareId || this.props.params.declareId || 1
    const templateConfig = {
      declareManagement: (<Management />),
      declareCount: (<Count />),
    }
    return (
      <Panel>
        <Spin spinning={false}>
          <Tabs
            defaultActiveKey={this.state.activeSub}
            onChange={this._tabChange}
            tabPosition="top"
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
