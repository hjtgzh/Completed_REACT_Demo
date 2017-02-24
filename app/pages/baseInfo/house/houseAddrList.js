/**
 * Created by 黄建停---实有房屋（地址）
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Tabs, message } from 'antd'
import Pagination from 'components/pagination/pagination'
import Gform from 'components/gForm'
import getConfigItems, { getItemByType } from 'utils/getGformConfigItems'
import { fetchBuildingCounts,
  fetchHouseCheckList,
  updateHouseCheckListQuery,
  resetHouseCheckListQuery } from 'actions/house'
import HouseAddrTypeList from './houseAddr/houseAddrTypeList'
import HouseAddrTypeMap from './houseAddr/houseAddrMap'

const TabPane = Tabs.TabPane;
// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    buildingCountsResult: state.buildingCountsResult,
    houseCheckSearchResult: state.houseCheckSearchResult,
    amList: state.amList,
  })
)

// 声明组件  并对外输出
export default class houseCheckList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeSub: 'houseAddrTypeList',
      currentPage: 1,
      pageSize: 10,
      addNewAddress: false,
      exportData: false,
      counts: '',
    }
    this.initReqNum = {
      xzqhid: '',
      gxdwid: sessionStorage.getItem('divisionid'),
    }
    this.requsetBody = {
      pageNo: 1,
      pageSize: 10,
    }
    this.requsetHead = {}
    this._handleSubmit = this._handleSubmit.bind(this)
    this.gFormSubmit = this.gFormSubmit.bind(this)
    this.getStatisticsNum = this.getStatisticsNum.bind(this)
    this.cacheSearch = this.cacheSearch.bind(this)
    this._clear = this._clear.bind(this)
    this._typeChange = this._typeChange.bind(this)
    this.pageSizeChange = this.pageSizeChange.bind(this)
    this.pageChange = this.pageChange.bind(this)
    this.exportData = this.exportData.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    // this.props.dispatch(fetchHouseCheckList({ currentPage: 1 }))
    getConfigItems(this, {
      XZQH: '',
      GXDW: sessionStorage.getItem('divisionid'),
      FWZT: '',
      DZSX: '',
      DABD: '',
    })
  }

  // page改变的调用
  pageChange(pageNo) {
    // console.log(currentPage);
    this.requsetBody = { ...this.requsetBody, pageNo }
    this.props.dispatch(fetchHouseCheckList(this.requsetBody))
    this.setState({
      currentPage: pageNo,
    })
  }

  // pageSize改变的调用
  pageSizeChange(pageNo, pageSize) {
    this.setState({ currentPage: 1, pageSize })
    this.requsetBody = { ...this.requsetBody, pageSize, pageNo }
    this.props.dispatch(fetchHouseCheckList(this.requsetBody))
    // this.setState({
    //   pageSize: pageSize,
    //   currentPage: 1
    // })
  }

  // 数据查询
  getData() {
    this.props.dispatch(fetchHouseCheckList(this.requsetBody, (reply) => {
      this.setState({ loading: false, counts: reply.data.totalCount })
    }))
  }

  exportData() {
    const urlBase = this.props.config.$ctx// 当前IP
    // console.log(urlBase)
    // console.log(this.requsetBody)
    const token = sessionStorage.getItem('token')
    const exportObj = this.requsetBody
    exportObj.currentPage = 1
    exportObj.pageSize = 5000
    const strArr = []
    Object.keys(exportObj).map((key, index) => {
      strArr.push(`${key}=${exportObj[key]}`)
    })
    // console.log(strArr)
    if (this.state.counts <= 5000) {
      window.open(`${urlBase}/jcjw/building/exportAddress?${strArr.join('&')}&token=${token}`)
    } else if (this.state.counts > 5000) {
      message.warn('导出数据不能大于5000条，请先精确筛选条件')
      return
    } else {
      message.warn('没有查询到数据，无法导出')
    }
  }
  componentWillMount() {
    if (global.$GLOBALCONFIG.tabCache['/house/houseAddrList']) {
      this.setState({ activeSub: global.$GLOBALCONFIG.tabCache['/house/houseAddrList'].val })
    }
  }

  // 点击搜索按钮的回调事件
  _handleSubmit(query, currentPage) {
    this.props.dispatch(fetchHouseCheckList({ ...query, currentPage: currentPage }))
  }

  // 重置搜索条件
  _clear() {
    // this.props.dispatch(resetAmList())
    this.props.dispatch(resetHouseCheckListQuery())
  }

  // 列表与地图模式切换的回调函数
  _typeChange(key) {
    this.setState({ activeSub: key })
    const tab = { key: '/house/houseAddrList', val: key }
    global.$GLOBALCONFIG.tabCache['/house/houseAddrList'] = tab
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
        numResKey: 'privilege',
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
        label: '房屋状态',
        items: config.FWZT,
        key: 'fwzt',
        numResKey: 'fwzt',
        numReqKey: 'fwztid',
        needNum: true,
        needMulti: true,
        needArrowIcon: true,
      },
      {
        sort: 'superSelect',
        label: '地址属性',
        items: config.DZSX,
        key: 'dzsx',
        numResKey: 'dzsx',
        numReqKey: 'dzsxid',
        needNum: true,
        needMulti: true,
        needArrowIcon: true,
      },
      {
        sort: 'superSelect',
        label: '档案绑定',
        items: config.DABD,
        key: 'dabd',
        numResKey: 'dabd',
        numReqKey: 'dabdid',
        needNum: true,
        needMulti: false,
        needArrowIcon: false,
      },
    ]
  }
  gFormSubmit(query) {
    this.setState({ currentPage: query.page, pageSize: query.pageSize })
    const temp = {}
    temp.keyword = query.keyword
    temp.xzqhdm = getItemByType(query.xzqh)
    temp.gxdwdm = getItemByType(query.gxdw) || sessionStorage.getItem('divisionid')
    temp.fwzt = getItemByType(query.fwzt)
    temp.fwzt=temp.fwzt.split(';').map((v,i)=>{
      switch(v){
        case '1':
          return 'wbz'
        case '2':
          return 'ybzwjf'
        case '3':
          return 'yjfwfc'
        case '4':
          return 'yjffcz'
        case '5':
          return 'wcfc'
        case '6':
          return 'ybz'
        case '7':
          return 'yjf'
        default :
          return
      }
    }).join(';')
    temp.dzlxStr = getItemByType(query.dzsx)
    temp.dabd = getItemByType(query.dabd)
    temp.pageNo = query.page
    temp.pageSize = query.pageSize
    this.requsetBody = { ...this.requsetBody, ...temp }
    // console.log(this.requsetBody)
    this.getData()
    this.props.dispatch(fetchHouseCheckList(this.requsetBody))
  }

  // 获取统计值
  getStatisticsNum(currentSelected) {
    this.requsetHead = { ...currentSelected }
    this.props.dispatch(fetchBuildingCounts(this.requsetHead))
  }

  render() {
    const {
      buildingCountsResult,
      houseCheckSearchResult,
      } = this.props
    // 暂时用假数据来模拟列表项
    const templateConfig = {
      houseAddrTypeList: (<HouseAddrTypeList
        houseCheckSearchResult={houseCheckSearchResult} loading={houseCheckSearchResult.loading}
      />),
      houseAddrTypeMap: (<HouseAddrTypeMap
        houseCheckSearchResult={houseCheckSearchResult} loading={houseCheckSearchResult.loading}
      />),
    }
    return (
      <div className="nav-second-nextContent hjt-roomList">
        <Gform
          gFormConfig={this.gFormConfig()}
          gFormSubmit={this.gFormSubmit}
          nums={buildingCountsResult || {}}
          loading={buildingCountsResult.loading || this.state._requestLoading}
          getStatisticsNum={this.getStatisticsNum}
          cacheKey="houseCheckList"
          totalCount={houseCheckSearchResult.totalCount || 0}
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
            <TabPane tab="列表" key="houseAddrTypeList" />
            <TabPane tab="地图" key="houseAddrTypeMap" />
          </Tabs>
          <div className="tab-main tdLeft-icon">
            {templateConfig[this.state.activeSub]}
            <div className="ability-button">
              {/* 新增地址-弹窗*/}
              <Button >
                <Link className="peopleDetail" to={'/house$/newAddress'}>新增地址</Link>
              </Button>
              <Button >
                <span className="peopleDetail" onClick={this.exportData}>导出</span>
              </Button>
              <Pagination
                totalCount={houseCheckSearchResult.totalCount}
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
