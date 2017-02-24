/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Spin } from 'antd'
import RegisterList from './menu/registerList'
import RegisterOnceList from './menu/registerOnceList'
import SysRegisterList from './menu/sysRegisterList'
import CardHolderList from './menu/cardHolderList'
import DeclareList from './menu/declareList'

const TabPane = Tabs.TabPane

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
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
    this.state = {
      activeSub: 'registerList',
    }
    this._tabChange = this._tabChange.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {

  }

  _getTabMenus() {
    const menus = [
      { name: '登记、居住', url: 'registerList' },
      { name: '曾登记、居住', url: 'registerOnceList' },
      { name: '系统登记入口', url: 'sysRegisterList' },
      { name: '门禁卡持有人', url: 'cardHolderList' },
      { name: '社会申报', url: 'declareList' },
    ]
    return menus
  }

  _tabChange = (key) => {
    this.setState({ activeSub: key })
  }

  render() {
    const roomId = this.props.roomId
    const templateConfig = {
      registerList: (<RegisterList roomId={roomId} />),
      registerOnceList: (<RegisterOnceList roomId={roomId} />),
      sysRegisterList: (<SysRegisterList roomId={roomId} />),
      cardHolderList: (<CardHolderList roomId={roomId} />),
      declareList: (<DeclareList roomId={roomId} />),
    }

    return (
      <div className="nav-second-nextContent">
        <Spin spinning={false}>
          <p className="address_detail_ytt">{this.props.fullName}</p>
          <Tabs
            type="card"
            className="right-nav-bottom"
            defaultActiveKey="registerList"
            tabPosition="top"
            onChange={this._tabChange}
          >
            {
              this._getTabMenus().map((sub) => (<TabPane tab={sub.name} key={sub.url} />))
            }
          </Tabs>
          <div className="tab-main">
            { templateConfig[this.state.activeSub]}
          </div>
        </Spin>
      </div>
    )
  }
}

