/**
 * Created by 黄建停---实有房屋（房间）
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Tabs } from 'antd'
import Gform from 'components/gForm'
import Pagination from 'components/pagination/pagination'
import getConfigItems, { getItemByType } from 'utils/getGformConfigItems'
import {
  fetchRoomCounts,
  fetchRoomCheckList,
  updateHouseCheckListQuery,
  resetHouseCheckListQuery } from 'actions/house'
import HouseRoomTypeList from './houseRoom/houseRoomTypeList'
import HouseRoomMapList from './houseRoom/houseRoomMap'

const TabPane = Tabs.TabPane;
// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    roomCountsResult: state.roomCountsResult,
    roomCheckSearchResult: state.roomCheckSearchResult,
    amList: state.amList,
  })
)

// 声明组件  并对外输出
export default class roomCheckList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeSub: 'houseRoomTypeList',
      currentPage: 1,
      pageSize: 10,
      addNewAddress: false,
      exportData: false,
    }
    this.initReqNum = {
      xzqhid: '',
      gxdwid: sessionStorage.getItem('divisionid'),
    }
    this.requsetBody = {
      page: 1,
      pageSize: 10,
    }
    this.requsetHead = {}
    this._handleSubmit = this._handleSubmit.bind(this)
    this.cacheSearch = this.cacheSearch.bind(this)
    this._clear = this._clear.bind(this)
    this._typeChange = this._typeChange.bind(this)
    this.gFormSubmit = this.gFormSubmit.bind(this)
    this.getStatisticsNum = this.getStatisticsNum.bind(this)
    this.pageSizeChange = this.pageSizeChange.bind(this)
    this.pageChange = this.pageChange.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    // this.props.dispatch(fetchRoomCheckList({ currentPage: 1 }))
    getConfigItems(this, {
      XZQH: '',
      GXDW: sessionStorage.getItem('divisionid'),
      FWXZ: '',
    })
  }

  // page改变的调用
  pageChange(pageNo) {
    // console.log(currentPage);
    // page改变时，重新获取新的数据
    this.setState({ currentPage: pageNo })
    this.requsetBody = { ...this.requsetBody, pageNo }
    this.props.dispatch(fetchRoomCheckList(this.requsetBody))
    // this.setState({
    //   currentPage: currentPage
    // })
  }

  // pageSize改变的调用
  pageSizeChange(page, pageSize) {
    // console.log(pageSize)
    // pageSize改变时，重新获取新的数据
    this.setState({ pageSize, currentPage: 1 })
    this.requsetBody = { ...this.requsetBody, pageNo: 1, pageSize }
    this.props.dispatch(fetchRoomCheckList(this.requsetBody))
    // this.setState({
    //   pageSize,
    //   currentPage: 1
    // })
  }

  componentWillMount() {
    if (global.$GLOBALCONFIG.tabCache['/house/houseRoomList']) {
      this.setState({ activeSub: global.$GLOBALCONFIG.tabCache['/house/houseRoomList'].val })
    }
  }

  // 点击搜索按钮的回调事件
  _handleSubmit(query, currentPage) {
    this.props.dispatch(fetchRoomCheckList({ ...query, currentPage: currentPage }))
  }

  // 重置搜索条件
  _clear() {
    // this.props.dispatch(resetAmList())
    this.props.dispatch(resetHouseCheckListQuery())
  }

  // 列表与地图模式切换的回调函数
  _typeChange(key) {
    this.setState({ activeSub: key })
    const tab = { key: '/house/houseRoomList', val: key }
    global.$GLOBALCONFIG.tabCache['/house/houseRoomList'] = tab
  }

  // 缓存更新
  cacheSearch(item) {
    this.props.dispatch(updateHouseCheckListQuery(item))
  }

  // 筛选条件组件调用
  gFormConfig() {
    const { config } = this.props
    return [
      {
        sort: 'superSelect',
        label: '行政区划',
        items: config.XZQH,
        key: 'xzqh',
        numResKey: 'xzqh',
        numReqKey: 'xzqhdm',
        needNum: true,
        needMulti: true,
        needArrowIcon: true,
      },
      {
        sort: 'superSelect',
        label: '管辖单位',
        items: config.GXDW,
        key: 'gxdw',
        numResKey: 'gxdw',
        numReqKey: 'gxdwdm',
        needNum: true,
        needMulti: true,
        needArrowIcon: true,
      },
      {
        sort: 'superSelect',
        label: '房屋性质',
        items: config.FWXZ,
        key: 'fwxz',
        numResKey: 'fwxz',
        numReqKey: 'fwxzid',
        needNum: true,
        needMulti: true,
        needArrowIcon: true,
      },
    ]
  }

  // 搜索区域点击提交事件
  gFormSubmit(query) {
    // console.log(query)
    this.setState({ currentPage: query.page, pageSize: query.pageSize })
    const temp = {}
    temp.keyword = query.keyword
    temp.xzqhdm = getItemByType(query.xzqh)
    temp.gxdwdm = getItemByType(query.gxdw) || sessionStorage.getItem('divisionid')
    temp.fwxz = getItemByType(query.fwxz)
    // temp.dzlx=getItemByType(query.dzlx)
    // temp.dabd=getItemByType(query.dabd)
    temp.pageNo = query.page
    temp.pageSize = query.pageSize
    this.requsetBody = { ...this.requsetBody, ...temp }
    // console.log(this.requsetBody)
    this.props.dispatch(fetchRoomCheckList(this.requsetBody))
  }

  // 获取统计值
  getStatisticsNum(currentSelected) {
    this.requsetHead = { ...currentSelected }
    this.props.dispatch(fetchRoomCounts(this.requsetHead))
  }

  render() {
    const {
      roomCountsResult,
      roomCheckSearchResult,
      } = this.props
    // console.log(roomCountsResult)
    // 暂时用假数据来模拟列表项
    const templateConfig = {
      houseRoomTypeList: (<HouseRoomTypeList
        roomCheckSearchResult={roomCheckSearchResult} loading={roomCheckSearchResult.loading}
      />),
      houseRoomMapList: (<HouseRoomMapList
        roomCheckSearchResult={roomCheckSearchResult} loading={roomCheckSearchResult.loading}
      />),
    }
    return (
      <div className="nav-second-nextContent hjt-roomList">
        <Gform
          gFormConfig={this.gFormConfig()}
          gFormSubmit={this.gFormSubmit}
          nums={roomCountsResult || {}}
          loading={roomCountsResult.loading || this.state._requestLoading}
          getStatisticsNum={this.getStatisticsNum}
          cacheKey="roomCheckList"
          totalCount={roomCheckSearchResult.totalCount || 0}
          initParam={this.initReqNum}
          page={this.state.currentPage}
          pageSize={this.state.pageSize}
        />
        <div className="gform-next-div">
          <Tabs
            defaultActiveKey={this.state.activeSub}
            tabPosition="top"
            onChange={this._typeChange}
            className="list-map-tabs"
          >
            <TabPane tab="列表" key="houseRoomTypeList" />
            <TabPane tab="地图" key="houseRoomMapList" />
          </Tabs>
          <div className="tab-main tdLeft-icon">
            {templateConfig[this.state.activeSub]}
            <div className="ability-button">
              {/* 新增地址-弹窗*/}
              <Button >
                <Link className="peopleDetail" to={'/house$/newAddress'}>新增地址</Link>
              </Button>
              <Pagination
                totalCount={roomCheckSearchResult.totalCount}
                onShowSizeChange={this.pageSizeChange}
                onChange={this.pageChange}
                currentPage={this.state.currentPage}
                pageSize={this.state.pageSize}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
