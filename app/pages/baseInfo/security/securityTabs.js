/**
 * Created by 叶婷婷
 * 语法检查：6 errors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Spin } from 'antd'
import Panel from 'components/panel'

import { updateTabList } from 'actions/tabList'
import { SECURITY_SUB_MENUS } from 'utils/config'

import CaseReview from './detail/caseReview'
import CaseRecord from './detail/caseRecord'
import CaseLog from './detail/caseLog'

const TabPane = Tabs.TabPane;

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
  })
)

// 声明组件  并对外输出
export default class goodsTabs extends Component {
// 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = { activeSub: 'caseReview' }
    this.regular = {
      securityId: this.props.securityId || this.props.params.securityId || 1,
    }
  }

// 组件加载前
  componentWillMount() {
    if ($GLOBALCONFIG.tabCache[`/security$Tabs/${this.regular.securityId}`]) {
      this.setState({ activeSub: $GLOBALCONFIG.tabCache[`/security$Tabs/${this.regular.securityId}`].val })
    }
  }

// 父级页面传参发生变化时进行比较查询数据
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.securityId != this.props.params.securityId) {
      this.regular.securityId = nextProps.params.securityId;
      if (nextProps.params) {
// 若非嵌套，则执行
        this.props.dispatch(updateTabList({
          title: '治安详情',
          key: `/security$Tabs/${this.regular.securityId}`,
        }))
      }
      if ($GLOBALCONFIG.tabCache[`/security$Tabs/${this.regular.securityId}`]) {
        this.setState({ activeSub: $GLOBALCONFIG.tabCache[`/security$Tabs/${this.regular.securityId}`].val })
      } else {
        this.setState({ activeSub: 'caseReview' })
      }
    }
  }

// 组件已经加载到dom中
  componentDidMount() {
    if (this.props.params) {
// 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '治安详情',
        key: `/security$Tabs/${this.regular.securityId}`,
      })
      )
    }
  }

// 菜单
  _getTabMenus() {
    const menu = []
// 这里没有遍历整个菜单列表是考虑到可能的权限
    menu.push(SECURITY_SUB_MENUS[0])
    menu.push(SECURITY_SUB_MENUS[1])
    menu.push(SECURITY_SUB_MENUS[2])
    return menu
  }

// 切换菜单
  _tabChange = (key) => {
    this.setState({ activeSub: key })
    const tab = { key: `/security$Tabs/${this.regular.securityId}`, val: key }
    $GLOBALCONFIG.tabCache[`/security$Tabs/${this.regular.securityId}`] = tab
  }

  render() {
    const templateConfig = {
      caseReview: (<CaseReview securityId={this.regular.securityId} />),
      caseRecord: (<CaseRecord securityId={this.regular.securityId} />),
      caseLog: (<CaseLog securityId={this.regular.securityId} />),
    }

    return (
      <Panel>
        <Spin spinning={false}>
          <Tabs
            className="right-nav-second"
            defaultActiveKey={this.state.activeSub}
            activeKey={this.state.activeSub}
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
