/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Spin } from 'antd'
import Panel from 'components/panel'
import { updateTabList } from 'actions/tabList'
import UnitCount from './unitCount'
import PersonalCount from './personalCount'
import './style.css'

const TabPane = Tabs.TabPane;
const submenu = [
  { name: '单位统计', url: 'unitCount' },
  { name: '个人统计', url: 'personalCount' },
]

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
  })
)

// 声明组件  并对外输出
export default class apppop extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeSub: 'unitCount',
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '实有人口',
        key: '/apppop$',
      }))
    }
  }

  componentWillMount() {
    if ($GLOBALCONFIG.tabCache['/apppop$']) {
      this.setState({ activeSub: $GLOBALCONFIG.tabCache['/apppop$'].val })
    }
  }

  _getTabMenus() {
    const menu = []
    // 这里没有遍历整个菜单列表是考虑到可能的权限
    menu.push(submenu[0])
    menu.push(submenu[1])
    return menu
  }

  _tabChange = (key) => {
    this.setState({ activeSub: key })
    const tab = { key: '/apppop$', val: key }
    $GLOBALCONFIG.tabCache['/apppop$'] = tab
  }

  render() {
    const templateConfig = {
      unitCount: (<UnitCount />),
      personalCount: (<PersonalCount />),
    }
    return (
      <Panel>
        <Spin spinning={false}>
          <Tabs
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
