/*
* creator: 汤俊 2016-11-10 11:30
* editor: 汤俊 2017-2-10 14:05
*/

import React, { Component } from 'react'
import { Link } from 'react-router'
import { Tabs, Button, Spin } from 'antd'
import { connect } from 'react-redux'
import {
  fetchVisitContent,
  fetchVisitBuildingCount,
  fetchVisitUniteCount } from 'actions/house'
  
import 'style/visit.css'

const TabPane = Tabs.TabPane

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    fetchVisitConResult: state.fetchVisitConResult,
    fetchBuildingCountResult: state.fetchBuildingCountResult,
    fetchUniteCountResult: state.fetchUniteCountResult,
  })
)

export default class Check extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: "",
      showCount: false,
      countLoading: false,
    }
    this.bldid = 1
    this.countObj = {}
    this.fwzt = {
      1: { title: '自住', colorClass: 'zzClass' },
      2: { title: '出租', colorClass: 'czClass' },
      3: { title: '群租', colorClass: 'qzClass' },
      4: { title: '空置', colorClass: 'kzClass' },
      5: { title: '单位', colorClass: 'dwClass' },
      6: { title: '落户待查', colorClass: 'dcClass' },
      7: { title: '自住兼出租', colorClass: 'zcClass' },
      8: { title: '宿舍', colorClass: 'ssClass' },
    }
    this.onChange = this.onChange.bind(this)
    this.showCount = this.showCount.bind(this)
    this.buildCountObj = this.buildCountObj.bind(this)
    this.buildTitle = this.buildTitle.bind(this)
  }

  componentDidMount() {
    //this.props.dispatch(fetchVisitContent({ bldid: this.bldid }))
    //隐藏楼幢，获取房屋信息默认选中第一个tab
    const _self = this
    this.props.dispatch(fetchVisitContent({ bldid: this.bldid },(result) =>{
      const activeKey = result.data.list.length > 1? result.data.list[1].dy : ''
      _self.setState({activeKey : activeKey})
    }))
  }

  // props状态更新回调
  componentWillReceiveProps(nextProps) {
    const _self = this
    if (this.props.fetchBuildingCountResult !== nextProps.fetchBuildingCountResult) {
      this.setState({ countLoading: false })
    } else if (this.props.fetchUniteCountResult !== nextProps.fetchUniteCountResult) {
      this.setState({ countLoading: false })
    }else if(this.props.houseId !== nextProps.houseId){
      //this.props.dispatch(fetchVisitContent({ bldid: nextProps.houseId }))
      this.props.dispatch(fetchVisitContent({ bldid: nextProps.houseId },(result) =>{
        const activeKey = result.data.list.length > 1? result.data.list[1].dy : ''
        _self.setState({activeKey : activeKey})
      }))
    }
  }
  
  //tab切换
  onChange(activeKey) {
    this.setState({ activeKey: activeKey, showCount: false });
  }

  // 显示统计值
  showCount(e) {
    const bldid = this.bldid
    const dy = this.state.activeKey
    if (!this.state.showCount) {
      this.setState({ countLoading: true })
      if (dy === '-3') {
        this.props.dispatch(fetchVisitBuildingCount({ bldid: bldid }, (result) => {
          this.countObj = { bldid: result.data.ryCount }
          this.setState({ countLoading: false, showCount: true })
        }))
      } else {
        this.props.dispatch(fetchVisitUniteCount({ bldid: bldid, dy: dy }, (result) => {
          this.countObj = this.buildCountObj(result.data.list)
          this.setState({ countLoading: false, showCount: true })
        }))
      }
    } else {
      this.setState({ showCount: false })
    }
  }

  // 处理房间统计数据
  buildCountObj(list) {
    const countObj = {}
    list.map((unite) => {
      unite.floors.map((floor) => {
        floor.rooms.map((room) => {
          if (room.fjid) {
            countObj[room.fjid] = room.ryCount
          }
        })
      })
    })
    return countObj
  }

  // 房屋状态title
  buildTitle() {
    const titleArr = []
    const fwzt = this.fwzt
    for (let zt in fwzt) {
      if (fwzt.hasOwnProperty(zt)) {
        titleArr.push(
          <div key={zt} className="dot-a">
            <span className={`dot ${fwzt[zt].colorClass || ''}`} />
            <a>{fwzt[zt].title}</a>
          </div>
        )
      }
    }
    return titleArr
  }

  render() {
    this.bldid = this.props.houseId || this.props.params.houseId || 1
    const _self = this
    const { fetchVisitConResult } = this.props
    const title = this.buildTitle()
    /*const content = fetchVisitConResult.list.map(unite => (
      <TabPane tab={unite.dyjc} key={String(unite.dy)} className="unite-content">
        {
          unite.floors.map((floor, fIndex) => (
          (
            <ul className="floor" key={fIndex}>
              {
                floor.rooms.map((room, rIndex) => (
                  <li className="room-content" key={rIndex}>
                    <Link to={unite.dy === '-3' ?
                          `/house$Detail/${_self.bldid}` : `/house$/room/${_self.bldid}/${room.fjid}`}>
                      <span className={`room-name ${(_self.fwzt[room.fjzt] || {}).colorClass || '' }`}>
                        {room.roomname}
                      </span>
                      { _self.state.showCount ?
                        <span className="room-counts">
                          <p>
                            <em>常:&nbsp;{(_self.countObj[room.fjid] || {}).czCount || 0}</em>
                            <em>暂:&nbsp;{(_self.countObj[room.fjid] || {}).zzCount || 0}</em>
                            <em>外:&nbsp;{(_self.countObj[room.fjid] || {}).jwCount || 0}</em>
                            <em className="imp-count">重:&nbsp;{(_self.countObj[room.fjid] || {}).zdCount || 0}</em>
                          </p>
                          <p>
                            <em>总:&nbsp;{(_self.countObj[room.fjid] || {}).jzCount || 0}</em>
                            <em>企:&nbsp;{(_self.countObj[room.fjid] || {}).dpCount || 0}</em>
                            <em>线索:&nbsp;{(_self.countObj[room.fjid] || {}).jsCount || 0}</em>
                          </p>
                        </span> : null
                      }
                    </Link>
                  </li>
                ))
              }
            </ul>
          )
          ))
        }
      </TabPane>
    ))*/
    //隐藏楼幢
    const content = fetchVisitConResult.list.map(unite => {
      if (unite.dy !== "-3") {
        return <TabPane tab={unite.dyjc} key={String(unite.dy)} className="unite-content">
          {
            unite.floors.map((floor, fIndex) => (
            (
              <ul className="floor" key={fIndex}>
                {
                  floor.rooms.map((room, rIndex) => (
                    <li className="room-content" key={rIndex}>
                      <Link to={unite.dy === '-3' ?
                            `/house$Detail/${_self.bldid}` : `/house$/room/${_self.bldid}/${room.fjid}`}>
                        <span className={`room-name ${(_self.fwzt[room.fjzt] || {}).colorClass || '' }`}>
                          {room.roomname}
                        </span>
                        { _self.state.showCount ?
                          <span className="room-counts">
                            <p>
                              <em>常:&nbsp;{(_self.countObj[room.fjid] || {}).czCount || 0}</em>
                              <em>暂:&nbsp;{(_self.countObj[room.fjid] || {}).zzCount || 0}</em>
                              <em>外:&nbsp;{(_self.countObj[room.fjid] || {}).jwCount || 0}</em>
                              <em className="imp-count">重:&nbsp;{(_self.countObj[room.fjid] || {}).zdCount || 0}</em>
                            </p>
                            <p>
                              <em>总:&nbsp;{(_self.countObj[room.fjid] || {}).jzCount || 0}</em>
                              <em>企:&nbsp;{(_self.countObj[room.fjid] || {}).dpCount || 0}</em>
                              <em>线索:&nbsp;{(_self.countObj[room.fjid] || {}).jsCount || 0}</em>
                            </p>
                          </span> : null
                        }
                      </Link>
                    </li>
                  ))
                }
              </ul>
            )
            ))
          }
        </TabPane>
      }
    })
    return (
      <div className="visit-content nav-second-nextContent">
         <Spin tip="Loading..." spinning={fetchVisitConResult.loading}>
          <div className="detail-box">
            <div className="dot-list">
              {title}
            </div>
          </div>
          <Tabs
            className="list-tabs"
            hideAdd
            onChange={this.onChange}
            type="line"
            activeKey={String(this.state.activeKey)}
          >
            {content}
          </Tabs>
          <div className="ability-button floor-ability-button">
            { fetchVisitConResult.list.length ?
              <Button className="btn-left"
                loading={this.state.countLoading}
                onClick={this.showCount}>
                统计值
              </Button> : null
            }
          </div>
        </Spin>
      </div>
    )
  }
}
