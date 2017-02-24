/**
 * Created by 黄建停---实有房屋(新增地址)---地图
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
// 引入地图
import AmapComponent from 'components/map/amap'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    houseCheckSearchQuery: state.houseCheckSearchQuery,
    houseCheckSearchResult: state.houseCheckSearchResult,
  })
)

// 声明组件  并对外输出
export default class houseAddrTypeList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  getLocation(evt) {
    // console.log(evt)
  }
  render() {
    return (
      <div className="nav-second-nextContent hjt-addressMap">
        <AmapComponent getLocation={this.getLocation} />
        <div className="ability-button">
          <Button type="" >保存</Button>
          <Button type="" >取消</Button>
        </div>
      </div>
    )
  }
}

