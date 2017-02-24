/**
 * Created by 叶婷婷
 * 语法检查:3 errors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Spin } from 'antd'
import Panel from 'components/panel'
import {
  QRCODE_SUB_MENUS,
} from 'utils/config'
import {
  updateTabList,
} from 'actions/tabList'
import QrcodeStatistics from './qrcodeTabs/qrcodeStatistics'
import QrcodeManagement from './qrcodeTabs/qrcodeManagement'
import './style.css'

const TabPane = Tabs.TabPane;

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
  })
)

// 声明组件  并对外输出
export default class qrcode extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props);
    this.state = {
      activeSub: 'qrcodeManagement',
    }
  }

  // 组件尚未加载
  componentWillMount() {
    if ($GLOBALCONFIG.tabCache['/qrcode']) {
      this.setState({ activeSub: $GLOBALCONFIG.tabCache['/qrcode'].val })
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '二维码管理',
        key: '/qrcode$',
      }))
    }
  }


  // 导航条
  _getTabMenus() {
    const menu = []
    menu.push(QRCODE_SUB_MENUS[0])
    menu.push(QRCODE_SUB_MENUS[1])
    return menu;
  }

  // 切换导航条
  _tabChange = (key) => {
    this.setState({ activeSub: key });
    const tab = { key: '/qrcode', val: key };
    $GLOBALCONFIG.tabCache['/qrcode'] = tab
  }

  render() {
    const templateConfig = {
      qrcodeManagement: (<QrcodeManagement />),
      qrcodeStatistics: (<QrcodeStatistics />),
    }

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
