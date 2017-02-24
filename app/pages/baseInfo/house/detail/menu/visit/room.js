import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin, Tabs } from 'antd'
// import TagAndButton from 'components/detailContent/tagAndButton'
import {fetchFullName} from 'actions/houseVisitPop'
import { updateTabList } from 'actions/tabList'
import { room_menu } from 'utils/config'
import Panel from 'components/panel'

import Address from './address'
import Pop from './pop'
import Company from './company'
import Cases from './cases'
import Record from './record'
import Log from './log'


const TabPane = Tabs.TabPane

@connect(
    (state) => ({
      config: state.config,
      registerFullNameSearchResult:state.registerFullNameSearchResult,
    })
)
export default class houseDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { activeSub: 'address'}
  }

  componentDidMount() {
    // debugger
    const houseId = this.props.houseId || this.props.params.houseId || 1
    const roomId = this.props.roomId || this.props.params.roomId || 1
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: `房间详情`,
        key: `/house$/room/${houseId}/${roomId}`,
      }))
      this.props.dispatch(fetchFullName({id: roomId}))
    }

  }

  componentWillMount() {
    const houseId = this.props.houseId || this.props.params.houseId || 1
    const roomId = this.props.roomId || this.props.params.roomId || 1
    if($GLOBALCONFIG.tabCache[`/room/${houseId}/${roomId}`]){
      this.setState({activeSub: $GLOBALCONFIG.tabCache[`/room/${houseId}/${roomId}`].val})
    }
    this.props.dispatch(fetchFullName({id: roomId}))
  }

  componentWillReceiveProps(nextProps) {
    /*const houseId = this.props.houseId || this.props.params.houseId
    const nextShopId = nextProps.houseId || nextProps.params.houseId

    if (nextHouseId !== houseId) {
      this.props.dispatch(fetchHouseDetail({ houseId: nextHouseId}))
    }*/
    if(nextProps.params.roomId!==this.props.params.roomId){
      const houseId = nextProps.houseId || nextProps.params.houseId || 1
      const roomId = nextProps.roomId || nextProps.params.roomId || 1
      if (nextProps.params) {
        // 若非嵌套，则执行
        this.props.dispatch(updateTabList({
          title: `房间详情`,
          key: `/house$/room/${houseId}/${roomId}`,
        }))
      }
      if($GLOBALCONFIG.tabCache[`/room/${houseId}/${roomId}`]){
        this.setState({activeSub: $GLOBALCONFIG.tabCache[`/room/${houseId}/${roomId}`].val})
      }else{
        this.setState({activeSub: "address"})
      }
      this.props.dispatch(fetchFullName({id: roomId}))
    }
  }

  _getTabMenus(){
    const menus = []
    menus.push(room_menu[0])
    menus.push(room_menu[1])
    menus.push(room_menu[2])
    menus.push(room_menu[3])
    menus.push(room_menu[4])
    menus.push(room_menu[5])
    return menus
  }
  _tabChange = (key) => {
    this.setState({ activeSub: key })
    const houseId = this.props.houseId || this.props.params.houseId || 1
    const roomId = this.props.roomId || this.props.params.roomId || 1
    const tab = {key: `/room/${houseId}/${roomId}`, val: key}
    $GLOBALCONFIG.tabCache[`/room/${houseId}/${roomId}`] = tab
  }

  render() {
    const { registerFullNameSearchResult } = this.props
    const houseId = this.props.houseId || this.props.params.houseId || 1
    const roomId = this.props.roomId || this.props.params.roomId || 1
    let fullName=registerFullNameSearchResult.name;
    const templateConfig = {
      address: (<Address houseId={houseId} roomId={roomId} fullName={fullName}/>),
      pop: (<Pop houseId={houseId} roomId={roomId} fullName={fullName} />),
      company: (<Company houseId={houseId} roomId={roomId} fullName={fullName}/>),
      cases: (<Cases houseId={houseId} roomId={roomId} fullName={fullName}/>),
      record: (<Record houseId={houseId} roomId={roomId} fullName={fullName}/>),
      log: (<Log houseId={houseId} roomId={roomId} fullName={fullName} />),
    }

    return (
      <Panel>
        <Spin spinning={false}>
          <Tabs 
            defaultActiveKey={this.state.activeSub}
            tabPosition="top" 
            onChange={this._tabChange}
            className="right-nav-second"
            activeKey={this.state.activeSub}
          >
            {
              this._getTabMenus().map((sub) => (
                <TabPane tab={sub.name} key={sub.url}>
                  
                </TabPane>
              ))
            }
          </Tabs>
          <div className="tab-main">
            { templateConfig[this.state.activeSub]}
          </div>
        </Spin>
      </Panel>
    )
  }
}
