import React, { Component } from 'react'
import { connect } from 'react-redux'
import {hashHistory} from 'react-router'
import { Spin, Tabs, message} from 'antd'
// import TagAndButton from 'components/detailContent/tagAndButton'
import { fetchRoomName } from 'actions/house'
import { updateTabList,deleteTabFromList } from 'actions/tabList'
import { house_detail_menu } from 'utils/config'
import Panel from 'components/panel'

import Location from './menu/location'
import Pic from './menu/pic'
import Floor from './menu/floor'
import Visit from './menu/visit'
import Record from './menu/record'
import Log from './menu/log'


const TabPane = Tabs.TabPane

@connect(
    (state) => ({
      config: state.config,
      roomNameResult: state.roomNameResult,
    })
)
export default class houseDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      activeSub: 'location'
    }
    this.deleteTab = this.deleteTab.bind(this)
    this.getBuildingName = this.getBuildingName.bind(this)
  }

  componentDidMount() {
    const houseId = this.props.houseId || this.props.params.houseId || 1
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: `房屋详情`,
        key: `/house$Detail/${houseId}`,
      }))
    }
    this.getBuildingName(houseId)
  }
  
  componentWillMount(){
    const houseId = this.props.houseId || this.props.params.houseId || 1
    if($GLOBALCONFIG.tabCache[`/houseDetail/${houseId}`]){
      this.setState({activeSub: $GLOBALCONFIG.tabCache[`/houseDetail/${houseId}`].val})
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.params.houseId !== nextProps.params.houseId){
      const houseId = nextProps.houseId || nextProps.params.houseId || 1
      if (nextProps.params) {
        // 若非嵌套，则执行
        this.props.dispatch(updateTabList({
          title: `房屋详情`,
          key: `/house$Detail/${houseId}`,
        }))
      }
      if($GLOBALCONFIG.tabCache[`/houseDetail/${houseId}`]){
        this.setState({activeSub: $GLOBALCONFIG.tabCache[`/houseDetail/${houseId}`].val})
      }
      this.getBuildingName(houseId)
    }
  }

  getBuildingName(houseId){
    this.props.dispatch(fetchRoomName({"buildingId" : houseId}))
  }

  deleteTab(){
    const houseId = this.props.houseId || this.props.params.houseId || 1
    this.props.dispatch(deleteTabFromList({
      targetKey: `/house$Detail/${houseId}`
    }))
    hashHistory.push('/house$')
    message.success('删除成功')
  }
  _getTabMenus(){
    const menus = []
    menus.push(house_detail_menu[0])
    menus.push(house_detail_menu[1])
    menus.push(house_detail_menu[2])
    menus.push(house_detail_menu[3])
    menus.push(house_detail_menu[4])
    menus.push(house_detail_menu[5])
    return menus
  }
  _tabChange = (key) => {
    this.setState({ activeSub: key })
    const houseId = this.props.params.houseId || 1
    const tab = {key: `/houseDetail/${houseId}`, val: key}
    $GLOBALCONFIG.tabCache[`/houseDetail/${houseId}`] = tab
  }

  render() {
    const { roomNameResult } = this.props
    const { dispatch } = this.props
    const houseId = this.props.houseId || this.props.params.houseId || 1
    const templateConfig = {
      location: (<Location houseId={houseId} deleteTab={this.deleteTab} updataHouseName={this.getBuildingName}/>),
      pic: (<Pic houseId={houseId} />),
      floor: (<Floor houseId={houseId} />),
      visit: (<Visit houseId={houseId} />),
      record: (<Record houseId={houseId} />),
      log: (<Log houseId={houseId} />),
    }

    return (
      <Panel>
        <Spin spinning={false}>
          <Tabs 
            defaultActiveKey={this.state.activeSub} 
            activeKey={this.state.activeSub}
            tabPosition="top" 
            onChange={this._tabChange} 
            className="right-nav-second">
            {
              this._getTabMenus().map((sub) => (
                <TabPane tab={sub.name} key={sub.url}>
                  
                </TabPane>
              ))
            }
          </Tabs>
          <div className="tab-main">
            <div className="title-wrap">{roomNameResult.bzdz}</div>
            { templateConfig[this.state.activeSub] }
          </div>  
        </Spin>
      </Panel>
    )
  }
}
