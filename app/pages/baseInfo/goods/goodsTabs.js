/**
 * Created by 叶婷婷
 * 语法检查: 6 errors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Spin } from 'antd'
import Panel from 'components/panel'
import { GOODS_SUB_MENUS } from 'utils/config'
import {
  updateTabList,
} from 'actions/tabList'
import GoodsBasic from './detail/goodsBasic'
import GoodsPhoto from './detail/goodsPhoto'

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
    super(props);
    this.state = {
      activeSub: 'goodsBasic',
    }
    this.regular = {
      goodsId: this.props.goodsId || this.props.params.goodsId || 1,
    }
  }

  // 组件加载前
  componentWillMount() {
    if ($GLOBALCONFIG.tabCache[`/goods$Tabs/${this.regular.goodsId}`]) {
      this.setState({ activeSub: $GLOBALCONFIG.tabCache[`/goods$Tabs/${this.regular.goodsId}`].val })
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '物品详情',
        key: `/goods$Tabs/${this.regular.goodsId}`,
      }))
    }
  }

  // 父级页面传参发生变化时进行比较查询数据
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.goodsId != this.props.params.goodsId) {
      this.regular.goodsId = nextProps.params.goodsId;
      if (nextProps.params) {
        // 若非嵌套，则执行
        this.props.dispatch(updateTabList({
          title: '物品详情',
          key: `/goods$Tabs/${this.regular.goodsId}`,
        }))
      }
      if ($GLOBALCONFIG.tabCache[`/goods$Tabs/${this.regular.goodsId}`]) {
        this.setState({ activeSub: $GLOBALCONFIG.tabCache[`/goods$Tabs/${this.regular.goodsId}`].val })
      } else {
        this.setState({ activeSub: 'goodsBasic' })
      }
    }
  }

  // 导航条
  _getTabMenus() {
    const menu = [];
    // 这里没有遍历整个菜单列表是考虑到可能的权限
    menu.push(GOODS_SUB_MENUS[0]);
    menu.push(GOODS_SUB_MENUS[1]);
    return menu
  }

  // 切换详情和图片
  _tabChange = (key) => {
    this.setState({ activeSub: key })
    const tab = { key: `/goods$Tabs/${this.regular.goodsId}`, val: key }
    $GLOBALCONFIG.tabCache[`/goods$Tabs/${this.regular.goodsId}`] = tab
  };


  render() {
    const templateConfig = {
      goodsBasic: (<GoodsBasic goodsId={this.regular.goodsId} />),
      goodsPhoto: (<GoodsPhoto goodsId={this.regular.goodsId} />),
    };

    return (
      <Panel>
        <Spin spinning={false}>
          <Tabs
            defaultActiveKey={this.state.activeSub}
            activeKey={this.state.activeSub}
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
